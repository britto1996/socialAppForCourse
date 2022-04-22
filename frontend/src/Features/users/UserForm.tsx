import React from 'react'
import {Formik,Form, ErrorMessage} from "formik"
import {Button, Header, Label} from "semantic-ui-react"
import TextInput from "../../App/Common/form/TextInput"
import { useStore } from '../../App/stores/store'
import { observer } from 'mobx-react-lite'
function UserForm() {
  const {userStore} = useStore();
  console.log("user store is",userStore);
  return (
    <>
        <Formik
        initialValues={{login:'',password:'',email:'',error:null}}
        onSubmit={(values,{setErrors})=>
        userStore.login(values).catch(error=>setErrors({error:'Check your email or password'}))}
        >
            {({handleSubmit,isSubmitting,errors})=>(
                <Form className='ui form' 
                onSubmit={handleSubmit}
                autoComplete='off'
                >
                  <Header as='h2' content='Login to Reactivites' color='teal' textAlign='center' />
                    <TextInput name='login' placeholder='Enter Email' />
                    <TextInput name='password' placeholder='Enter Password' type='password' />
                    <ErrorMessage name="error" 
                    render={()=><Label style={{marginBottom:0}}
                    content={errors.error}
                    basic color="red"
                     />} />
                    <Button loading={isSubmitting} positive content='Login' type='submit' fluid />
                </Form>
            )}
        </Formik>
    </>
  )
}

export default observer(UserForm)