  
import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText} from 'reactstrap';


class AppNav extends Component {
    render() {
        return (
          <div>
            <Navbar color="dark" dark expand="md">
              <NavbarBrand href="/">Home</NavbarBrand>
                <Nav className="mr-auto" navbar>
                  <NavItem>
                    <NavLink></NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Courses Management
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href='/courses'>
                  Add/Close Courses  
                </DropdownItem>
                <DropdownItem href='/import'>
                  Enrollments & PreReqs Import
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="/courselisting">
                  Messages & Reminders
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
                </Nav>
                <NavbarText>Course Traker</NavbarText>
            </Navbar>
          </div>
        );
      }
}
 
export default AppNav;