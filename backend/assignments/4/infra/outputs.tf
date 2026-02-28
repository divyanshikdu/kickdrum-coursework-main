output "api_gateway_url" {
  value = aws_apigatewayv2_api.http.api_endpoint
}

output "s3_website_endpoint" {
  value = aws_s3_bucket_website_configuration.frontend.website_endpoint
}

output "frontend_url" {
  value = "http://${aws_s3_bucket_website_configuration.frontend.website_endpoint}"
}