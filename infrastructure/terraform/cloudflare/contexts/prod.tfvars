environment = "prod"

# cloudflare_account_id is NOT set here (kept out of the repo). Provide it via:
#   - CI: -var from the CLOUDFLARE_ACCOUNT_ID secret (see the workflow), or
#   - local: `export TF_VAR_cloudflare_account_id=...` or a gitignored *.auto.tfvars.
# The API token comes from the CLOUDFLARE_API_TOKEN env var.

# ---- R2 ----
r2_location = "WEUR" # Western Europe

# ---- Domain ----
# Personal and shared across projects; this stack owns only motojourney* names. The site is a
# Worker (wrangler.jsonc); this stack serves the photos at motojourney-img.migueljfsc.dev.
domain = "migueljfsc.dev"
