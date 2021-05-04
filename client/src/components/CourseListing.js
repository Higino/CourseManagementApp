import React, { Component } from 'react';
import { Button, Card, CardHeader, CardText, Col, Container, Row, CardBody } from 'reactstrap';


class CourseListing extends Component {

    state = {  
        isLoading : true,
        Categories : []
    }
 
    async componentDidMount(){
        const response= await fetch('/api/listings/complete');
        const completeList = await response.json();

        const response2 = await fetch('/api/listings/incomplete');
        const incompleteList = await response2.json();

        this.setState({CompleteList : completeList , IncompleteList: incompleteList, isLoading: false});
    }

    render() { 
        const {CompleteList, IncompleteList, isLoading} = this.state;
        if(isLoading) 
            return (<div>Loading...</div>);
        
        return ( 
            
                <div>
                    <Container className="themed-container">
                    <h2>List of Reminders and confirmation messages to send</h2>     
                    <Row>
                    <Col>
                        <Card>
                            <CardHeader>People not fulfilling Pre-Reqs ({IncompleteList.length})</CardHeader>
                                <CardBody>    
                                    {
                                    IncompleteList.map( entry =>                             
                                        <CardText>{entry.email}  - {entry.course}</CardText>)
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
                                        <CardText>{entry.email}  - {entry.title}</CardText>)
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