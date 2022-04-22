import { makeAutoObservable, runInAction } from "mobx";
import api from "../api/api";
import { User, UserFormValues } from "../Models/User";
import {history} from "../../index";
import { store } from "./store";

export default class UserStore{
    user:User | null = null;

    constructor(){
        makeAutoObservable(this);
    }

    get isLoggedIn(){
        return !!this.user;
    }

    

    login = async (creds:UserFormValues) => {
        try {
            const user = await api.Account.login(creds);
            console.log("user is",user);
            
            store.commonStore.setToken(user["user-token"]);
            
            // window.localStorage.setItem('ownerId',user.ownerId)
            // console.log("token is",store.commonStore.setToken(user.token))
            runInAction(()=> this.user = user);
            history.push('/activities');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            await api.Account.register(creds);
            history.push(`/account/registerSuccess?email=${creds.email}`);
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('user-token');
        this.user = null;
        history.push("/");
    }



    getUser = async() => {
        try {
            const user = await api.Account.current();
            runInAction(()=>this.user = user);
        } catch (error) {
            console.log(error);
        }
    }
}