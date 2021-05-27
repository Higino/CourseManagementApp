import React, { Component } from 'react';
import { Button, Card, CardHeader, CardText, Col, Container, Row, CardBody } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CourseSelector from './CourseSelector'


class CourseListing extends Component {

    state = {  
        isLoading : true,
        CompleteList : [], 
        IncompleteList: [],
        ConfirmedList: [],
        selectedCourse: {},
        Courses: []
    }
 
    async componentDidMount(){
        if( this.props.match.params.id ) {
            const response = await (await fetch('/api/courses/'+this.props.match.params.id)).json();
            const course = response
            console.log(course)
            if( course.length !== 0 ) {
                this.setState( {Courses: course, selectedCourse: course[0]})
                this.loadListings()
            }
        }
    }

    loadListings = async () => {
        if( this.state.selectedCourse.id ) {
            const response= await fetch('/api/listings/complete/'+this.state.selectedCourse.id);
            const completeList = await response.json();

            const response2 = await fetch('/api/listings/incomplete/'+this.state.selectedCourse.id);
            const incompleteList = await response2.json();

            const response3 = await fetch('/api/listings/confirmedenroll/'+this.state.selectedCourse.id);
            const confirmedList = await response3.json();

            this.setState({
                CompleteList : completeList , 
                IncompleteList: incompleteList, 
                ConfirmedList: confirmedList,
                isLoading: false});
        }
    }

    clearConfirmationList = async (e) => {
        if( await this.sendJson('/api/courses/enrollment/confirmation/'+this.state.selectedCourse.id, this.state.CompleteList) ) {
            this.setState({CompleteList: []})
        } else {
            console.log(this.state.uploadStatus)
        }     
    }

