locals {
  name_prefix = "${var.project_name}-${var.environment}"

  # R2 bucket holding trip/bike photos served by the site.
  media_bucket_name = "${var.project_name}-media"

  # Gate for domain-dependent resources (DNS + custom domains).
  has_domain = var.domain != ""
  # A hyphen, not a dot: Universal SSL covers one level of subdomain, so img.moto-journey.<domain>
  # would need a certificate of its own.
  r2_public_fqdn = local.has_domain ? "${var.site_hostname}-${var.r2_public_hostname}.${var.domain}" : null
}
