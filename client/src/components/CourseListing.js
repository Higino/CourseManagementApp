import React, { Component } from 'react';
import { Button, Card, CardHeader, CardText, Col, Container, Row, CardBody } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CourseSelector from './CourseSelector'


class CourseListing extends Component {

    state = {  
        isLoading : true,
        CompleteList : [], 
        IncompleteList: [],
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

            this.setState({CompleteList : completeList , IncompleteList: incompleteList, isLoading: false});
        }
    }

    selectCourse = (course) => {
        this.setState({selectedCourse: course})
    }

    render() { 
        const {CompleteList, IncompleteList, isLoading, Courses,selectedCourse} = this.state;
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
                                    
                                    <a href={"mailto:?bcc="+IncompleteList.map(e => {return e.email+""})+"&subject=Course%20reminder&body=Please%20have%20a%20look%20at%20this%20message%20and%20ensure%20to%20fulfil%20the%20course%20requirements%20at%20http%3A%2F%2Fwww.dynatrace.com"}>Send a reminder</a>
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
                                    <a href={"mailto:?bcc="+CompleteList.map(e => {return e.email+""})+"&subject=Welcome&body=Congrats%20for%20fulfil%20this%20course%20pre%20requirements.%20See%20you%20then!"}>Send a confirmation message</a>
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