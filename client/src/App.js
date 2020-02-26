import React, { useState, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import {Box, Flex, Heading,Text} from "@chakra-ui/core";

import Routes from "./Routes";

function App(props) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  const [showMenu, setShowMenu] = React.useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    Hub.listen('auth',(data)=>{
      const {payload} = data;
      console.log("P",payload);
      if(payload.event === 'signIn'){
        userHasAuthenticated(true);
      }
    });

    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    props.history.push("/login");
  }

  let navContents = (
    <React.Fragment>
      <Text as={Link} to="/hello" fontSize="xl">Item 1</Text>
      <Text as={Link} to="/hello" fontSize="xl">Item 2</Text>
      <Text as={Link} to="/hello" fontSize="xl">Item 3</Text>

      {/* login section, changes depending on auth status */}
      {isAuthenticated?
        <React.Fragment>
          <Text as={Link} to="/settings" fontSize="xl">Settings</Text>
          <Text onClick={handleLogout} fontSize="xl">Log Out</Text>
        </React.Fragment>

      :
        <React.Fragment>
          <Text as={Link} to="/signup" fontSize="xl">Sign Up</Text>
          <Text as={Link} to="/login" fontSize="xl">Login</Text>
        </React.Fragment>
      }
    </React.Fragment>
  )

  return (
    !isAuthenticating && (
      <Box>
        {/* <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Scratch</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {isAuthenticated ? (
                <>
                  <LinkContainer to="/settings">
                    <NavItem>Settings</NavItem>
                  </LinkContainer>
                  <NavItem onClick={handleLogout}>Logout</NavItem>
                </>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar> */}
        {/* navbar */}
        <Flex p={5}>
          <Heading as={Link} to="/" size="2xl">App</Heading>
          {/* nav options, collapsable */}
          {/* collapsable menu button for mobile */}

          <Flex display={["none","none","block","block"]}>
            {navContents}
          </Flex>

          <Box display={["block","block","none","none"]}
               onClick={()=>{setShowMenu(!showMenu)}}
          >
            wew
          </Box>
          <Box display={[showMenu?"block":"none",showMenu?"block":"none","none","none"]}>
            {navContents}
          </Box>
        </Flex>


        <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
      </Box>
    )
  );
}

export default withRouter(App);
