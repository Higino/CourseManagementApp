provider "aws" {
    region = var.aws_region

    access_key = var.AWS_ACCESS_KEY
    secret_key = var.AWS_SECRET_ACCESS_KEY
}

terraform {
  required_version = ">= 0.12.26"


  backend "s3" {
    bucket         = "terraform-course-app"
    key            = "core-infra/terraform.tfstate"
    region         = "eu-west-2"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 3.15"
    }
  }
}