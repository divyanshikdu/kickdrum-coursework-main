terraform {
  backend "s3" {
    bucket         = "divyanshi-tf-state-bucket"
    key            = "divyanshi-counter-app/dev/terraform.tfstate"
    region         = "ap-southeast-2"
    encrypt        = true
    use_lockfile   = true
  }

  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.0"
    }
  }
}