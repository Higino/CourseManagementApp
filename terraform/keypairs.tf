resource "aws_key_pair" "courseapp_keypair" {
  key_name = "courseapp_access_key"
  public_key = file("./courseapp-server-accesskey.pem")
}