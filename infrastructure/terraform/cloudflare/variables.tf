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

###################### SITE HOSTING (forward-looking) ######################

variable "github_owner" {
  type        = string
  default     = "migueljfsc"
  description = "GitHub owner for the Cloudflare Pages git integration."
}

variable "github_repo" {
  type        = string
  default     = "motorcycle-journey"
  description = "GitHub repository name for the Cloudflare Pages git integration."
}

variable "production_branch" {
  type        = string
  default     = "main"
  description = "Branch that Pages deploys to production."
}

variable "node_version" {
  type        = string
  default     = "22"
  description = "Node version used by the Pages build."
}

variable "enable_pages" {
  type        = bool
  default     = false
  description = <<-EOT
    Create the Cloudflare Pages project. Requires the GitHub <-> Cloudflare connection to be
    authorized once in the dashboard (OAuth) before apply. Keep false until you migrate hosting.
  EOT
}

###################### CUSTOM DOMAIN (forward-looking) ######################

variable "domain" {
  type        = string
  default     = ""
  description = <<-EOT
    Apex domain managed in this Cloudflare account (e.g. "motojourney.dev"). When empty, all
    DNS and custom-domain resources are skipped. Set it once the domain is on Cloudflare.
  EOT
}

variable "r2_public_hostname" {
  type        = string
  default     = "img"
  description = "Subdomain used to publicly serve the R2 media bucket (e.g. img.<domain>)."
}
