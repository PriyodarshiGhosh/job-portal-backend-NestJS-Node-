import { ObjectionModel } from "@libs/boat";

export interface IUserModel extends ObjectionModel{
    id?: number;
    email?: string,
    uuid?: string,
    password?:string,
    is_active?:boolean,
    role?:string
}