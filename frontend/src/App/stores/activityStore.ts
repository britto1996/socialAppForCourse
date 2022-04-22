import { makeAutoObservable, runInAction } from "mobx";
import api from "../api/api";
import { Activity } from "../Models/activity";

import {format} from "date-fns";
import { store } from "./store";


export default class ActivityStore{
     activityRegistry = new Map<string,Activity>();
     selectedActivity:Activity | undefined;
     edit = false;
     loading = false;
     loadingInitial = true;

    constructor(){
        makeAutoObservable(this)
    }

    get activitiesByDate(){
        return Array.from(this.activityRegistry.values())
        .sort((a,b)=>(a.date!.getTime()) - (b.date!.getTime()));
    }

    get groupedActivities(){
        return Object.entries(
            this.activitiesByDate.reduce((activities,activity)=>{
                const date = format(activity.date!,'dd MMM yyy')
                activities[date] = activities[date] ? [...activities[date],activity] : [activity];
                return activities;
            },{} as {[key:string] : Activity[]})
        )
    }
    
    loadActivities = async () => {
       this.loadingInitial = true;
        try {
            const activities = await api.Activities.list();
        
                 activities.forEach((activity: Activity)=>{
                 this.setActivity(activity);
                 })
                this.setLoadingInitial(false);
            
            
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadActivity = async(id:string) => {
        let chooseActivity = this.getActivity(id);
        if(chooseActivity){
            this.selectedActivity = chooseActivity;
            return chooseActivity;
        }else{
            this.loadingInitial = true;
            try {
                chooseActivity = await api.Activities.details(id);
                this.setActivity(chooseActivity);
                runInAction(()=>{
                    this.selectedActivity = chooseActivity;
                })
                
                this.setLoadingInitial(false);
                return chooseActivity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(true);
            }
        }
    }

    private setActivity = (activity:Activity) => {
         const user = store.userStore.user;
         if (user) {
            activity.isGoing = activity.attendees!.some(
                a => a.username === user.username
            )
            activity.isHost = activity.hostUsername === user.username;
            activity.host = activity.attendees?.find(x => x.username === activity.hostUsername);
        }
         activity.date = new Date(activity.date!);
         this.activityRegistry.set(activity.id,activity);
    }

    private getActivity = (id:string) => {
       return this.activityRegistry.get(id);
    }

    setLoadingInitial = (state:boolean) => {
        this.loadingInitial=state;
    }

    

    createActivity = async(activity:Activity) => {
        this.loading = true; 
        this.loadingInitial = true;
        
        
        try {
            await api.Activities.create(activity);
            runInAction(()=>{
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.edit = false;
                this.loading = false;
                this.loadingInitial = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(()=>{
                this.loading = false;
                this.loadingInitial = false;
            })
        }
    }
    updateActivity = async(activity:Activity) => {
        this.loading = true;
        try {
            await api.Activities.update(activity);
            runInAction(()=>{
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.edit = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        }
    }
    deleteActivity = async (id:string) => {
        this.loading = true;
        try {
            await api.Activities.delete(id);
            runInAction(()=>{
                this.activityRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        }
    }

}