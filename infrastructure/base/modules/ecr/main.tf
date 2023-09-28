##
# Module to build the ECR repository
##

# TODO: must be a cleaner way to do it than to duplicate the resource

resource "aws_ecr_repository" "api_ecr" {
  name                 = "${var.project}-${var.environment}-api"
  image_tag_mutability = var.image_mutability
  tags                 = var.tags

  encryption_configuration {
    encryption_type = var.encrypt_type
  }
}

resource "aws_ecr_repository" "client_ecr" {
  name                 = "${var.project}-${var.environment}-client"
  image_tag_mutability = var.image_mutability
  tags                 = var.tags

  encryption_configuration {
    encryption_type = var.encrypt_type
  }
}

resource "aws_ecr_repository" "webshot_ecr" {
  name                 = "${var.project}-${var.environment}-webshot"
  image_tag_mutability = var.image_mutability
  tags                 = var.tags

  encryption_configuration {
    encryption_type = var.encrypt_type
  }
}

resource "aws_ecr_lifecycle_policy" "api_ecr_lifecycle_policy" {
  repository = aws_ecr_repository.api_ecr.name
  policy     = <<EOF
{
    "rules": [
        {
            "rulePriority": 1,
            "description": "Keep last n api images",
            "selection": {
                "tagStatus": "any",
                "countType": "imageCountMoreThan",
                "countNumber": 3
            },
            "action": {
                "type": "expire"
            }
        }
    ]
}
EOF
}

resource "aws_ecr_lifecycle_policy" "client_ecr_lifecycle_policy" {
  repository = aws_ecr_repository.client_ecr.name
  policy     = <<EOF
{
    "rules": [
        {
            "rulePriority": 1,
            "description": "Keep last n client images",
            "selection": {
                "tagStatus": "any",
                "countType": "imageCountMoreThan",
                "countNumber": 3
            },
            "action": {
                "type": "expire"
            }
        }
    ]
}
EOF
}

resource "aws_ecr_lifecycle_policy" "webshot_ecr_lifecycle_policy" {
  repository = aws_ecr_repository.webshot_ecr.name
  policy     = <<EOF
{
    "rules": [
        {
            "rulePriority": 1,
            "description": "Keep last n client images",
            "selection": {
                "tagStatus": "any",
                "countType": "imageCountMoreThan",
                "countNumber": 3
            },
            "action": {
                "type": "expire"
            }
        }
    ]
}
EOF
}
