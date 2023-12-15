import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBaseUrls, EntityModouleApiEndpoints } from 'app/api.endpoints';
import { MessageResponse } from '@shared/Models/common.model';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  constructor(protected http: HttpClient) {}

  /**
   * Fetch the entities list
   * @param request - request message for retriving all entities
   */
  public getAllEntities(request: any) {
    return this.http.post<MessageResponse>(
      `${ApiBaseUrls.entitybaseUrl}${EntityModouleApiEndpoints.GetAllEntities}`,
      request
    );
  }
}
