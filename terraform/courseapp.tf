resource "aws_eip" "courseapp_eip" {
  instance = module.courseapp_server.instance_id
}

module "courseapp_server" {
    source = "./node-server"
    ami_id = "ami-0194c3e07668a7e36"
    instance_type = "t2.small"
    key_pair = aws_key_pair.courseapp_keypair.key_name
    name = "CourseAppServer"
    subnet_id = aws_subnet.courseapp_public_subnet_1.id
    vpc_security_group_ids = [
        aws_security_group.allow_ssh.id,
        aws_security_group.allow_all_outbound.id,
        aws_security_group.allow_inbound_public_http.id,
        aws_security_group.allow_inbound_public_https.id
    ]
}
