export interface User{
    username:string;
    displayname:string;
    "user-token":string;
    image?:string;
}

export interface UserFormValues{
    email:string;
    login:string;
    password:string;
    displayname?:string;
    username?:string;
}