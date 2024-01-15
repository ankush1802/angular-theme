import { EntityService } from "./entity.service";

export interface Entity{
  entity_Id : number;
  entity_Title: string;
  entity_uid : string;
  parent_id? : number;
  entity_Sub_Title?:string;
  entity_Description?:string;
  entity_Address?:string;
  entity_City?:string;
  entity_State?:string;
  entity_Country?:string;
  entity_Zipcode?:string;
  entity_Phone_1?:string;
  entity_Phone_2?:string;
  entity_Phone_3?:string;
  entity_Email_1?:string;
  entity_Email_2?:string;
  entity_Email_3?:string;
  entity_Website?:string;
  entity_Active:boolean;
  entity_CreatedOn:string;
}
export interface IManageEntityDialogData {
  service: EntityService;
  entityId: number;
}
