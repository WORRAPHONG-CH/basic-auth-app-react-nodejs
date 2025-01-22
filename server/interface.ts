export interface Users{
    name?:string,
    email:string,
    password:string
}

export interface UserLogin{
    name?:string,
    email:string,
    role:string,
    iat:number,
    exp:number
}