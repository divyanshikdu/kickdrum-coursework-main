variable "aws_region" {
  type    = string
  default = "ap-southeast-2"
}

variable "resource_prefix" {
  type    = string
  default = "divyanshi"
}

variable "project_name" {
  type    = string
  default = "counter-app"
}

variable "frontend_bucket_name" {
  type        = string
  description = "Manually created S3 bucket name for static site hosting"
  default     = "divyanshi-frontend-s3-bucket"
}