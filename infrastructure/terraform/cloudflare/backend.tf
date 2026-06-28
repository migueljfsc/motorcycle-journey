# Remote state on Cloudflare R2 (S3-compatible). The block is intentionally empty;
# configuration is supplied at init time so secrets stay out of the repo:
#
#   terraform init -backend-config=backend.hcl
#
# See README.md for the one-time state-bucket bootstrap and backend.hcl contents.
terraform {
  backend "s3" {}
}
