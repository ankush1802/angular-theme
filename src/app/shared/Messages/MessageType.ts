/*
 * Copyright:   Copyright (C) 2023 Agnihotri Information Systems
 *              Chandigarh, INDIA.
 *              All Rights Reserved.
 *
 * Authors(s):  Ankush Agnihotri
 * DateCreated: 2023-05-25
 */

export const enum MessageType {
  MT_NULL = 0,
  MT_BundledMsg,
  MT_NetTestMsg = 55,
  MT_ConcurrentSessions,

  // Common IC messages
  MT_ErrorMsg      = 100,
  MT_EntityReqMsg,
  MT_EntityRespMsg,
  MT_UserInfoReqMsg,

};
