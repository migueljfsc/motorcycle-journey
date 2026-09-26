###################### CLOUDFLARE ACCOUNT ######################

variable "cloudflare_api_token" {
  type        = string
  description = "Cloudflare API token. Prefer the CLOUDFLARE_API_TOKEN env var over passing this."
  sensitive   = true
  default     = null
}

variable "cloudflare_account_id" {
  type        = string
  description = "Cloudflare account ID that owns the R2 buckets / Pages project."
  nullable    = false

  validation {
    condition     = var.cloudflare_account_id != ""
    error_message = "Cloudflare account ID cannot be empty."
  }
}

###################### NAMING ######################

variable "project_name" {
  type        = string
  default     = "motorcycle-journey"
  description = "Base name used to derive bucket / project names."
}

variable "environment" {
  type        = string
  default     = "prod"
  description = "Deployment environment (kept for naming parity across stacks)."
}

###################### R2 OBJECT STORAGE ######################

variable "r2_location" {
  type        = string
  default     = "WEUR"
  description = "R2 location hint (e.g. WEUR = Western Europe, ENAM, WNAM, EEUR, APAC)."
}

variable "r2_storage_class" {
  type        = string
  default     = "Standard"
  description = "Default storage class for the media bucket (Standard | InfrequentAccess)."
}

###################### DOMAIN ######################

variable "domain" {
  type        = string
  default     = ""
  description = <<-EOT
    The personal apex domain (migueljfsc.dev), shared across projects; this stack creates
    names under `site_hostname` only. When empty, custom-domain resources are skipped.
  EOT
}

variable "site_hostname" {
  type        = string
  default     = "moto-journey"
  description = "The site's subdomain. The Worker's custom domain for it is in wrangler.jsonc."
}

variable "r2_public_hostname" {
  type        = string
  default     = "img"
  description = "Suffix of the hostname serving the media bucket: <site_hostname>-<this>.<domain>."
}
