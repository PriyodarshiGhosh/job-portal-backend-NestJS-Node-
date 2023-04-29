import { ObjectionModel } from "@libs/boat";

export interface IApplicationModel extends ObjectionModel{
    id?: number;
    uuid?: string,
    resume?:string,
    jobId?:number,
    recruiterId?:number,
    userId?:number
}