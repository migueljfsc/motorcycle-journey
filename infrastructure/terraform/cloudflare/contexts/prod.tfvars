environment = "prod"

# cloudflare_account_id is NOT set here (kept out of the repo). Provide it via:
#   - CI: -var from the CLOUDFLARE_ACCOUNT_ID secret (see the workflow), or
#   - local: `export TF_VAR_cloudflare_account_id=...` or a gitignored *.auto.tfvars.
# The API token comes from the CLOUDFLARE_API_TOKEN env var.

# ---- R2 ----
r2_location = "WEUR" # Western Europe

# ---- Site hosting (enable when migrating off GitHub Pages) ----
enable_pages = false

# ---- Custom domain (set once the domain is on Cloudflare) ----
domain = ""
