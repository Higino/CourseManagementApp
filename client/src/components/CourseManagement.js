import React, { Component } from 'react';
import { Table, Col, Container, Row } from 'reactstrap';


class CourseManagement extends Component {

    state = {  
        isLoading : true,
        courses: [{name: "THIS IS A TEST "}]
    }
 
    async componentDidMount(){
        const response= await fetch('/api/courses');
        const courses = await response.json();

        //console.log(courses)
        this.setState({courses: courses, isLoading: false});
    }

    render() { 
        const {courses, isLoading} = this.state;
        
        if(isLoading) 
            return (<div>Loading...</div>);
        
        return ( 
            
                <div>
                    <Container className="themed-container">
                    <h2>List of existing courses</h2>     
                    <Row>
                    <Col>
                    <Table hover>
                        <thead><tr><th>Id</th><th>Course Name</th><th>Actions</th></tr></thead>
                        <tbody>
                        {
                        courses.map( (e, i) => {
                            return  <tr key={e.id}>
                                        <td>{e.id}</td>
                                        <td  width='40%'>{e.name}</td>
                                        <td><Container><Row>
                                            <Col>Delete Course</Col>
                                            <Col>Show attendees</Col>
                                            <Col>Reminders/Confirmations</Col>
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