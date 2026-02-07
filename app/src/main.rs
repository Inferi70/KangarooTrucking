use axum::{Json, Router, extract::State, http::StatusCode, response::IntoResponse, routing::post};
use resend_rs::Resend;
use resend_rs::types::CreateEmailBaseOptions;
use serde::Deserialize;
use std::{net::SocketAddr, sync::Arc};
use tower_http::services::ServeDir;
use tracing::{error, info};
use tracing_subscriber::EnvFilter;

#[derive(Clone, Debug)]
struct AppConfig {
    resend_api_key: Option<String>,
    resend_from: Option<String>,
    resend_to: Option<String>,
}

#[derive(Clone)]
struct AppState {
    resend: Resend,
    cfg: Arc<AppConfig>,
}

#[derive(Debug, Deserialize)]
pub struct ContactPayload {
    pub name: String,
    pub email: String,
    pub phone: String,
    pub subject: Option<String>,
    pub message: String,
}

#[tokio::main]
async fn main() {
    let filter = EnvFilter::try_from_default_env().unwrap_or_else(|_| EnvFilter::new("info"));
    tracing_subscriber::fmt().with_env_filter(filter).init();

    let cfg = AppConfig {
        resend_api_key: std::env::var("RESEND_API_KEY").ok(),
        resend_from: std::env::var("RESEND_FROM").ok(),
        resend_to: std::env::var("RESEND_TO").ok(),
    };

    let Some(api_key) = cfg.resend_api_key.as_ref() else {
        panic!("RESEND_API_KEY is required");
    };

    let state = Arc::new(AppState {
        resend: Resend::new(api_key),
        cfg: Arc::new(cfg),
    });

    let app = Router::new()
        .route("/api/contact", post(send_contact))
        .fallback_service(ServeDir::new("public").append_index_html_on_directories(true))
        .with_state(state);

    let host = std::env::var("HOST").unwrap_or_else(|_| "0.0.0.0".to_string());
    let port: u16 = std::env::var("PORT")
        .unwrap_or_else(|_| "8080".to_string())
        .parse()
        .expect("Invalid PORT");

    let addr: SocketAddr = format!("{}:{}", host, port)
        .parse()
        .expect("Invalid HOST/PORT");

    info!("listening on http://{}", addr);
    axum::serve(tokio::net::TcpListener::bind(addr).await.unwrap(), app)
        .await
        .expect("server error");
}

async fn send_contact(
    State(state): State<Arc<AppState>>,
    Json(payload): Json<ContactPayload>,
) -> impl IntoResponse {
    let name = payload.name.trim();
    let email = payload.email.trim();
    let phone = payload.phone.trim();
    let message = payload.message.trim();

    if name.is_empty() || email.is_empty() || phone.is_empty() || message.is_empty() {
        return (StatusCode::BAD_REQUEST, "Missing required fields").into_response();
    }

    let Some(from) = state.cfg.resend_from.as_ref() else {
        return (StatusCode::SERVICE_UNAVAILABLE, "Resend not configured").into_response();
    };
    let Some(to) = state.cfg.resend_to.as_ref() else {
        return (StatusCode::SERVICE_UNAVAILABLE, "Resend not configured").into_response();
    };

    let subject = payload
        .subject
        .as_ref()
        .map(|s| s.trim())
        .filter(|s| !s.is_empty())
        .map(|s| format!("Contact: {}", s))
        .unwrap_or_else(|| "Contact: New request".to_string());

    let html = build_contact_html(name, email, phone, message);

    let email =
        CreateEmailBaseOptions::new(from.clone(), vec![to.clone()], subject).with_html(&html);

    if let Err(err) = state.resend.emails.send(email).await {
        error!("resend request failed: {}", err);
        return (StatusCode::BAD_GATEWAY, "Email provider error").into_response();
    }

    info!("contact email sent");
    StatusCode::OK.into_response()
}

fn escape_html(input: &str) -> String {
    let mut out = String::with_capacity(input.len());
    for ch in input.chars() {
        match ch {
            '&' => out.push_str("&amp;"),
            '<' => out.push_str("&lt;"),
            '>' => out.push_str("&gt;"),
            '"' => out.push_str("&quot;"),
            '\'' => out.push_str("&#39;"),
            _ => out.push(ch),
        }
    }
    out
}

fn build_contact_html(name: &str, email: &str, phone: &str, message: &str) -> String {
    let name = escape_html(name);
    let email = escape_html(email);
    let phone = escape_html(phone);
    let message = escape_html(message);

    format!(
        r#"<!doctype html>
<html lang=\"en\">
  <head>
    <meta charset=\"utf-8\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
    <title>Contact Request</title>
  </head>
  <body style=\"margin:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;\">
    <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"background:#f4f4f5;padding:24px 0;\">
      <tr>
        <td align=\"center\">
          <table role=\"presentation\" width=\"600\" cellpadding=\"0\" cellspacing=\"0\" style=\"background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e4e4e7;\">
            <tr>
              <td style=\"padding:24px;color:#18181b;font-size:14px;line-height:1.6;\">
                <div><strong>Name:</strong> {name}</div>
                <div><strong>Email:</strong> {email}</div>
                <div><strong>Phone:</strong> {phone}</div>
                <div style=\"margin-top:16px;\"><strong>Message:</strong></div>
                <div style=\"white-space:pre-line;\">{message}</div>
              </td>
            </tr>
            <tr>
              <td style=\"padding:16px 24px;background:#fafafa;color:#71717a;font-size:12px;\">
                This email was sent from the Kangaroo Trucking website contact form. DO NOT REPLY TO THIS.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>"#
    )
}
