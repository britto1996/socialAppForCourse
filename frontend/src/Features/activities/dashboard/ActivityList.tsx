
import { observer } from 'mobx-react-lite';
import React, { Fragment, SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import {Segment,Item,Button,Label, Header} from "semantic-ui-react";
import { useStore } from '../../../App/stores/store';
import ActivityItemList from './ActivityItemList';


function ActivityList() {

      const {activityStore} = useStore();
      const {groupedActivities} = activityStore;
      
  return (
    <>
    {groupedActivities.map(([group,activities])=>(
      <Fragment key={group}>
        <Header sub color="teal">
          {group}
        </Header>
      {activities.map(activity=>(
          <ActivityItemList key={activity.id} activity={activity} />
        ))}
        </Fragment>
    ))}
    </>
  )
}

export default observer(ActivityList)