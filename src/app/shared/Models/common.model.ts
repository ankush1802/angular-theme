import { BaseMsg } from "@shared/Messages/BaseMsg";

export class AuthenticationToken {
  constructor(
    public token = ''
  ) { }
}

export interface MessageRequest {
  authToken: string;
  caller: string;
  msg: BaseMsg;
  parameters: any;
}

export interface BundledMessageRequest {
  authToken: string;
  msgs: BaseMsg[];
  caller: string;
}
