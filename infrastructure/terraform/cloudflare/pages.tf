# ==============================================================================
# Cloudflare Pages — static hosting for the Astro site (replaces GitHub Pages).
#
# Prereq: authorize the GitHub <-> Cloudflare connection ONCE in the dashboard
# (Workers & Pages -> Create -> Pages -> Connect to Git). Terraform can manage the
# project but not the OAuth handshake. Keep enable_pages=false until then.
#
# On cutover, set base: '/' in astro.config.mjs (served from root, not a subpath).
# ==============================================================================

resource "cloudflare_pages_project" "site" {
  count = var.enable_pages ? 1 : 0

  account_id        = var.cloudflare_account_id
  name              = local.pages_project_name
  production_branch = var.production_branch

  build_config = {
    build_command   = "pnpm build"
    destination_dir = "dist"
  }

  source = {
    type = "github"
    config = {
      owner                          = var.github_owner
      repo_name                      = var.github_repo
      production_branch              = var.production_branch
      pr_comments_enabled            = true
      production_deployments_enabled = true
      preview_deployment_setting     = "all"
    }
  }

  deployment_configs = {
    production = {
      environment_variables = {
        NODE_VERSION = { value = var.node_version }
      }
    }
    preview = {
      environment_variables = {
        NODE_VERSION = { value = var.node_version }
      }
    }
  }
}

# Bind the apex domain to the Pages project (needs domain + Pages enabled).
resource "cloudflare_pages_domain" "site" {
  count = var.enable_pages && local.has_domain ? 1 : 0

  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.site[0].name
  name         = var.domain
}
