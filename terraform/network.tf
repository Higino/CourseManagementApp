# VPC for isolated computing resources
resource "aws_vpc" "courseapp_vpc" {
    cidr_block = "10.0.0.0/16"
    enable_dns_hostnames = true


    tags = {
        Name = "CourseApp VPC"
    }
}

#VPC needs access to internet
resource "aws_internet_gateway" "courseapp_igw" {
    vpc_id = aws_vpc.courseapp_vpc.id     
}

# A routing table to the outside world
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.courseapp_vpc.id

  
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.courseapp_igw.id
  }

  tags = {
    Name = "Public routing table"
  }
}


#
# 2 Private subnets and 2 public subnets in two different acvailability zones
# 
resource "aws_subnet" "courseapp_public_subnet_1" {
    availability_zone_id = "euw2-az1"
    cidr_block = "10.0.0.0/24"
    vpc_id = aws_vpc.courseapp_vpc.id

    tags = {
        Name = "Public subnet in availability zone 1"
    }
}
resource "aws_route_table_association" "public_subnet1_association" {
  subnet_id = aws_subnet.courseapp_public_subnet_1.id
  route_table_id = aws_route_table.public.id
}

