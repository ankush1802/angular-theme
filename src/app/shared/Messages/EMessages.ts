import { BaseMsg } from "./BaseMsg";
import { MessageType } from "./MessageType";

export class GetAllEntityReqMsg extends BaseMsg {
  constructor(
    public m_strEntityNo: string = ""
  ) {
    super(MessageType.MT_EntityReqMsg);
  }
}

export class GetAllEntityRespMsg extends BaseMsg {
  constructor(
    public m_arRecords: GetAllEntityRespMsg.Record[] = []
  ) {
    super(MessageType.MT_EntityRespMsg);
  }
}

export module GetAllEntityRespMsg {
  export class Record extends BaseMsg {
    constructor(
      public m_strCode: string = ""
    ) {
      super();
    }
  }
}
