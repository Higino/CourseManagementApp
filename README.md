# CourseManagementApp


Coursde to manage course enrollments, reminder and welcome messages

# How to install
Download the App [zip file](https://github.com/Higino/CourseManagementApp/archive/refs/heads/main.zip) and unzip it to CourseManagement folder at your desired local hard drive location

## Pre requirements
Install npm and node ([with admin rights on windows](https://phoenixnap.com/kb/install-node-js-npm-on-windows), [without admin rights on windows](https://theshravan.net/blog/how-to-use-node-and-npm-without-installation-or-admin-rights/))

# How to instal in AWS
## Dependencies
1. Please create an S3 bucket in eu-west-2 region named "terraform-course-app"
2. Download the app zip file https://github.com/Higino/CourseManagementApp/archive/refs/heads/main.zip
3. Unzip the app to your prefered folder (example: c:\courseapp)
4. Download terraform zip file to your local machine https://www.terraform.io/downloads.html
5. Unzip the file downloaded from https://www.terraform.io/downloads.html to your prefered folder (example c:\courseapp). You should have terraform executable in courseapp directory

## Create and install courseapp in AWS
After running the steps in the previous section do the following:
1. Go to the folder CourseManagementApp/terraform
2. Create a file called terraform.tfvars and save it with the following contents: 
```
AWS_ACCESS_KEY="<your amazon access key>"
AWS_SECRET_ACCESS_KEY="<your amazon secret>"
aws_region="eu-west-2" 
```
3. Create a public and private key to use in the ec2 instance server. Follow this link to know how (https://phoenixnap.com/kb/generate-ssh-key-windows-10 or https://docs.oracle.com/cd/E19683-01/816-4883/6mb2joaoa/index.html )
    - 3.1. Make sure you name the .key and .pem file as courseapp-server-accesskey.key and courseapp-server-accesskey.key 
    - 3.2  Save them in CourseManagementApp/terraform and store them in a safe place as you can only access server with these files
4. Run the following commands inside the CourseManagementApp/terraform folder
```
c:\courseapp\terraform init -force-copy
c:\courseapp\terraform init apply -auto-approve
```
You shouls see something like this if everything goes well: api_gateway_public_ip "<ip_address>" which is the IPAdress in which the application will be accessible

Wait about 10 minutes and in your browser type the api_gateway_public_ip in a new browser window and you should see the home page of CourseApp

## Running the software locally

On a terminal window, go to the CourseManagement/server folder and type the following command:
```
?> npm install 
?> npm start
```

On a new terminal window, go to the CourseManagement/client folder and type the following command:
```
?> npm install
?> npm start
```

If your browser does not open automatically, open a browser window and go to http://localhost:3000

# How to use
This APP has three main screens
## Add/Close Course
In this menu you can add a new course or close a course to prevent more enrollments to be added.
Initially the default course is created so you always have at least a course to enroll people to.
In the Add/Close course page you can see the list of existing opened courses, and type a new course name ad click in the add button to add a new course to the list.

All the courses in this page can then be chosen to see messages or to add enrollment in the data import section

## Importa Data
In this page you can import new data to the APP. Data needs to be in CSV format, extracted directly from the salesforce.
There are two main files that can be imported
### Enrollmens
Enrollments are the list of people enrolled in a specific course. When uploading an enrollment file you need to specifi to which course that enrolment belongs to. Once you choose the file (or drag and drop to the uplaod box) and choose a course, you can upload the enrollment data so it becomes available in the messages page of that specific course
### Prereqs
Prereqs are general purpose file data has all the people that completed courses. This data will be used to calculate which enrolment have complete prerequirements and which enrollments have incomplete requirements. Complete requirements will be sent Welcome messages, incomplete enrollments will receive a reminder to complete the course prereqs

## Reminder/Welcome messages
Once you choose a course to see which enrollments are complete and incomplete, you are presented with two lists. The enrollments which have not completed the list of prereqs and the ones with prereqs completesd. Complete requirements will be sent Welcome messages, incomplete enrollments will receive a reminder to complete the course prereqs. To send these a message just click in the links of each list. You must have the operating system default mail app configured