    async sendJson(url, data) {
        console.log(data)
        let response = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data) // This is your file object
        }).then(
          response => { 
            if( response.status !== 200 ) {
              throw new Error(response.statusText)
            }
            this.setState({
              uploadStatus: {
                status:'SUCCESS', 
                message: this.state.fileType + ' data upload successfully'}
            });
            return response.json()
          } // if the response is a JSON object
        ).catch(
          error => {
            this.setState({
              uploadStatus: {
                status:'ERROR', 
                message: this.state.fileType + ' data upload  not loaded. '+error.message }
            });
            console.log(error); return undefined } // Handle the error response object
        );
        return response
    }
  
    selectCourse = (course) => {
        this.setState({selectedCourse: course})
    }

    render() { 
        const {ConfirmedList, CompleteList, IncompleteList, isLoading, Courses,selectedCourse} = this.state;
        if(isLoading && Courses.length === 0) 
            return (<>
            <Modal isOpen={true} >
                <ModalHeader>Course Selection</ModalHeader>
                <ModalBody>
                    <CourseSelector onSelection={this.selectCourse}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" href={'/courseListing/'+selectedCourse.id}>Select course</Button>{' '}
                </ModalFooter>
            </Modal>
            </>);
        
        if(isLoading) 
            return (<div>Loading...</div>);

        let courseReminderEmail = "&subject=Dynatrace%20Foundation%20Training&body=Hello%2C%0A%0AThank%20you%20for%20registering%20to%20attend%20the%20Dynatrace%20Foundation%20Training.%20This%20email%20confirms%20that%20you%20have%20completed%20all%20the%20prerequisites%20and%20are%20registered%20in%20this%20partner%20training.%20Remember%2C%20this%20is%20just%20a%20practical%20introduction%20to%20the%20solution%20and%20it%20is%20still%20important%20to%20be%20using%20Dynatrace%20and%20learning%20the%20University%20modules.%0A%0A%20%0A%0AThe%20morning%20of%20your%20training%20we%20will%20send%20the%20details%20for%20you%20to%20log%20on%20to%20the%20session%20prior%20to%20the%20training.%0A%0APlease%20assure%20that%20you%20have%20a%20SSH%20client%20(like%20Putty%20for%20Windows)%20pre-installed.%0A%0A%20%0A%0AIf%20you%20cannot%20attend%20this%20session%20kindly%20let%20us%20know%20in%20advance.%0A%0AThe%20hands-on%20environments%20will%20be%20generated%202%20hours%20before%20the%20class%20begins%20and%20the%20instructions%20on%20how%20to%20connect%20will%20then%20be%20shared%20by%20email%20%E2%80%93%20so%2C%20please%20keep%20an%20eye%20on%20it!%0A%0A%20%0A%0ANorth%20America%20Training%20Time%0A%0A8am%20%E2%80%93%2012am%20PDT%20(Los%20Angeles)%0A%0A11am%20%E2%80%93%203pm%20EDT%0A%0A4pm%20%E2%80%93%208pm%20GMT%20UK%0A%0A%20%0A%0APlease%20reach%20out%20and%20let%20me%20know%20if%20you%20have%20any%20questions.%0A%0ABest%20regards%2C"
        let courseEnrollmentEmail = "&subject=Dynatrace%20Foundation%20Training&body=Dear%20all%2C%0A%0A%20%0A%0AYou%20have%20registered%20to%20attend%20the%20Dynatrace%20Foundation%20Training%2C%20but%20you%20are%20still%20missing%20some%20of%20the%20pre-requirements.%20If%20you%20have%20completed%20the%204%20modules%2C%20below%2C%20please%20send%20me%20a%20screen%20shot%20ASAP%20of%20them%20all%20and%20I%20will%20confirm%20your%20registration.%0A%0A%20%0A%0AIf%20you%20are%20receiving%20this%20email%2C%20it%20means%20that%20you%20have%20not%20completed%20the%204%20modules%20(Using%20Dynatrace%2C%20Configuring%20Dynatrace%2C%20Deploying%20Dynatrace%2C%20and%20Digital%20Experience%20Management)%20in%20the%20University.%0A%0AEach%20needs%20to%20show%20100%25%20completion.%20All%20university%20modules%20need%20to%20be%20completed%20beforehand%2C%20otherwise%20your%20registration%20will%20not%20be%20accepted.%0A%0A%0AIf%20you%20have%20any%20doubts%20or%20are%20facing%20any%20issues%2C%20please%20let%20us%20know%20asap.%0A%0A%20%0APlease%20also%20note%20that%20this%20session%20will%20take%20place%20on%20North%20America%20Pacific%20Time%20Zone%20time%20zone%208%3A00am%20%E2%80%93%2012%3A00pm.%0A%0A%20%0AIf%20you%20are%20unable%20to%20complete%20the%20prerequisites%20this%20week%2C%20there%20is%20another%20upcoming%20Foundation%20Dashboards%20%26%20DEM%20class%20on%20Xxxxxxxxxx.%20The%20timezone%20for%20this%20training%20is%201%3A00pm%20GMT%2F8%3A00am%20US%20Eastern.%0A%0A%20%0A%0AThank%20you.%0A%0A%20%0A%0ARegards%2C"
        
        return ( 
            
                <div>
                    <Container className="themed-container">
                    <h2>List of Reminders and confirmation messages to send to course {Courses[0] ? Courses[0].name : ''}</h2>     
                    <Row>
                    <Col>
                        <Card>
                            <CardHeader>People not fulfilling Pre-Reqs ({IncompleteList.length})</CardHeader>
                                <CardBody>    
                                    {
                                    IncompleteList.map( entry =>                             
                                        <CardText key={entry.email}>{entry.email}  - {entry.course}</CardText>)
                                    }
                                    
                                    <a  href={"mailto:?bcc="+IncompleteList.map(e => {return e.email+""})+courseReminderEmail}>Send a reminder</a>
                                </CardBody>
                        </Card>
                    </Col>  
                    <Col>
                        <Card>
                            <CardHeader>People completing the pre-reqs ({CompleteList.length})</CardHeader>
                                <CardBody>    
                                {
                                    CompleteList.map( entry =>                             
                                        <CardText key={entry.email}>{entry.email}  - {entry.title}</CardText>)
                                    }
                                    <a onClick={this.clearConfirmationList} href={"mailto:?bcc="+CompleteList.map(e => {return e.email+""})+courseEnrollmentEmail}>Send a confirmation message</a>
                                </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <CardHeader>People with confirmation email sent ({ConfirmedList.length})</CardHeader>
                                <CardBody>    
                                {
                                    ConfirmedList.map( entry =>                             
                                        <CardText key={entry.email}>{entry.email}  - {entry.title}</CardText>)
                                    }
                                </CardBody>
                        </Card>
                    </Col>
                    </Row>                    
                    </Container>
                </div>
         );
    }
}
 
export default CourseListing;