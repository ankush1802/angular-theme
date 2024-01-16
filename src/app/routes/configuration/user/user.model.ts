

export interface AppUser{
  appUser_Id : number;
  appUser_Firstname: string;
  appUser_Middlename? : string;
  appUser_Lastname? : string;
  appUser_Address?:string;
  appUser_City?:string;
  appUser_State?:string;
  appUser_Country?:string;
  appUser_Zipcode?:string;
  appUser_Phone?:string;
  appUser_Email?:string;
  appUser_Website?:string;
  appUser_Active:boolean;
  appUser_CreatedOn:string;
  parent_id? : number;
}

