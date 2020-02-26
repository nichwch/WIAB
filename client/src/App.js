import React, { useState, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";
import { Link, withRouter } from "react-router-dom";
// import { Nav, Navbar, NavItem } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";

import {Box, Flex, Heading,Text,Button} from "@chakra-ui/core";
import { MdMenu } from "react-icons/md"

import Routes from "./Routes";

const MenuItem = (props) => {
  return (
  <Text as={Link} to={props.to} {...props} fontSize="3xl" ml={3} mt={[2,2,0,0]} display="block">
    {props.children}
  </Text>
  )
}

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

    </React.Fragment>
  )

  return (
    !isAuthenticating && (
      <Box p={[2,2,5,5]}>
        {/* navbar */}
        <Flex
          // p={5}
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          
        >
          <Flex align="center" mr={5}>
            <Heading as={Link} to="/" size="2xl">App</Heading>
          </Flex>

          {/* nav options, collapsable */}
          {/* collapsable menu button for mobile */}
          <Box
              as={MdMenu} 
              size="30px"
              display={["block","block","none","none"]}
              onClick={()=>{setShowMenu(!showMenu)}}
          >
            wew
          </Box>
          <Box 
            display={[showMenu?"block":"none",showMenu?"block":"none","flex","flex"]}
            width={["100%","100%","auto","auto"]}
            alignItems="center"
            textAlign={["right","right","left","left"]}
            flexGrow={1}
          >
            <MenuItem to="/hello">Item 1</MenuItem>
            <MenuItem to="/hello1">Item 2</MenuItem>
            <MenuItem to="/hello2">Item 3</MenuItem>
          </Box>
          {/* login section, changes depending on auth status */}
          {isAuthenticated?
            <React.Fragment>
              <Box display={[showMenu?"block":"none",showMenu?"block":"none","block","block"]}
                   width={["100%","100%","auto","auto"]}
                   textAlign={["right","right","left","left"]}
              >
                <MenuItem to="/settings">Settings</MenuItem>
              </Box>
              <Box display={[showMenu?"block":"none",showMenu?"block":"none","block","block"]}
                   width={["100%","100%","auto","auto"]}
                   textAlign={["right","right","left","left"]}
              >
                <Text onClick={handleLogout} fontSize="3xl" ml={3} mt={[3,3,0,0]} 
                display={[showMenu?"block":"none",showMenu?"block":"none","block","block"]} display="block">Log Out</Text>
              </Box>

            </React.Fragment>

          :
            <React.Fragment>
              <Box display={[showMenu?"block":"none",showMenu?"block":"none","block","block"]}
                   width={["100%","100%","auto","auto"]}
                   textAlign={["right","right","left","left"]}
              >
                <MenuItem to="/signup">Sign Up</MenuItem>
              </Box>
              <Box display={[showMenu?"block":"none",showMenu?"block":"none","block","block"]}
                   width={["100%","100%","auto","auto"]}
                   textAlign={["right","right","left","left"]}
              >
                <MenuItem to="/login">Sign In</MenuItem>
              </Box>
            </React.Fragment>
          }

          
          
        </Flex>


        <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
        </Box>
    )
  );
}

export default withRouter(App);
