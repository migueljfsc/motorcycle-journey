# ==============================================================================
# R2 object storage — trip & bike photos served by the site.
# Keeps large binaries out of the git repo (see AGENTS.md image-hosting notes).
# ==============================================================================

resource "cloudflare_r2_bucket" "media" {
  account_id    = var.cloudflare_account_id
  name          = local.media_bucket_name
  location      = var.r2_location
  storage_class = var.r2_storage_class
}

# Public access via a custom domain (img.<domain>). Created only when a domain is set;
# until then, enable the temporary r2.dev dev URL manually in the dashboard for testing.
resource "cloudflare_r2_custom_domain" "media" {
  count = local.has_domain ? 1 : 0

  account_id  = var.cloudflare_account_id
  bucket_name = cloudflare_r2_bucket.media.name
  domain      = local.r2_public_fqdn
  zone_id     = data.cloudflare_zone.this[0].zone_id
  enabled     = true
}

# CORS so the images can be requested from the site origin (and previews).
resource "cloudflare_r2_bucket_cors" "media" {
  account_id  = var.cloudflare_account_id
  bucket_name = cloudflare_r2_bucket.media.name

  rules = [{
    allowed = {
      methods = ["GET", "HEAD"]
      origins = ["*"]
    }
    max_age_seconds = 3600
  }]
}
