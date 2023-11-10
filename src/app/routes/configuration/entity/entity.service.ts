import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Entity } from './entity.model';
import { ApiBaseUrls, EntityModouleApiEndpoints } from 'app/api.endpoints';


@Injectable({
  providedIn: 'root'
})
export class EntityService {
  constructor(protected http: HttpClient) {}

  /**
  * Fetch the entities list
  * @param request - request message for retriving all entities
  */
  public getAllEntities(request : any) {
    return this.http.post<Entity[]>(`${ApiBaseUrls.entitybaseUrl}${EntityModouleApiEndpoints.GetAllEntities}`, request);
  }

}
