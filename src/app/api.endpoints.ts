
export enum ApiBaseUrls {
  authbaseUrl = 'https://localhost:8000/',
  entitybaseUrl = 'https://localhost:7034/',
}

export enum AuthModouleApiEndpoints {
  Auth = 'api/Auth/ValidateUser',
}

export enum EntityModouleApiEndpoints {
  GetAllEntities = 'api/EntityManager/GetEntities',
  SaveEntity='api/EntityManager/SaveEntity'
}
