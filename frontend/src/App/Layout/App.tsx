
import React, { useEffect } from 'react';
import ActivityDashboard from '../../Features/activities/dashboard/ActivityDashboard';
import NavBar from "../Layout/NavBar"
import './App.css';
import Load from "../Layout/Loader";
import {observer} from "mobx-react-lite";
import { useStore } from '../stores/store';
import {Route, Switch, useLocation} from "react-router-dom";
import HomePage from "../../Features/Home/HomePage";
import ActivitiesForm from "../../Features/activities/form/ActivitiesForm"
import { Container, List } from 'semantic-ui-react';
import TestError from "../../Features/Errors/TestError";
import {ToastContainer} from "react-toastify";
import ActivityDetails from '../../Features/activities/details/ActivityDetails';
import UserForm from "../../Features/users/UserForm"
import NotFound from '../../Features/Errors/NotFound';
import Loader from "../../App/Layout/Loader"
import ServerError from '../../Features/Errors/ServerError';
import ModalContainer from '../Common/modals/ModalContainer';
import RegisterForm from '../../Features/users/RegisterForm';

function App() {
  const location = useLocation();
  const {commonStore,userStore} = useStore();

  useEffect(()=>{
    if(commonStore['user-token']){
      userStore.getUser().finally(()=>commonStore.setAppLoaded())
    }
  },[commonStore,userStore])

  if(!commonStore.appLoaded){
    <Loader/>
  }
  
  return (
    <>
    <ToastContainer position="bottom-right" hideProgressBar />
     <ModalContainer />
    <Route exact path="/" component={HomePage} />
    <Route path={'/(.+)'} 
        render={()=>(
      <>
      <NavBar /> 
      <Container className="list__container">
      <Switch>
      <Route exact path="/activities" component={ActivityDashboard} />
      <Route path="/activities/:id" component={ActivityDetails} />
      <Route key={location.key} path={["/createActivity","/manage/:id"]} component={ActivitiesForm} />
      <Route path="/errors" component={TestError} />
      <Route path="/server-error" component={ServerError} />
      <Route path="/Login" component={UserForm} />
      <Route path="/Register" component={RegisterForm} />
      <Route component={NotFound} />
      </Switch>
      
      </Container>
      </>
        )}
    />
     
    </>
  );
}

export default observer(App);
