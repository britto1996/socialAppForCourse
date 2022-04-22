import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'

function NotFound() {
  return (
    <div>
        <Segment placeholder>
            <Header icon>
                <Icon name="search" />
                Not find any matching results
            </Header>
            <Segment.Inline>
                <Button as={Link} to="/activities" primary>
                    Return to activities page
                </Button>
            </Segment.Inline>
        </Segment>
    </div>
  )
}

export default NotFound