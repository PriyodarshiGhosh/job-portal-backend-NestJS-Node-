import { ObjectionModel } from "@libs/boat";

export interface IJobModel extends ObjectionModel{
    id?: number;
    uuid?: string,
    title?:string,
    description?:string,
    location?:string,
    salary?:string,
    is_active?:boolean,
    recruiter_id?:number
}
export interface IJobSearchModel {
    recruiterId?:number,
    search?: string;
    page?: number;
    perPage?: number;
  }