import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../Models/serverError";

export default class CommonStore{
    error: ServerError | null = null;
    "user-token":string | null = window.localStorage.getItem('ownerId');
    appLoaded = false;


    constructor(){
        makeAutoObservable(this);

        reaction(
            ()=>this["user-token"],
            token=>{
                if(token){
                    window.localStorage.setItem("user-token",token)
                }else{
                    window.localStorage.removeItem("user-token")
                }
            }
        )
    }

    setServerError = (error:ServerError) =>{
        this.error = error;
    }

    setToken = (token: string | null) => {
         
        this["user-token"] = token;

    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}