# Cloudflare infrastructure

Terraform/OpenTofu for hosting Moto Journey on Cloudflare. Single stack, files split by concern
(mirrors the per-stack layout in `solverde/fichas-infra`).

## What it manages

| File | Resource | Status |
|------|----------|--------|
| `r2.tf` | R2 media bucket (+ CORS, + custom domain) | **active** (bucket + CORS); custom domain gated on `domain` |
| `pages.tf` | Cloudflare Pages project (+ domain binding) | gated on `enable_pages` |
| `dns.tf` | Apex → Pages DNS record | gated on `enable_pages` + `domain` |
| `data.tf` | Zone lookup | gated on `domain` |

Today only the **R2 bucket** (image hosting) is created. Pages + custom domain are written and
validated but left disabled until you migrate hosting / bring a domain onto Cloudflare.

## Prerequisites

1. **API token** (provider auth) — create at Cloudflare → My Profile → API Tokens with:
   - Account · Workers R2 Storage · Edit
   - Account · Cloudflare Pages · Edit (only needed when `enable_pages = true`)
   - Zone · DNS · Edit and Zone · Zone · Read (only needed once `domain` is set)
   ```sh
   export CLOUDFLARE_API_TOKEN=...        # provider auth
   ```
2. **Account ID** — kept out of the repo. Provide it at run time:
   ```sh
   export TF_VAR_cloudflare_account_id=...   # local runs
   ```
   (CI injects it from the `CLOUDFLARE_ACCOUNT_ID` secret via `-var`.)

## State backend (one-time bootstrap)

State lives in an R2 bucket via the S3-compatible backend (consolidated on Cloudflare).
A single bucket `terraform-tfstate` is **shared across all personal projects** — each
project/stack is isolated by its state `key` (here `motorcycle-journey/cloudflare/...`).
Chicken-and-egg: create the bucket + an R2 access key once, by hand:

1. Dashboard → R2 → create bucket `terraform-tfstate` (private; enable Object versioning
   to recover from bad state). Reused by every personal project, so create it only once.
2. R2 → Manage API Tokens → create an **R2 token** (Object Read & Write); note the
   Access Key ID / Secret.
3. Configure the backend:
   ```sh
   cp backend.hcl.example backend.hcl      # fill in <ACCOUNT_ID>
   export AWS_ACCESS_KEY_ID=<r2-access-key-id>
   export AWS_SECRET_ACCESS_KEY=<r2-secret>
   ```

## Usage

```sh
export TF_VAR_cloudflare_account_id=...   # if not already exported
tofu init -backend-config=backend.hcl
tofu plan  -var-file=contexts/prod.tfvars
tofu apply -var-file=contexts/prod.tfvars
```

(Use `terraform` if you prefer; pin a version with tfenv. `-backend=false` skips state for a
quick `validate`.)

## Wiring images into the site

The bucket holds photos; the site references them by URL. The `cover` / `photos` fields in
`src/content/bikes/*.md` and `src/content/trips/**/*.md` accept absolute URLs, so once images
are uploaded and the public domain is live, point them at `https://img.<domain>/...`.

Upload with rclone or the AWS CLI against the R2 S3 endpoint (see `r2_s3_endpoint` output).

## Migrating hosting off GitHub Pages (later)

1. Set `enable_pages = true` (after authorizing the GitHub↔Cloudflare OAuth connection once in
   the dashboard — Terraform can't do that handshake).
2. Set `domain = "<your-domain>"` (domain must be on Cloudflare).
3. `apply`. Then in `astro.config.mjs` set `base: '/'` and `site` to the new domain, and retire
   `.github/workflows/deploy.yml`.
