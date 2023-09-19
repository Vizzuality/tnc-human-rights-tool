output "api_ecr_repository_url" {
  value = aws_ecr_repository.api_ecr.repository_url
}

output "client_ecr_repository_url" {
  value = aws_ecr_repository.client_ecr.repository_url
}
