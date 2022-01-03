import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QcmCriteria } from '../Model/Criteria/QcmCriteria';
import { Qcm } from '../Model/Qcm';

@Injectable({
  providedIn: 'root'
})
export class QCMService {
  private source = new BehaviorSubject<any>(null);
  change$ = this.source.asObservable();

  constructor(private httpClient: HttpClient) {}

  changeValue(row:any) { this.source.next(row) }



/* -------------------------------------------------------------------------- */
  /*                                   Crud Qcm                                   */
  /* -------------------------------------------------------------------------- */

  creerQcm(data: any) {
    return this.httpClient.post<any>(
      environment.base_url + `/api/testqcm/qcm/edit`,
      data
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                                   List Qcm                                   */
  /* -------------------------------------------------------------------------- */

  listQcm(
    body: QcmCriteria,
    page: number,
    pageSize: number
  ) {
    let pageParams = { page: String(page), size: String(pageSize) };
    body.dateCreation = body.dateCreation ? moment(body.dateCreation) : null;
    return this.httpClient.post<any>(
      `${environment.base_url}/api/testqcm/qcm/search`,
      body,
      {
        observe: "body",
        responseType: "json",
        params: pageParams,
      }
    );
  }

/* -------------------------------------------------------------------------- */
  /*                                   List Choix Question                                   */
  /* -------------------------------------------------------------------------- */

 

  getChoixsQuestion(id: number) {
    return this.httpClient.get<any>(
      `${environment.base_url}/api/testqcm/qcm/choix/${id}`,
      {
        observe: "body",
        responseType: "json"
      }
    );
  }



  /* -------------------------------------------------------------------------- */
  /*                                   Affecter Qcm Candidat                                   */
  /* -------------------------------------------------------------------------- */

  affecter(data: any) {
    return this.httpClient.post<any>(
      environment.base_url + `/api/testqcm/qcm/affecte`,
      data
    );
  }


  
  /* -------------------------------------------------------------------------- */
  /*                                   Commencer  Qcm                                    */
  /* -------------------------------------------------------------------------- */


  commencerQcm(id: string) {
    return this.httpClient.get<any>(
      `${environment.base_url}/api/testqcm/qcm/commencer/${id}`,
      {
        observe: "body",
        responseType: "json"
      }
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Save   reponse  Candidat                                   */
  /* -------------------------------------------------------------------------- */

  saveReponseCandidat(data: any) {
    return this.httpClient.post<any>(
      environment.base_url + `/api/testqcm/candidat/reponse`,
      data
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                                   calcule note qcm                                   */
  /* -------------------------------------------------------------------------- */

  calculeNote(id: any,tricher:any) {
    return this.httpClient.post<any>(
      `${environment.base_url}/api/testqcm/qcm/note/${id}`,tricher
      // {
      //   observe: "body",
      //   responseType: "json"
      // }
    );
  }

  



  /* -------------------------------------------------------------------------- */
  /*                                   get Qcm by idhash                                   */
  /* -------------------------------------------------------------------------- */

 

  getQcmByIdHash(id: number) {
    return this.httpClient.get<any>(
      `${environment.base_url}/api/testqcm/qcmcandidat/${id}`,
      {
        observe: "body",
        responseType: "json"
      }
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                                    resultat Qcm                                    */
  /* -------------------------------------------------------------------------- */

 

  resultatQcm(id: number) {
    return this.httpClient.get<any>(
      `${environment.base_url}/api/testqcm/qcm/${id}/resultat`,
      {
        observe: "body",
        responseType: "json"
      }
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                                   ReCommencer  Qcm                                    */
  /* -------------------------------------------------------------------------- */


  reCommencerQcm(id: string) {
    return this.httpClient.get<any>(
      `${environment.base_url}/api/testqcm/qcm/recommencer/${id}`,
      {
        observe: "body",
        responseType: "json"
      }
    );
  }

}
