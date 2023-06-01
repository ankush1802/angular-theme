import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

/** User information returned from the /login endpoint and passed to /spawn and /terminate.
 *  We cannot pass the entire UserDataService because that creates JSON serialization issues.
 */
export class UserSession {
  constructor(
    public authToken = "",
    public userName = "",
    public entityNo = "",
    public securityId = "",
    public version = "",
    public userId = "",
    public privileges: Record<string, string> = {},
  //  public entities: CValidEntityRespMsg.Record[] = [],
    public killLastConnection = true,
    public m_lDaysTillExpire = 0,
    public paxxword = "",
    public featureFlags: FeatureFlagModel[] = [],
    public timeoutInterval = 0,
  ) { }



  /** Constructor a new UserSession from a service. */
  // static fromService(service: UserDataService, killLastConnection = true): UserSession {
  //   return new UserSession(
  //     service.authToken,
  //     service.userName,
  //     service.entityNo,
  //     service.securityId,
  //     service.version,
  //     service.userId,
  //     service.privileges,
  //     service.entities,
  //     killLastConnection,
  //     service.m_lDaysTillExpire,
  //     service.paxxword,
  //     service.featureFlags,
  //     service.timeoutInterval
  //   );
  // }
}

export class FeatureFlagModel {
  constructor(
    public entityNo: string = "",
    public moduleID: number = 0,
    public moduleName: string = "",
    public moduleDesc: string = "",
    public enabled: boolean = false,
    public parentModuleID: number = 0,
    public sortOrder: number = 0
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  /** The user token for the current session. */
  public authToken = "";
  /** The name of the currently logged-in user. */
  public userName = "";
  /** @deprecated. Get the entityNo of the entity instead. */
  public entityNo = "";
  /** The allowed security clearance of the current user.*/
  public securityId = "";
  /** URL of current user's profile image */
  public profileImage = "";
  /** Current Build Version string */
  public version = "";
  /** The user Id */
  public userId = "";
  // /** Emits whenever the selected entity is changed. */
  // public entityChanged = new ReplaySubject<CValidEntityRespMsg.Record>(1);
  // /** Emits whenever a new list of entities is loaded. */
  // public entitiesChanged = new ReplaySubject<CValidEntityRespMsg.Record[]>(1);
  // /** Cached mapping from entity IDs to their information. */
  // public entityMap = new Map<string, CValidEntityRespMsg.Record>();
  /**Password days till expire */
  public m_lDaysTillExpire: number = 0;
  /** Encrypted password */
  public paxxword: string = "";
  /*Timeout interval for the user*/
  public timeoutInterval : number = 0;
  // /** Internal entity guarded by the getter and setter. */
  // private _entity = new CValidEntityRespMsg.Record();
  // /** Internal list of entities protected by the getter and setter. */
  // private _entities: CValidEntityRespMsg.Record[] = [];
  /** Internal mapping from entities to sets of privileges. */
  private _privilegeSet = new Map<string, Set<string>>();
  /** Internal mapping from entities for feature flags. */
  public _featureFlags: FeatureFlagModel[] = [];

  /** The currently selected entity. */
  // get entity(): CValidEntityRespMsg.Record {
  //   return this._entity;
  // }

  // set entity(entity: CValidEntityRespMsg.Record) {
  //   this._entity = entity;
  //   this.entityChanged.next(entity);
  // }

  // /** The list of entities available to select. */
  // get entities(): CValidEntityRespMsg.Record[] {
  //   return this._entities;
  // }

  // set entities(entities: CValidEntityRespMsg.Record[]) {
  //   this._entities = entities;
  //   this._entities.forEach(entity => this.entityMap.set(entity.m_strEntityNo, entity));
  //   this.entitiesChanged.next(entities);

  //   // Set entity to previously-selected entity or first entity or an empty entity record.
  //   this.entity = entities.find(e => e.m_strEntityNo === this._entity.m_strEntityNo) || entities[0] || new CValidEntityRespMsg.Record();
  // }

  /**  Retrieves the Entity name of Entity ID */
  // public getEntityName(entityNumber: string): string {
  //   const entityName = this.entities.find(e => e.m_strEntityNo === entityNumber).m_strEntityName || entityNumber;
  //   return entityName;
  // }

  // set privileges(privileges: Record<string, string>) {
  //   this._privilegeSet.clear();
  //   for (let entity of Object.keys(privileges)) {
  //     this._privilegeSet.set(entity, new Set(["", ...privileges[entity].split(";")]));
  //   }
  // }

  // get featureFlags(): FeatureFlagModel[] {
  //   return this._featureFlags
  // }

  // set featureFlags(featureFlags: FeatureFlagModel[]) {
  //   this._featureFlags = featureFlags;
  // }

  /** Reset all login values to a certain state.
   *  @param data The new user session, or undefined to reset service.
   */
  // public update(data = new UserSession()): void {
  //   // Create a blank service and assign all fields to this.
  //   Object.assign(this, data);
  // }

  // /**
  //  * Return true if user has specific permission.
  //  * @param all True if ALL permissions are required. Otherwise, at least one.
  //  * @param module One or more permissions to check for.
  //  */
  // public hasPermission(all: boolean, ...codes: Permission[]): boolean {
  //   let perms = this._privilegeSet.get(this.entity.m_strEntityNo) || new Set();
  //   if (all) {
  //     return codes.every(code => perms.has(code));
  //   } else {
  //     return codes.some(code => perms.has(code));
  //   }
  // }

  // /**
  //  * Return true if user has privileges to access a specific module.
  //  * Takes into account equivalent codes like "IE", "IF", "IX"
  //  * @param code The code to check permissions for.
  //  */
  // public hasModulePermission(code: Permission): boolean {
  //   return this.hasPermission(false, ...(MODULE_PRIVILEGES[code] || [code]));
  // }

  // /**
  //  * Returns true if entity is successfuly changed
  //  * Allows modules to change entity if user has access
  //  */
  // public setEntity(entityNo: string): boolean {
  //   let entity = this.entities.find(e => e.m_strEntityNo === entityNo);
  //   if (entity != undefined) {
  //     this.entity = entity;
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }

  // public getFeatureToggle() {
  //   if (this.featureFlags != null && this.featureFlags.findIndex(ff => ff.entityNo == this.entity.m_strEntityNo) > -1) {
  //     let features = this.featureFlags.filter(ent => ent.entityNo == this.entity.m_strEntityNo);
  //     return features.map(ff => {
  //       return <Feature>{
  //         enable: features.find(x => (ff.parentModuleID == 0 || x.moduleID == ff.parentModuleID)).enabled == true ? ff.enabled : false,
  //         name: ff.moduleName,
  //         parent: ff.parentModuleID == 0 ? true : false,
  //         moduleId: ff.moduleID,
  //         parentModuleId: ff.parentModuleID
  //       }
  //     })
  //   } else {
  //     return FeatureToggleConfig.settings.features;
  //   }
  // }
}
