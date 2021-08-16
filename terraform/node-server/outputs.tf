output "instance_id" {
    value = aws_instance.default.id
}

output "name" {
    value = var.name
}

output "private_ip" {
    value = aws_instance.default.private_ip  
}