import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBaseUrls, EntityModouleApiEndpoints } from 'app/api.endpoints';
import { MessageResponse } from '@shared/Models/common.model';
import { User } from '@core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public manageUserDialogOpen: boolean = false;
  constructor(protected http: HttpClient) {}

  /**
   * Fetch the entities list
   * @param request - request message for retriving all entities
   */
  public getAllUsers(request: any) {
    return this.http.post<MessageResponse>(
      `${ApiBaseUrls.entitybaseUrl}${EntityModouleApiEndpoints.GetAllEntities}`,
      request
    );
  }
  public saveEntity(request: User) {
    return this.http.post<MessageResponse>(
      `${ApiBaseUrls.entitybaseUrl}${EntityModouleApiEndpoints.SaveEntity}`,
      request
    );
  }
}
