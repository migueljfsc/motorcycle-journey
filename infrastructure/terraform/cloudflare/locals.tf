locals {
  name_prefix = "${var.project_name}-${var.environment}"

  # R2 bucket holding trip/bike photos served by the site.
  media_bucket_name = "${var.project_name}-media"

  # Cloudflare Pages project name (also the *.pages.dev subdomain).
  pages_project_name = var.project_name

  # Gate for domain-dependent resources (DNS + custom domains).
  has_domain     = var.domain != ""
  r2_public_fqdn = local.has_domain ? "${var.r2_public_hostname}.${var.domain}" : null
}
