# CourseManagementApp


Coursde to manage course enrollments, reminder and welcome messages

# How to install
On a terminal window, go to the CourseManagement/server folder and type the following command:
```
?> npm start
```

On a new terminal window, go to the CourseManagement/client folder and type the following command:
```
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



