resource "aws_instance" "default" {
  ami                     = var.ami_id
  iam_instance_profile    = var.iam_instance_profile
  instance_type           = var.instance_type
  key_name                = var.key_pair
  private_ip              = var.private_ip
  subnet_id               = var.subnet_id
  vpc_security_group_ids  = var.vpc_security_group_ids

  user_data = <<EOF
#!/bin/bash

echo '#!/bin/bash
cd /home/ubuntu
mkdir server-init
cd server-init

curl -sL https://deb.nodesource.com/setup_14.x | sudo bash

## Run `sudo apt-get install -y nodejs` to install Node.js 14.x and npm
sudo apt-get install -y nodejs docker docker.io
## You may also need development tools to build native addons:
sudo apt-get install -y gcc g++ make
## To install the Yarn package manager, run:
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | sudo tee /usr/share/keyrings/yarnkey.gpg >/dev/null
echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn

sudo yarn global add pm2 


cd /home/ubuntu
sudo git clone https://github.com/Higino/CourseManagementApp.git
cd /home/ubuntu/CourseManagementApp/server
sudo docker build -t courseapp-server .
sudo docker run --rm -d  -p 3001:3001/tcp courseapp-server:latest
cd /home/ubuntu/CourseManagementApp/client
sudo npm install
sudo npm start &
' >> /home/ubuntu/init.sh
chmod +x /home/ubuntu/init.sh
sudo /bin/su ubuntu /home/ubuntu/init.sh
EOF


  tags = {
    Name = var.name
  }
}
