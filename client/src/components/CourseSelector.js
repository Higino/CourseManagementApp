import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Label } from 'reactstrap';


class CourseSelector extends Component {

    state = {  
        isLoading : true,
        courses: [],
        selectedCourse: {}
    }
 
    constructor(props) {
        super(props)
    }
    async componentDidMount(){
        const response= await fetch('/api/courses');
        const courses = await response.json();

        this.setState({courses, isLoading: false});
    }

    setSelectedCourse = (course) => {
        this.setState({selectedCourse: course})
        if( this.props.onSelection )
            this.props.onSelection(course)
    }

    render() { 
        const {courses, isLoading, selectedCourse} = this.state;
        
        if(isLoading) 
            return (<div>Loading courses...</div>);
        
        return ( 
            <div>
                <UncontrolledDropdown>
                <DropdownToggle caret>
                   Courses
                </DropdownToggle>
                <DropdownMenu >
                    {courses.map( e => {
                        return <DropdownItem key={e.id} onClick={() => this.setSelectedCourse(e)}>{e.name}</DropdownItem>
                    })}
                </DropdownMenu>
                </UncontrolledDropdown>
                {selectedCourse.name ? selectedCourse.name : ''}
            </div>
        );
    }
}
 
export default CourseSelector;