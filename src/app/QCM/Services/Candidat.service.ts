import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Candidat } from '../Model/Candidat';
import { CandidatCriteria } from '../Model/Criteria/CandidatCriteria';
import { QcmCandidatCriteria } from '../Model/Criteria/QcmCandidatCriteria';
import { Societe } from '../Model/Societe';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {
  private source = new BehaviorSubject<any>([]);
  change$ = this.source.asObservable();
  changeValue(row:any) { this.source.next(row) }

  private condidat = new BehaviorSubject<any>([]);
  changeCondidat$ = this.condidat.asObservable();
  changeValueCondidat(row:any) { this.condidat.next(row) }
  
  constructor(private httpClient: HttpClient) {}

/* -------------------------------------------------------------------------- */
  /*                                   Crud Candidat                                   */
  /* -------------------------------------------------------------------------- */

  creerCandidat(data: Candidat) {
    return this.httpClient.post<any>(
      environment.base_url + `/api/testqcm/candidat/edit`,
      data
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                                   List Candidat    criteria                                */
  /* -------------------------------------------------------------------------- */

  listCandidatCriteria(
    body: CandidatCriteria,
    page: number,
    pageSize: number
  ) {
    console.log(body);
    
    let pageParams = { page: String(page), size: String(pageSize) };
    return this.httpClient.post<any>(
      `${environment.base_url}/api/testqcm/candidat/search`,
      body,
      {
        observe: "body",
        responseType: "json",
        params: pageParams,
      }
    );
  }


  
  /* -------------------------------------------------------------------------- */
  /*                                   List qcm Candidat    criteria                                */
  /* -------------------------------------------------------------------------- */

  listQcmCandidatCriteria(
    body: QcmCandidatCriteria,
    page: number,
    pageSize: number
  ) {
    console.log(body);
    
    let pageParams = { page: String(page), size: String(pageSize) };
    return this.httpClient.post<any>(
      `${environment.base_url}/api/testqcm/qcmcandidat/search`,
      body,
      {
        observe: "body",
        responseType: "json",
        params: pageParams,
      }
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                                   List Societe                                   */
  /* -------------------------------------------------------------------------- */


  listSociete() {
    return this.httpClient.get<any[]>(
      environment.base_url + "/api/testqcm/societe/list",
      {
        observe: "body",
        responseType: "json",
      }
    );
  }


  /* -------------------------------------------------------------------------- */
  /*                                   send mail                                   */
  /* -------------------------------------------------------------------------- */

  sendMail(candidat: Candidat) {
    return   this.httpClient.post<Candidat>( environment.base_url + `/api/testqcm/qcm/mail`, candidat);
 }


 
  /* -------------------------------------------------------------------------- */
  /*                                  all Qcm Candidat                                   */
  /* -------------------------------------------------------------------------- */

 

 allQcmCandidat(
  page: number,
  pageSize: number
) {
  
  let pageParams = { page: String(page), size: String(pageSize) };
  return this.httpClient.get<any>(
    `${environment.base_url}/api/testqcm/qcm/qcmcandidat`,
    {
      observe: "body",
      responseType: "json",
      params: pageParams,
    }
  );
}

/* -------------------------------------------------------------------------- */
  /*                                   List candidat                                   */
  /* -------------------------------------------------------------------------- */


  listCandidat() {
    return this.httpClient.get<any[]>(
      environment.base_url + "/api/testqcm/candidat/list",
      {
        observe: "body",
        responseType: "json",
      }
    );
  }

  
/* -------------------------------------------------------------------------- */
  /*                                   List candidat                                   */
  /* -------------------------------------------------------------------------- */


  listQcm() {
    return this.httpClient.get<any[]>(
      environment.base_url + "/api/testqcm/qcm/list",
      {
        observe: "body",
        responseType: "json",
      }
    );
  }

  
}