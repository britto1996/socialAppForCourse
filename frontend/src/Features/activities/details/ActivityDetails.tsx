
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom';
import {Card,Image,Button, Grid} from "semantic-ui-react";
import ActivityDetailHeader from "../details/ActivityDetailHeader";
import ActivityDetailInfo from "../details/ActivityDetailInfo";
import ActivityDetailChat from "../details/ActivityDetailChat";
import ActivityDetailSidebar from "../details/ActivityDetailSidebar";
import Load from '../../../App/Layout/Loader';
import { useStore } from '../../../App/stores/store';


function ActivityDetails() {
    const {activityStore} = useStore();
    const {selectedActivity:activity,loadActivity,loadingInitial} = activityStore;
    const {id} = useParams<{id:string}>();

    useEffect(()=>{
      if(id) loadActivity(id);
    },[id , loadActivity])
    if(loadingInitial || !activity){
      return <Load/>;
    }
  return (
    <>
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailHeader activity={activity} />
        <ActivityDetailInfo activity={activity} />  
        <ActivityDetailChat />
      </Grid.Column>  
      <Grid.Column width={6}>
          <ActivityDetailSidebar />
      </Grid.Column>
    </Grid>  
    </>
  )
}

export default observer(ActivityDetails)