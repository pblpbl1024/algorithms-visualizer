import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import profile from "../assets/profile.png";

const Navigation = props => {
    //component is passed down thru props and navigation will now apply the navbar on top of the component
    const { Component, activeKey } = props;

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#/">
                    <img src={profile} style={{ height: 35, minHeight: 35, maxHeight: 35,  marginBottom: 0 }} alt="Profile" className="profile"/>
                </Navbar.Brand>
                <Nav activeKey={activeKey} className="mr-auto">
                    <Nav.Link href="#/">Home</Nav.Link>
                    <Nav.Link href="#/sort">Sort</Nav.Link>
                </Nav>
            </Navbar>
            <Component/>
        </div>
    )
}

export default Navigation;