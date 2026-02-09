provider "aws" {
  region = var.aws_region
}

locals {
  project_name = "${var.resource_prefix}-${var.project_name}"
  common_tags = {
    "Created By" = "Divyanshi"
    Purpose      = "Kdu Hands on"
  }
}

########################
# DynamoDB
########################
resource "aws_dynamodb_table" "counter" {
  name         = "${local.project_name}-table"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "pk"

  tags = local.common_tags

  attribute {
    name = "pk"
    type = "S"
  }
}

########################
# Lambda (package index.mjs)
########################
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir = "${path.root}/../lambda"
  output_path = "${path.root}/lambda.zip"
}

resource "aws_iam_role" "lambda_exec" {
  name = "${local.project_name}-lambda-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
      Action = "sts:AssumeRole"
    }]
  })

  tags = local.common_tags
}

resource "aws_iam_role_policy_attachment" "basic_logs" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_policy" "ddb_least_priv" {
  name = "${local.project_name}-lambda-ddb"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["dynamodb:GetItem", "dynamodb:UpdateItem"]
      Resource = aws_dynamodb_table.counter.arn
    }]
  })

  tags = local.common_tags
}

resource "aws_iam_role_policy_attachment" "ddb_attach" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = aws_iam_policy.ddb_least_priv.arn
}

resource "aws_lambda_function" "counter" {
  function_name = "${local.project_name}-counter"
  role          = aws_iam_role.lambda_exec.arn

  handler = "index.handler"
  runtime = "nodejs22.x"

  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.counter.name
    }
  }

  tags = local.common_tags
}

########################
# API Gateway (HTTP API)
########################
resource "aws_apigatewayv2_api" "http" {
  name          = "${local.project_name}-http-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["GET", "PUT", "OPTIONS"]
    allow_headers = ["Content-Type"]
  }

  tags = local.common_tags
}

resource "aws_apigatewayv2_integration" "lambda" {
  api_id                 = aws_apigatewayv2_api.http.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.counter.arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "get" {
  api_id    = aws_apigatewayv2_api.http.id
  route_key = "GET /counter"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_route" "put" {
  api_id    = aws_apigatewayv2_api.http.id
  route_key = "PUT /counter"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.http.id
  name        = "$default"
  auto_deploy = true

  tags = local.common_tags
}

resource "aws_lambda_permission" "allow_apigw" {
  statement_id  = "AllowInvokeFromAPIGW"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.counter.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http.execution_arn}/*/*"
}

########################
# S3 Frontend (bucket created manually, imported)
########################
resource "aws_s3_bucket" "frontend" {
  bucket = var.frontend_bucket_name

  tags = local.common_tags
}

resource "aws_s3_bucket_website_configuration" "frontend" {
  bucket = aws_s3_bucket.frontend.id
  index_document { suffix = "index.html" }
}

resource "aws_s3_bucket_public_access_block" "frontend" {
  bucket                  = aws_s3_bucket.frontend.id
  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "frontend_public_read" {
  bucket = aws_s3_bucket.frontend.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid       = "PublicReadGetObject"
      Effect    = "Allow"
      Principal = "*"
      Action    = ["s3:GetObject"]
      Resource  = ["${aws_s3_bucket.frontend.arn}/*"]
    }]
  })

  depends_on = [aws_s3_bucket_public_access_block.frontend]
}

# Inject API URL into HTML and upload it
locals {
  raw_index_html = file("${path.root}/../frontend/index.html")
  index_html     = replace(local.raw_index_html, "__API_BASE__", aws_apigatewayv2_api.http.api_endpoint)
}

resource "aws_s3_object" "index" {
  bucket       = aws_s3_bucket.frontend.id
  key          = "index.html"
  content      = local.index_html
  content_type = "text/html; charset=utf-8"
  etag         = md5(local.index_html)

  tags = local.common_tags

  depends_on = [aws_s3_bucket_policy.frontend_public_read]
}