import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BaseMsg } from '@shared/Messages/BaseMsg';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UserDataService } from './user.data.service';
import { BundledMessageRequest, MessageRequest } from '@shared/Models/common.model';
import { ErrorMsg } from '@shared/Messages/ErrorMsg';
import { MessageType } from '@shared/Messages/MessageType';


/** An object containing one or more name-request pairs to submit to the Backend. */
export type RequestObject = { [key: string]: BaseMsg };
/** A list of properties that match the keys of a RequestObject. */
export type ResponseObject<T> = { [key in keyof T]: BaseMsg };

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'auth-token'
  })
};

export class BaseService {
  constructor(protected http: HttpClient, protected baseUrl: string, public userInfo: UserDataService, protected controllerName: string) { }


  /**
   * Deprecated. Direct all COM requests to postRequest instead.
   * @param method Name of the method being requested
   * @param data Payload data
   * @param parameters (optional) Additional data to be manually deserialized in the specified Controller method
   * @deprecated
   */
  public postComsRequest<T>(method: string, data: BaseMsg, parameters: any = {}): Observable<T> {
    var msgReq: MessageRequest = {
      authToken: this.userInfo.authToken || "",
      caller: this.userInfo.securityId || "",
      msg: data,
      parameters: parameters
    };

    let api = `api/${this.controllerName}/${method}`;
    let msgString = JSON.stringify(msgReq, this.dateStringifyReplacer);

    return this.http.post<T | ErrorMsg>(api, msgString, httpOptions).pipe(
      catchError(this.handleError),
      map(<any>this.logErrorMessage)
    );
  }


  /**
   * Centralized post method for COM requests.
   * The first type variable "ReqMsg" is the type of message to send, while "RespMsg" is the expected response.
   * @param request The request message sent to the COM.
   * @param method (optional) The Controller method to invoke. Exclude this argument to call PostRequest.
   * @param parameters (optional) Additional data to be manually deserialized in the optional Controller method
   * @returns The response message from the COM.
   */
  public postRequest<ReqMsg extends BaseMsg, RespMsg extends BaseMsg>(request: ReqMsg, method = "AuthRequest", parameters: any = {}): Observable<RespMsg> {
    var msgReq: MessageRequest = {
      authToken: this.userInfo.authToken || "",
      caller: this.userInfo.securityId || "",
      msg: request,
      parameters: parameters
    };

    let api = `api/${this.controllerName}/${method}`;
    let msgString = JSON.stringify(msgReq, this.dateStringifyReplacer);

    return this.http.post<RespMsg>(api, msgString, httpOptions).pipe(
      catchError(this.handleError),
      map(this.logErrorMessage)
    ) as Observable<RespMsg>;
  }

  /** Wrapper for postRequest that converts Observables to Promises. */
  public promiseRequest<ReqMsg extends BaseMsg, RespMsg extends BaseMsg>(request: ReqMsg, method = "AuthRequest", parameters: any = {}): Promise<RespMsg> {
    return <Promise<RespMsg>>this.postRequest(request, method, parameters).toPromise();
  }

  /**
   * Centralized post method for Helper COM request messages
   * @param authToken The authtoken returned when spawning the helper com
   * @param request The request message sent to the COM.
   * @param method (optional) The Controller method to invoke. Exclude this argument to call PostRequest.
   * @param parameters (optional) Additional data to be manually deserialized in the optional Controller method
   * @returns The response message from the COM.
   */
  public postHelperComRequest<ReqMsg extends BaseMsg, RespMsg extends BaseMsg>(authToken: string, request: ReqMsg, method = "AuthRequest", parameters: any = {}): Observable<RespMsg> {
    const msgReq: MessageRequest = {
      authToken: authToken,
      caller: this.userInfo.securityId,
      msg: request,
      parameters: parameters
    };

    const api = `api/${this.controllerName}/${method}`;
    const msgString = JSON.stringify(msgReq, this.dateStringifyReplacer);

    return this.http.post<RespMsg>(api, msgString, httpOptions).pipe(
      catchError(this.handleError),
      map(this.logErrorMessage)
    ) as Observable<RespMsg>;
  }

  public postBundledRequest<ReqMsg extends BaseMsg, RespMsg extends BaseMsg>(...requests: ReqMsg[]): Observable<RespMsg[]>;
  public postBundledRequest<T, K extends keyof T>(requests: T): Observable<ResponseObject<T>>;

