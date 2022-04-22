import {Grid} from "semantic-ui-react"
import React, { useEffect } from 'react'
import ActivityDetails from '../details/ActivityDetails'
import ActivitiesForm from '../form/ActivitiesForm'
import ActivityFilters from "../dashboard/ActivityFilters"
import ActivityList from './ActivityList'
import { useStore } from "../../../App/stores/store"
import { observer } from "mobx-react-lite"
import Load from "../../../App/Layout/Loader"


function ActivityDashboard() {
  const {activityStore} = useStore();
  const {loadActivities,activityRegistry} = activityStore;
  
  useEffect(()=>{
   if(activityRegistry.size<=1) loadActivities();
  },[activityRegistry.size,loadActivities]);

  console.log("loading initial is",activityStore.loadingInitial)

  if(activityStore.loadingInitial) return <Load load={activityStore.loadingInitial} />
  
  return (
    <>
    
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
       <ActivityFilters />
      </Grid.Column>
    </Grid>
</>
  )
}

export default observer(ActivityDashboard)