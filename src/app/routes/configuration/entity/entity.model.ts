export interface Entity{
  Entity_Id : number;
  Entity_Title: string;
  Entity_uid : string;
  Parent_Entity_Id? : number;
  Entity_Sub_Title?:string;
  Entity_Description?:string;
  Entity_Address?:string;
  Entity_City?:string;
  Entity_State?:string;
  Entity_Zipcode?:string;
  Entity_Phone_1?:string;
  Entity_Phone_2?:string;
  Entity_Phone_3?:string;
  Entity_Email_1?:string;
  Entity_Email_2?:string;
  Entity_Email_3?:string;
  Entity_Website?:string;
  Entity_Active:boolean;
  Entity_Created_date:string;
}
