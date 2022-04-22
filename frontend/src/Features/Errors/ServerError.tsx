import { observer } from 'mobx-react-lite';
import React from 'react'
import { Container, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../App/stores/store'

function ServerError() {
    const {commonStore} = useStore();
  return (
    <div>
        <Container>
        <Header as='h1' content='Server Error' />
        <Header sub as='h5' color='red' content={commonStore.error?.message} />
        {commonStore.error?.details && 
            <Segment>
                <Header as='h4' content='stack trace' color='teal' />
                <code style={{marginTop:'10px'}}>{commonStore.error.details}</code>
            </Segment>
        }
        </Container>
    </div>
  )
}

export default observer(ServerError)