  /**
   * Send an array of messages to the COM, reducing multiple HTTPS calls into one.
   * If an array of requests is passed, return an array of responses.
   * If a string-keyed object of requests is passed, return a keyed object of responses.
   * @param requests The array of messages to send
   */
  public postBundledRequest<ReqMsg extends BaseMsg, RespMsg extends BaseMsg>(...requests: ReqMsg[] | RequestObject[]): Observable<RespMsg[] | ResponseObject<any>> {
    let api = `api/${this.controllerName}/AuthBundledRequest`;
    var msgReq: BundledMessageRequest = {
      authToken: this.userInfo.authToken || "",
      caller: this.userInfo.securityId || "",
      msgs: []
    }

    if (!requests.length) {
      // No arguments were provided, immediately return
      return of([]);
    }

    // Lambda to log response from COM, whether an array or object was submitted
    let logResponses = (responses: RespMsg[] | ErrorMsg) => {
      if (responses instanceof Array) {
        // Multiple responses returned, some may be errors
        for (let response of responses) {
          this.logErrorMessage(response);
        }
      } else {
        // Response was a single HTTP error
        this.logErrorMessage(responses);
      }
      return responses;
    };

    if (((requests): requests is ReqMsg[] => requests[0] instanceof BaseMsg)(requests)) {
      // An array of requests was passed in
      msgReq.msgs = requests;
      return this.http.post<RespMsg[]>(api, msgReq, httpOptions).pipe(
        catchError(this.handleError),
        map(logResponses)
      ) as Observable<RespMsg[]>;
    } else {
      // A string-keyed object of requests was passed in
      let request = requests[0]
      if (!Object.keys(request).length) {
        // Empty object was submitted, immediately return
        return of(<ResponseObject<any>>{});
      }

      // Using Object.values to extract values would not guarantee insertion order
      msgReq.msgs = Object.getOwnPropertyNames(request).map(prop => request[prop]);
      return this.http.post<RespMsg[]>(api, msgReq, httpOptions).pipe(
        catchError(this.handleError),
        map(logResponses),
        map(responses => {
          if (responses instanceof Array) {
            // Convert array of responses back into map of responses
            let response: ResponseObject<any> = {};
            let properties = Object.getOwnPropertyNames(request);
            for (let i = 0; i < properties.length; ++i) {
              response[properties[i]] = responses[i];
            }
            return response;
          }

          // Return error (this violates return type but mirrors behavior of PostRequest)
          return <RespMsg[]><unknown>responses;
        })
      )
    }
  }

  /**
   * Create a CErrorMsg from the HTTPErrorResponse.
   * @param error The response returned from the HTTP Post request
   * @returns An observable to be piped to the next operator
   */
  public handleError(error: HttpErrorResponse): Observable<ErrorMsg> {
    return of(new CErrorMsg(
      ICMessageType.MT_ErrorMsg, false,
      'An error occurred while posting a request.',
      error.message)
    );
  }

  /**
   * Log error if a failed CErrorMsg was returned.
   * @param response The observable returned from the server
   * @returns An observable to be piped to the next operator
   */
  private logErrorMessage<RespMsg extends BaseMsg>(msg: RespMsg): RespMsg {
    if (msg && msg.eType) {
      // Got back a BaseMsg.
      let error = <ErrorMsg><any>msg;
      if (error.eType == MessageType.MT_ErrorMsg && !error.m_bSuccess) {
        // Got back a failed CErrorMsg.
        (<any>Object).setPrototypeOf(error, ErrorMsg.prototype);
        //StringToolbox.logError(error);
      }
    }
    return msg;
  }

  // /**
  //  * A replacer function for postRequest stringification. Dates are now serialized with toLocaleDate() rather than toISOString(),
  //  * since the COMs ignore the UTC timezone designator in the ISO string.
  //  * @param key {string}
  //  * @param value {any}
  //  */
  private dateStringifyReplacer(key: string, value: any): any {
    /*
     * A replacer's 'this' parameter provides the object in which the current 'key' is found. Since the 'value' argument passed in for
     * the date properties will be the ISO string result of Date.prototype.toJSON(), we use 'this[key]' to access the original Date object
     */
    // if (this[key] instanceof Date) {
    //   let formattedDate = (<Date>this[key]).toLocaleString();
    //   //Edge inserts bidirectional control characters around dates so we need to strip those out
    //   //or it breaks the message deserialization on the server side
    //   return formattedDate.replace(/[^\x00-\x80]/g, '');
    // }

    return value;
  }

  // /**
  //  * Request a download link for the specified file path, then open the link in a new tab to initiate a direct download
  //  * @param filePath {string}
  //  */
  // public downloadFile(filePath: string) {
  //   const api = "api/FileStream";
  //   const content: FileDownloadRequest = { authToken: this.userInfo.authToken, filePath: filePath };

  //   const request$ = this.http.post<string>(`${api}/FileLinkRequest`, content, { ...httpOptions, responseType: "text" as "json" })
  //     .pipe(catchError(this.handleError));

  //   request$.subscribe(response => {
  //     if (typeof response === "string") {
  //       const url = `/${api}/GetFile/?fileId=${response}`;
  //       window.open(url, "Beginning Download...");
  //     }
  //   });
  // }
}
