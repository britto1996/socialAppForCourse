import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom'
import { List,Image } from 'semantic-ui-react'
import { Profile } from '../../../App/Models/profile';


interface Props {
    attendees: Profile[];
}

function ActivityListItemAttendee({attendees}:Props) {
  const styles = {
        borderColor: 'orange',
        borderWidth: 2
    }

    return (
        <List horizontal>
            {attendees.map((attendee)=>(
                <List.Item key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
                <Image size='mini' 
                circular src='/assets/user.png' 
                />
                </List.Item>
            ))}
            
            {/* {attendees.map(attendee => (
                <Popup
                    hoverable
                    key={attendee.username}
                    trigger={
                        <List.Item key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
                            <Image 
                                size='mini' 
                                circular src={attendee.image || '/assets/user.png'} 
                                bordered
                                style={attendee.following ? styles : null}
                            />
                        </List.Item>
                    }
                >
                    <Popup.Content>
                        <ProfileCard profile={attendee} />
                    </Popup.Content>
                </Popup>

            ))} */}
        </List>
    )
}

export default observer(ActivityListItemAttendee)