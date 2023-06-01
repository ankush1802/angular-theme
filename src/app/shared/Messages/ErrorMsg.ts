import { BaseMsg } from "./BaseMsg";
import { MessageType } from "./MessageType";

export class ErrorMsg extends BaseMsg {
  constructor(
    public m_lType: number = 0,
    public m_bSuccess: boolean = false,
    public m_strError: string = "",
    public m_strExtraInfo: string = ""
  ) {
    super(MessageType.MT_ErrorMsg);
  }
}
