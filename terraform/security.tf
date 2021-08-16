#
# Security groups defining the kind of protocols and traffic allowed/disallowed
#
resource "aws_security_group" "allow_all_outbound" {
    name = "allow-outbound"
    description = "Allow all outbound traffic"
    vpc_id = aws_vpc.courseapp_vpc.id

    egress {
      from_port = 0
      to_port = 0
      protocol = "-1"
      cidr_blocks = [ "0.0.0.0/0" ]
    }
}

resource "aws_security_group" "allow_ssh" {
    name = "allow-external-ssh"
    description = "Allow external ssh requests"
    vpc_id = aws_vpc.courseapp_vpc.id

    ingress  {
      from_port = 22
      to_port = 22
      protocol = "tcp"
      cidr_blocks = [ "0.0.0.0/0" ]
      description = "Allow ssh port from within entire vpoc range of ips"
    }
}


resource "aws_security_group" "allow_inbound_public_http" {
    name = "allow-external-HTTP"
    description = "Allow external http requests"
    vpc_id = aws_vpc.courseapp_vpc.id

    ingress {
      from_port = 80
      to_port = 80
      protocol = "tcp"
      cidr_blocks = [ "0.0.0.0/0" ]
      description = "Allow http port from anywhere"
    }
}

resource "aws_security_group" "allow_inbound_public_https" {
    name = "allow-external-HTTPS"
    description = "Allow external https requests"
    vpc_id = aws_vpc.courseapp_vpc.id

    ingress {
      from_port = 443
      to_port = 443
      protocol = "tcp"
      cidr_blocks = [ "0.0.0.0/0" ]
      description = "Allow https port from anywhere"
    }
}
