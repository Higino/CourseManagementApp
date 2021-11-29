import React, { Component } from 'react';
import { Label, Table, Col, Container, Row, Button, Input } from 'reactstrap';
import SERVER_PATH from '../constants';

const pathUrl = SERVER_PATH;

class CourseManagement extends Component {

    state = {  
        isLoading : true,
        courses: [{}],
        newCourseName: 'default'
    }

    invokeApi = async (url, method, bodyData) => {
        if( !bodyData ) bodyData = {}

        let response = await fetch(pathUrl + url, {
            method: method,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData) // This is your file object
          }).then(
            response => { 
              if( response.status !== 200 ) {
                throw new Error(response.statusText)
              }
              return response.json()
            } // if the response is a JSON object
          ).catch(
            error => {
              console.log(error); return [] } // Handle the error response object
          );
    
          return response;

    }
 
    async componentDidMount(){
        const response= await fetch(pathUrl + '/api/courses');
        const courses = await response.json();
        this.setState({courses: courses, isLoading: false});
    }

    updateCourseName = (e) => {
        this.setState({ newCourseName: e.target.value });
    }

    addCourse = (event) => {
        this.invokeApi('/api/courses', 'POST', {name: this.state.newCourseName})
        .then(() => { window.location.reload(false)});
    }

    closeCourse = async (event) => {
        this.invokeApi('/api/courses', 'DELETE', {id: event.target.id})   
        .then(() => { window.location.reload(false)});       
    }

    render() { 
        const {courses, isLoading} = this.state;
        
        if(isLoading) 
            return (<div>Loading...</div>);
        
        return ( 
            
                <div>
                    <Container>
                    <Row>
                        <Col>
                            <Table><thead></thead><tbody><tr><td width='50%'> <Label>Course Name:</Label>
                                                        <Input value={this.state.newCourseName} name='coursename' onChange={this.updateCourseName}></Input></td><td></td></tr>
                                   <tr><td><Button onClick={this.addCourse}>Add course</Button></td><td></td></tr></tbody>
                            </Table>                                
                        </Col>
                    </Row>
                    <Row>
                        <Col><h2>List of existing courses</h2></Col>
                    </Row>
                    <Row>
                    <Col>
                    <Table hover>
                        <thead><tr><th>Id</th><th>Course Name</th><th Style='text-align:center'>Actions</th></tr></thead>
                        <tbody>
                        {
                        courses.map( (e, i) => {
                            return  <tr key={e.id}>
                                        <td>{e.id}</td>
                                        <td>{e.name}</td>
                                        <td Style='text-align:center'><Container><Row>
                                            <Col><Button id={e.id} onClick={this.closeCourse}>Close Course</Button></Col>
                                            <Col><Button href={'/import'}>Import Enrollments</Button></Col>
                                            <Col><Button href={'/courselisting/'+e.id}>Reminders/Confirmations</Button></Col>
                                        </Row></Container></td>
                                    </tr>
                        })
                     }
                        </tbody>
                    </Table>
                    </Col>  
                    </Row>                    
                    </Container>
                </div>
         );
    }
}
 
export default CourseManagement;