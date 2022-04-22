import {Menu,Container,Button,Image,Dropdown} from "semantic-ui-react"
import "./NavBar.css";
import React from 'react'
import { useStore } from "../stores/store";
import { NavLink , Link} from "react-router-dom";
import { observer } from "mobx-react-lite";
import UserStore from "../stores/userStore";
import CommonStore from "../stores/commonStore"


function NavBar() {
  const {userStore : { user, logout,isLoggedIn}} = useStore();
  const commonStore = new CommonStore(); 
  console.log("is logged in is",isLoggedIn);
  console.log("User name is",user);
  return (
    <>
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={NavLink} to="/" exact header>
            <img src="/assets/logo.png" alt="logo" style={{marginRight:"10px"}} />
            Reactivities
          </Menu.Item>
          {isLoggedIn &&  <>
          <Menu.Item as={NavLink} to="/activities" name="Activities" />
          <Menu.Item as={NavLink} to="/errors" name="Errors" />
          <Menu.Item>
            <Button positive content="Create Activity" as={NavLink} to="/createActivity" />
          </Menu.Item>
          <Menu.Item position="right">
            <Image src={user?.image || '/assets/user.png'} avatar spaced="right" />
            <Dropdown pointing='top left' text={user?.username || 'bob'}>
              <Dropdown.Menu>
              <Dropdown.Item as={Link} to={`/profile/${user?.username}`} 
              text='My Profile' icon='user'
              />
              <Dropdown.Item onClick={logout} text='logout' icon='power' />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
          </>
          }
         
        </Container>
      </Menu>
    </>
  )
}

export default observer(NavBar)