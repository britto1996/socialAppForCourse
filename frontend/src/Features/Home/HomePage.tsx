import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom'
import { Container,Segment,Header,Image,Button } from 'semantic-ui-react'
import { useStore } from '../../App/stores/store'
import RegisterForm from '../users/RegisterForm';
import UserForm from '../users/UserForm';

function HomePage() {
  const {userStore,modalStore } = useStore();
  console.log("user store logged in",userStore.isLoggedIn)
  return (
    <>
       <Segment inverted textAlign='center' vertical className="masthead">
         <Container text>
           <Header as='h1' inverted>
             <Image size='massive' src="/assets/logo.png" alt="logo" style={{marginBottom:12}} />
             Reactivities
           </Header>
           {userStore.isLoggedIn ? (
             <>
                <Header as='h2' inverted content='Welcome to Reactivities' />
                <Button as={Link} to='/activities' size='huge' inverted>
                  Go to activities
                </Button>       
             </>
           ) : (
             <>
              <Button onClick={() => modalStore.openModal(<UserForm />)}  size='huge' inverted>
             Login
           </Button>
           <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted>
              Register
            </Button>
           </>
           )
           }
            
            
               
                 
           
         </Container>
       </Segment>
    </> 
  )
}

export default observer(HomePage)