# AWS EKS + RDS + Service Mesh Terraform Blueprint

## Overview
This directory contains the Terraform configuration to deploy:
- **VPC**: Multi-AZ VPC with public and private subnets.
- **EKS Cluster**: Managed Kubernetes cluster.
- **RDS Postgres**: Managed database for the User Service.
- **App Mesh**: AWS Service Mesh for microservice communication.

## Files
- `main.tf`: Provider and backend configuration.
- `vpc.tf`: Network infrastructure.
- `eks.tf`: EKS cluster and node groups.
- `rds.tf`: Postgres database instance.
- `mesh.tf`: AWS App Mesh configuration.
- `variables.tf`: Input variables.
- `outputs.tf`: Important resource IDs and endpoints.

## Usage
1. Configure AWS credentials.
2. Run `terraform init`.
3. Run `terraform apply`.
