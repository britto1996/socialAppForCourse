
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import {Segment, Button, Label, Header} from 'semantic-ui-react'
import Load from '../../../App/Layout/Loader';
import { useStore } from '../../../App/stores/store';
import {Formik,Form,ErrorMessage} from "formik";
import TextInput from "../../../App/Common/form/TextInput"
import * as Yup from "yup";

import {v4 as uuid} from "uuid";
import TextArea from '../../../App/Common/form/TextArea';
import SelectInput from '../../../App/Common/form/SelectInput';
import { category } from '../../../App/Common/option/category';
import DateInput from '../../../App/Common/form/DateInput';
import { Activity } from '../../../App/Models/activity';


function ActivitiesForm() {
    const {activityStore} = useStore();
    const {selectedActivity,createActivity,updateActivity,loading,loadingInitial,loadActivity} = activityStore;
    const {id} = useParams<{id: string}>();
    const history = useHistory();
    const [activity,setActivity] = useState<Activity>({
        id:'',
        title:'',
        category:'',
        description:'',
        date:null,
        city:'',
        venue:''
    });

    const validationSchema = Yup.object({
        title:Yup.string().required("Activity title is required"),
        category:Yup.string().required("Activity category is required"),
        description:Yup.string().required("Activity description is required"),
        date:Yup.string().required("Activity date is required"),
        city:Yup.string().required("Activity city is required"),
        venue:Yup.string().required("Activity venue is required")
    })

    useEffect(()=>{
        if(id) loadActivity(id).then((activity)=>setActivity(activity!))
        
    },[id,loadActivity]);
    
    function handleFormSubmit(activity:Activity){
        if(activity.id.length===0){
            var newActivity = {
                ...activity,
                id:uuid()
            };
             createActivity(newActivity).then(()=>history.push(`/activities/${newActivity.id}`))
        }else{
            updateActivity(activity).then(()=>history.push(`/activities/${activity.id}`));
        }
        
    }
    

  return (
    <>
    <Segment clearing>
        <Header content="Activity Details" sub color='teal' />
        <Formik 
        validationSchema={validationSchema}
        enableReinitialize 
        initialValues={activity} 
        onSubmit={values=>handleFormSubmit(values)}>
            {({handleSubmit,isValid,isSubmitting,dirty})=>(
            <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                <TextInput name='title' placeholder="Title" />
                <TextArea rows={3} placeholder="Description" name="description" />
                <SelectInput options={category} placeholder="Category" name="category" />
                <DateInput placeholderText="Date" name="date" showTimeSelect timeCaption='time' dateFormat='MMMM d, yyyy h:mm aa' />
                <Header content="Location Details" sub color='teal' />
                <TextInput placeholder="City" name="city" />
                <TextInput placeholder="Venue" name="venue" />
                <Button disabled={isSubmitting || !dirty || !isValid} floated="right" positive type="submit" content="Submit" />
                <Button floated="right" as={Link} to={"/activities"} type="button" content="Cancel" />
        </Form>
            )}
        </Formik>
        
    </Segment>
    </>
  )
}

export default observer(ActivitiesForm)