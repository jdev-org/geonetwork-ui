/**
 * GeoNetwork 4.2.7 OpenAPI Documentation
 * This is the description of the GeoNetwork OpenAPI. Use this API to manage your catalog.
 *
 * The version of the OpenAPI document: 4.2.7
 * Contact: geonetwork-users@lists.sourceforge.net
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@angular/core'
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  HttpEvent,
  HttpParameterCodec,
} from '@angular/common/http'
import { CustomHttpParameterCodec } from '../encoder'
import { Observable } from 'rxjs'

import { MetadataIdentifierTemplateApiModel } from '../model/models'

import { BASE_PATH, COLLECTION_FORMATS } from '../variables'
import { Configuration } from '../configuration'

@Injectable({
  providedIn: 'root',
})
export class IdentifiersApiService {
  protected basePath = 'https://demo.georchestra.org/geonetwork/srv/api'
  public defaultHeaders = new HttpHeaders()
  public configuration = new Configuration()
  public encoder: HttpParameterCodec

  constructor(
    protected httpClient: HttpClient,
    @Optional() @Inject(BASE_PATH) basePath: string,
    @Optional() configuration: Configuration
  ) {
    if (configuration) {
      this.configuration = configuration
    }
    if (typeof this.configuration.basePath !== 'string') {
      if (typeof basePath !== 'string') {
        basePath = this.basePath
      }
      this.configuration.basePath = basePath
    }
    this.encoder = this.configuration.encoder || new CustomHttpParameterCodec()
  }

  private addToHttpParams(
    httpParams: HttpParams,
    value: any,
    key?: string
  ): HttpParams {
    if (typeof value === 'object' && value instanceof Date === false) {
      httpParams = this.addToHttpParamsRecursive(httpParams, value)
    } else {
      httpParams = this.addToHttpParamsRecursive(httpParams, value, key)
    }
    return httpParams
  }

  private addToHttpParamsRecursive(
    httpParams: HttpParams,
    value?: any,
    key?: string
  ): HttpParams {
    if (value == null) {
      return httpParams
    }

    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        ;(value as any[]).forEach(
          (elem) =>
            (httpParams = this.addToHttpParamsRecursive(httpParams, elem, key))
        )
      } else if (value instanceof Date) {
        if (key != null) {
          httpParams = httpParams.append(
            key,
            (value as Date).toISOString().substr(0, 10)
          )
        } else {
          throw Error('key may not be null if value is Date')
        }
      } else {
        Object.keys(value).forEach(
          (k) =>
            (httpParams = this.addToHttpParamsRecursive(
              httpParams,
              value[k],
              key != null ? `${key}.${k}` : k
            ))
        )
      }
    } else if (key != null) {
      httpParams = httpParams.append(key, value)
    } else {
      throw Error('key may not be null if value is not object or array')
    }
    return httpParams
  }

  /**
   * Add an identifier template
   * @param metadataIdentifierTemplateApiModel
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public addIdentifier(
    metadataIdentifierTemplateApiModel: MetadataIdentifierTemplateApiModel,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<number>
  public addIdentifier(
    metadataIdentifierTemplateApiModel: MetadataIdentifierTemplateApiModel,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpResponse<number>>
  public addIdentifier(
    metadataIdentifierTemplateApiModel: MetadataIdentifierTemplateApiModel,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpEvent<number>>
  public addIdentifier(
    metadataIdentifierTemplateApiModel: MetadataIdentifierTemplateApiModel,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<any> {
    if (
      metadataIdentifierTemplateApiModel === null ||
      metadataIdentifierTemplateApiModel === undefined
    ) {
      throw new Error(
        'Required parameter metadataIdentifierTemplateApiModel was null or undefined when calling addIdentifier.'
      )
    }

    let headers = this.defaultHeaders

    let httpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json']
      httpHeaderAcceptSelected =
        this.configuration.selectHeaderAccept(httpHeaderAccepts)
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected)
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json']
    const httpContentTypeSelected: string | undefined =
      this.configuration.selectHeaderContentType(consumes)
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected)
    }

    let responseType_: 'text' | 'json' = 'json'
    if (
      httpHeaderAcceptSelected &&
      httpHeaderAcceptSelected.startsWith('text')
    ) {
      responseType_ = 'text'
    }

    return this.httpClient.put<number>(
      `${this.configuration.basePath}/identifiers`,
      metadataIdentifierTemplateApiModel,
      {
        responseType: <any>responseType_,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    )
  }

  /**
   * Remove an identifier template
   * @param identifier Identifier template identifier
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deleteIdentifier(
    identifier: number,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<any>
  public deleteIdentifier(
    identifier: number,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpResponse<any>>
  public deleteIdentifier(
    identifier: number,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpEvent<any>>
  public deleteIdentifier(
    identifier: number,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<any> {
    if (identifier === null || identifier === undefined) {
      throw new Error(
        'Required parameter identifier was null or undefined when calling deleteIdentifier.'
      )
    }

    let headers = this.defaultHeaders

    let httpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json']
      httpHeaderAcceptSelected =
        this.configuration.selectHeaderAccept(httpHeaderAccepts)
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected)
    }

    let responseType_: 'text' | 'json' = 'json'
    if (
      httpHeaderAcceptSelected &&
      httpHeaderAcceptSelected.startsWith('text')
    ) {
      responseType_ = 'text'
    }

    return this.httpClient.delete<any>(
      `${this.configuration.basePath}/identifiers/${encodeURIComponent(
        String(identifier)
      )}`,
      {
        responseType: <any>responseType_,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    )
  }

  /**
   * Get identifier templates
   * Identifier templates are used to create record UUIDs havind a particular structure. The template will be used when user creates a new record. The template identifier to use is defined in the administration &gt; settings.
   * @param userDefinedOnly Only user defined ones
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getIdentifiers(
    userDefinedOnly?: boolean,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<Array<MetadataIdentifierTemplateApiModel>>
  public getIdentifiers(
    userDefinedOnly?: boolean,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpResponse<Array<MetadataIdentifierTemplateApiModel>>>
  public getIdentifiers(
    userDefinedOnly?: boolean,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpEvent<Array<MetadataIdentifierTemplateApiModel>>>
  public getIdentifiers(
    userDefinedOnly?: boolean,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<any> {
    let queryParameters = new HttpParams({ encoder: this.encoder })
    if (userDefinedOnly !== undefined && userDefinedOnly !== null) {
      queryParameters = this.addToHttpParams(
        queryParameters,
        <any>userDefinedOnly,
        'userDefinedOnly'
      )
    }

    let headers = this.defaultHeaders

    let httpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json']
      httpHeaderAcceptSelected =
        this.configuration.selectHeaderAccept(httpHeaderAccepts)
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected)
    }

    let responseType_: 'text' | 'json' = 'json'
    if (
      httpHeaderAcceptSelected &&
      httpHeaderAcceptSelected.startsWith('text')
    ) {
      responseType_ = 'text'
    }

    return this.httpClient.get<Array<MetadataIdentifierTemplateApiModel>>(
      `${this.configuration.basePath}/identifiers`,
      {
        params: queryParameters,
        responseType: <any>responseType_,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    )
  }

  /**
   * Update an identifier template
   * @param identifier Identifier template identifier
   * @param metadataIdentifierTemplateApiModel
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public updateIdentifier(
    identifier: number,
    metadataIdentifierTemplateApiModel: MetadataIdentifierTemplateApiModel,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<any>
  public updateIdentifier(
    identifier: number,
    metadataIdentifierTemplateApiModel: MetadataIdentifierTemplateApiModel,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpResponse<any>>
  public updateIdentifier(
    identifier: number,
    metadataIdentifierTemplateApiModel: MetadataIdentifierTemplateApiModel,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpEvent<any>>
  public updateIdentifier(
    identifier: number,
    metadataIdentifierTemplateApiModel: MetadataIdentifierTemplateApiModel,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<any> {
    if (identifier === null || identifier === undefined) {
      throw new Error(
        'Required parameter identifier was null or undefined when calling updateIdentifier.'
      )
    }
    if (
      metadataIdentifierTemplateApiModel === null ||
      metadataIdentifierTemplateApiModel === undefined
    ) {
      throw new Error(
        'Required parameter metadataIdentifierTemplateApiModel was null or undefined when calling updateIdentifier.'
      )
    }

    let headers = this.defaultHeaders

    let httpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json']
      httpHeaderAcceptSelected =
        this.configuration.selectHeaderAccept(httpHeaderAccepts)
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected)
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json']
    const httpContentTypeSelected: string | undefined =
      this.configuration.selectHeaderContentType(consumes)
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected)
    }

    let responseType_: 'text' | 'json' = 'json'
    if (
      httpHeaderAcceptSelected &&
      httpHeaderAcceptSelected.startsWith('text')
    ) {
      responseType_ = 'text'
    }

    return this.httpClient.put<any>(
      `${this.configuration.basePath}/identifiers/${encodeURIComponent(
        String(identifier)
      )}`,
      metadataIdentifierTemplateApiModel,
      {
        responseType: <any>responseType_,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    )
  }
}
