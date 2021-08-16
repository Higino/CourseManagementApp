output "api_gateway_private_ip" {
    value = module.courseapp_server.private_ip
}

output "api_gateway_public_ip" {
    value = aws_eip.courseapp_eip.public_ip
}
