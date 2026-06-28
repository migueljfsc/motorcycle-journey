output "r2_bucket_name" {
  value       = cloudflare_r2_bucket.media.name
  description = "Name of the R2 media bucket."
}

output "r2_s3_endpoint" {
  value       = "https://${var.cloudflare_account_id}.r2.cloudflarestorage.com"
  description = "S3-compatible endpoint for uploading to R2 (rclone / aws s3 / TF state)."
}

output "r2_public_url" {
  value       = local.has_domain ? "https://${local.r2_public_fqdn}" : null
  description = "Public base URL for served images (null until a domain is configured)."
}

output "pages_project_subdomain" {
  value       = var.enable_pages ? "${local.pages_project_name}.pages.dev" : null
  description = "Default Pages URL (null until Pages is enabled)."
}
