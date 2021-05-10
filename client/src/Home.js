import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap'

class Home extends Component {
    state = { mydata: {} }

    render() { 
        return (
            <Container><Row><Col>
                <h1>CourseManagementApp</h1>
Coursde to manage course enrollments, reminder and welcome messages

    <h2>How to use</h2>
This APP has three main screens

<h3>Add/Close Course</h3>
In this menu you can add a new course or close a course to prevent more enrollments to be added. Initially the default course is created so you always have at least a course to enroll people to. In the Add/Close course page you can see the list of existing opened courses, and type a new course name ad click in the add button to add a new course to the list.

All the courses in this page can then be chosen to see messages or to add enrollment in the data import section

<h3>Importa Data</h3>
In this page you can import new dataimport { Row } from 'reactstrap';
 to the APP. Data needs to be in CSV format, extracted directly from the salesforce. There are two main files that can be imported

<h3>Enrollmens</h3>
Enrollments are the list of people enrolled in a specific course. When uploading an enrollment file you need to specifi to which course that enrolment belongs to. Once you choose the file (or drag and drop to the uplaod box) and choose a course, you can upload the enrollment data so it becomes available in the messages page of that specific course

<h3>Prereqs</h3>
Prereqs are general purpose file data has all the people that completed courses. This data will be used to calculate which enrolment have complete prerequirements and which enrollments have incomplete requirements. Complete requirements will be sent Welcome messages, incomplete enrollments will receive a reminder to complete the course prereqs

<h3>Reminder/Welcome messages</h3>
Once you choose a course to see which enrollments are complete and incomplete, you are presented with two lists. The enrollments which have not completed the list of prereqs and the ones with prereqs completesd. Complete requirements will be sent Welcome messages, incomplete enrollments will receive a reminder to complete the course prereqs. To send these a message just click in the links of each list. You must have the operating system default mail app configured                
</Col></Row></Container>
              
            );
    }
}
 
export default Home;