import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

import { IParameter }    from '../models/parameter.model';
import { IParameterKey }    from '../models/parameter-key.model';
import { IAdministredUser }    from '../models/administred-user.model';
import { IRole }    from '../models/role.model';
import { IHabilitation }    from '../models/habilitation.model';

import { environment } from 'src/environments/environment';
import { UiView } from '../../models/ui-view.model';
import { UiViewElement } from '../../models/ui-view-element.model';
import { IRoleFonctionnel } from '../models/role-fonctionnel.model';


@Injectable({
  providedIn: 'root'
})
export class AdminService {


  baseUrl = environment.base_url;


  constructor(private httpClient: HttpClient) { }
  
  
	
	
	
	
  
  getListParameterKeys() {
    return this.httpClient.get<IParameterKey[]>(this.baseUrl + '/api/admin/parameter/listkeys', { observe: 'body' });
  }
  
	
  
  getListParameters(page: number, pageSize: number) {
		let pageParams = {"page": page+'', "size": pageSize+''};
    return this.httpClient.get<IParameter[]>(this.baseUrl + '/api/admin/parameter/list', { observe: 'body', params: pageParams });
  }
  
	

	
	
	saveParameter(parameter: IParameter){
    return this.httpClient.post<any>(this.baseUrl + '/api/admin/parameter/edit', parameter, 
              {
                  responseType: 'json'
                }
    );
  }
	
	
	
  
  deleteParameter(parameterId: number) {
    return this.httpClient.delete<any>(this.baseUrl + '/api/admin/parameter/'+parameterId, { observe: 'body' });
  }
  
	
	
	
	
	
	
	
  getListRoles() {
    return this.httpClient.get<IRole[]>(this.baseUrl + '/api/admin/user/roles', { observe: 'body' });
  }



  getListRolesFonctionnels() {
    return this.httpClient.get<IRoleFonctionnel[]>(this.baseUrl + '/api/admin/user/rolesfonctionnels', { observe: 'body' });
  }
	
	
	
  getListHabilitations() {
    return this.httpClient.get<IHabilitation[]>(this.baseUrl + '/api/admin/user/habilitations', { observe: 'body' });
  }
	
	
	
  
  getListUsers(page: number, pageSize: number) {
		let pageParams = {"page": page+'', "size": pageSize+''};
    return this.httpClient.get<IAdministredUser[]>(this.baseUrl + '/api/admin/user/list', { observe: 'body', params: pageParams });
  }
	
	saveUser(user: IAdministredUser){
    return this.httpClient.post<any>(this.baseUrl + '/api/admin/user/edit', user, 
              {
                  observe: 'body',
                  responseType: 'json'
                }
    );
  }
	
	
	
  
  deleteUser(idhash: string, reason: string) {
    return this.httpClient.delete<any>(this.baseUrl + '/api/admin/user/'+idhash, { observe: 'body',   params: {"reason": reason} } );
  }
  
	
  
  restoreUser(idhash: string) {
    return this.httpClient.get<any>(this.baseUrl + '/api/admin/user/'+idhash+'/restore', { observe: 'body' } );
  }
  
  





  
	
	
	
  getListUiViews(page: number, pageSize: number) {
		let pageViews = {"page": page+'', "size": pageSize+''};
    return this.httpClient.get<UiView[]>(this.baseUrl + '/api/admin/view/list', { observe: 'body', params: pageViews });
  }
  
  
	
	
  getUiViewById(id: number) {
    return this.httpClient.get<UiView>(this.baseUrl + '/api/admin/view/'+id, { observe: 'body' });
  }
  
  
  saveUiView(view: UiView) {
    return this.httpClient.post<any>(this.baseUrl + '/api/admin/view/edit', view, 
              {
                  observe: 'body',
                  responseType: 'json'
                }
    );
  }


  saveUiViewElement(viewid: number, elementView: UiViewElement) {
    return this.httpClient.post<any>(this.baseUrl + '/api/admin/view/'+viewid+'/element-view/edit', elementView, 
              {
                  observe: 'body',
                  responseType: 'json'
                }
    );
  }


  deleteUiView(viewid: number) {
    return this.httpClient.delete<any>(this.baseUrl + '/api/admin/view/'+viewid, { observe: 'body', responseType: 'json' } );
  }

  deleteUiViewElement(viewElementid: number) {
    return this.httpClient.delete<any>(this.baseUrl + '/api/admin/element-view/'+viewElementid, { observe: 'body', responseType: 'json' } );
  }
  
}
