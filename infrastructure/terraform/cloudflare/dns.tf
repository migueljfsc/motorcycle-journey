# ==============================================================================
# DNS records for the custom domain (only when domain is set).
#   - apex CNAME -> Pages project (flattened by Cloudflare)
#   - img CNAME  -> R2 public bucket
# ==============================================================================

# Apex -> Pages (only once Pages is enabled). Cloudflare flattens the apex CNAME.
resource "cloudflare_dns_record" "apex_pages" {
  count = var.enable_pages && local.has_domain ? 1 : 0

  zone_id = data.cloudflare_zone.this[0].zone_id
  name    = var.domain
  type    = "CNAME"
  content = "${local.pages_project_name}.pages.dev"
  proxied = true
  ttl     = 1 # 1 = automatic (required when proxied)
}

# Note: the R2 custom-domain resource (r2.tf) provisions its own DNS record for
# img.<domain>, so no separate cloudflare_dns_record is needed for the bucket.
