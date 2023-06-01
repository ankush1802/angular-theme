/*
 * Copyright:   Copyright (C) 2023 Agnihotri Information Systems
 *              Chandigarh, INDIA.
 *              All Rights Reserved.
 *
 * Authors(s):  Ankush Agnihotri
 * DateCreated: 2023-05-25
 */

import { MessageType } from "./MessageType";

/** Enumeration of imaging systems. */
export enum HostSystem {
  /** The host system is unknown or not set. */
  Unknown,
  /** BankWare ImageCentre Check Imaging System. */
  AIS,
};

/** Base class all messages are derived from. */
export class BaseMsg {
  constructor(
    /** Unique identifier for message type. */
    public eType = MessageType.MT_NULL,
    /** Unknown? */
    public Source = "",
    /** System this message originated from. */
    public m_eHostSystem = HostSystem.AIS,
    /** List of zero or more nested messages appended to this one. */
    public m_arRecords: BaseMsg[] = []
  ) {
  }
}
