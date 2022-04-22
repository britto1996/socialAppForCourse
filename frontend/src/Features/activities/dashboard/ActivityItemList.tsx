import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import {Item,Button,Label, Segment, Icon} from "semantic-ui-react"
import { Activity } from '../../../App/Models/activity'
import { useStore } from '../../../App/stores/store'

import ActivityListItemAttendee from './ActivityListItemAttendee';

import {format} from "date-fns";


interface Props {
    activity:Activity
}

function ActivityItemList({activity}:Props) {
      
      const [target,setTarget] = useState("");
      const {activityStore} = useStore();
      const {deleteActivity} = activityStore;

     function handleDelete(e:SyntheticEvent<HTMLButtonElement>,id:string){
       setTarget(e.currentTarget.name);
       deleteActivity(id);
     }
  return (
    <>
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png"/>
              <Item.Content>
                <Item.Header as={Link} to={`/activities/${activity.id}`}>
                  {activity.title}
                  </Item.Header>
                  <Item.Description>Hosted by {activity.host?.displayName}</Item.Description>
                  {activity.isHost && (
                                <Item.Description>
                                    <Label basic color='orange'>
                                        You are hosting this activity
                                    </Label>
                                </Item.Description>
                            )}
                            {activity.isGoing && !activity.isHost && (
                                <Item.Description>
                                    <Label basic color='green'>
                                        You are going to this activity
                                    </Label>
                                </Item.Description>
                            )}
              </Item.Content>
            
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' /> {format(activity.date!,'dd MMM yyy h:mm aa')}
          <Icon name='marker' /> {activity.venue}
        </span>
      </Segment>
      <Segment secondary>
        <ActivityListItemAttendee attendees={activity.attendees!} />
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button as={Link} 
        to={`/activities/${activity.id}`} 
        color="teal"
        floated="right"
        content="view" 
        />
      </Segment>
    </Segment.Group>
        {/* <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>{activity.city} , {activity.venue}</div>
              </Item.Description>
              <Item.Extra>
                <Button as={Link} to={`/activities/${activity.id}`} floated='right' content="View" color="blue" />
                <Button onClick={(e)=>handleDelete(e,activity.id)} floated='right' content="Delete" color="red" />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item> */}
    </>
  )
}

export default ActivityItemList