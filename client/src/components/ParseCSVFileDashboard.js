import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';
import {UncontrolledAlert, Table, Card, CardHeader, 
  CardImg, CardBody, FormText, Button, Row, Col, Container, CardFooter, CardText } from 'reactstrap';
import CourseSelector from './CourseSelector';


class ParseCSVFileDashboard extends Component {

    state = {  
        // Initially, no file is selected 
        parsedData: [],
        fileType: '',
        uploadStatus: {
          status:'', 
          message: ''},
        dropdownOpen: false,
        selectedCourse: {}
    }

    handleOnDrop = (data) => {
      this.setState({selectedCourse: {}, parsedData: [], fileType: '', uploadStatus: {
        status:'', 
        message: ''}})

      this.parse2Json(data);
    };
  
    handleOnError = (err, file, inputElem, reason) => {
      this.setState({uploadStatus: {
        status:'ERROR', 
        message: err}})

      console.log(err);
    };
  
    handleOnRemoveFile = (data) => {
      this.setState({selectedCourse: {}, parsedData: [], fileType: '', uploadStatus: {
        status:'', 
        message: ''}})
    };
  
    // Try converting the array of data into Json objects that can be sent to backend
    parse2Json = (data) => {
      // Data has the following structure [data:{...}, errors: [...], meta: {...}
      // For each row we should check that there were no errors in the parsing of that line, but for simplicity I will ignore this for now

      // Fist of all lets see what typew of file this is. enrollment files have First Name and Last Name as fields in the structure
      // Whereas pre-reqs have Course Complete in its structure
      let parsedData = []
      if( data[0].data['First Name'] ) {
        console.log('Its an Enrollment file')
        this.setState({fileType : 'ENROLL'})

        parsedData = data.map( e => {
          return {
            name: e.data['First Name'] + ' ' + e.data['Last Name'],
            email: e.data['Email'],
            title: e.data['Title']
          }
        })
        //this.setState({uploadDisabeld: true})
      } else if( data[0].data['Course Complete']) {
        console.log('Its an pre-req file')
        this.setState({fileType : 'PREREQ'})
        parsedData = data.map( e => {
          return {
            courseCompleteDate: e.data['Course Complete Date'],
            email: e.data['DTU Contact: Contact Email'],
            course: e.data['Course Full Name']
          }
        })
      } else {
        console.log('Invalid file type')
      }
      this.setState({parsedData: parsedData })
    }

    async uploadData(url, data) {
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
          console.log(error); return [] } // Handle the error response object
      );

      return response;
    }

      
    upload = event => {
      if( this.state.fileType === 'PREREQ' ) {
        this.uploadData('/api/prereqs', this.state.parsedData)
      } else if( this.state.fileType === 'ENROLL' ) {
        this.uploadData('/api/courses/enrollment/'+this.state.selectedCourse.id, this.state.parsedData)
      }
    }

    selectCourse = (course) => {
      console.log(course)
      this.setState({selectedCourse : course})
    }


    render() { 
        var uploadStatusAlert = ''
        if ( this.state.uploadStatus && this.state.uploadStatus.status === 'SUCCESS') {
          uploadStatusAlert = <UncontrolledAlert color="info"> {this.state.uploadStatus.message} </UncontrolledAlert>
        }
        else if (this.state.uploadStatus && this.state.uploadStatus.status === 'ERROR') {
          uploadStatusAlert = <UncontrolledAlert color="danger"> {this.state.uploadStatus.message} </UncontrolledAlert>       
        }

        var parsedData = ""
        if( this.state.fileType === 'ENROLL') {
          parsedData =
          <div>
          <Table dark hover>
            <thead><tr><th>Name</th><th>Email</th><th>Title</th></tr></thead>
            <tbody>
              {this.state.parsedData.map( (e, i) => <tr key={i}><td>{e.name}</td><td>{e.email}</td><td>{e.title}</td></tr> )}
            </tbody>
          </Table>
          </div>
        } else if ( this.state.fileType === 'PREREQ' ) {
          parsedData =
          <Table dark hover>
            <thead><tr><th>Email</th><th>Course Name</th><th>Completed Date</th></tr></thead>
            <tbody>
              {this.state.parsedData.map( (e, i) => <tr key={i}><td>{e.email}</td><td>{e.course}</td><td>{e.courseCompleteDate}</td></tr> )}
            </tbody>
          </Table>          
        }

        var courseChooser = ''
        if( this.state.fileType && this.state.fileType === 'ENROLL') {
          courseChooser =
          <CourseSelector onSelection={this.selectCourse}/>
        }

        return ( 
            <div> 
                <Container className="themed-container" >
                <Row>
                  <Col style={{width: '5%'}}>
                    <h1> 
                    Import Enroll & Pre-Reqs files
                    </h1> 
                  </Col>
                </Row>
                <Row>
                <Col>
                  <Card style={{ width: '20rem' }}>
                      <CardHeader><CardImg top src="/enrollment.png" alt="Card image cap" /></CardHeader>
                          <CardBody> 
                              <CSVReader  config={{header: true, skipEmptyLines: true}} onDrop={this.handleOnDrop} onError={this.handleOnError} addRemoveButton onRemoveFile={this.handleOnRemoveFile}>
                                <FormText>Drop CSV file here. The type of file (enroll/pre-req) will be automatically detected</FormText>
                              </CSVReader>                      
                          </CardBody>
                      <CardFooter>
                        <Container className="themed-container" >
                        <Row>
                        <Col>
                        {console.log(this.state.selectedCourse)}
                        <Button size='sm' color="primary" disabled={ this.state.fileType === '' || (this.state.fileType === 'ENROLL' && !this.state.selectedCourse.id) } onClick={this.upload}>Submit results</Button>
                        </Col>
                        <Col>
                        {courseChooser}
                        </Col>
                        </Row></Container>
                      </CardFooter>
                  </Card>
                </Col>
                <Col sm="8">
                  <div className=" small">
                    {uploadStatusAlert}
                    <Card>
                      <CardHeader>
                        <CardText><b>File Contents:</b></CardText>
                      </CardHeader>
                      <CardBody>
                      {parsedData}
                      </CardBody>
                    </Card>
                  </div>
                </Col>
                </Row>
                </Container>
            </div>
          );     
    }
}
 
export default ParseCSVFileDashboard;