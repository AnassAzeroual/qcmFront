import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

import { ICountry }    from '../models/country.model';
import { ICity }    from '../models/city.model';

import { environment } from 'src/environments/environment';
import { UiView } from '../models/ui-view.model';
import { Observable } from 'rxjs';

import { map, publishReplay, refCount, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {


  baseUrl = environment.base_url;


  constructor(private httpClient: HttpClient) { }
  
  
	
	
	
  
  getListCountries() {
    return this.httpClient.get<ICountry[]>(this.baseUrl + '/api/staticdata/countries', { observe: 'body' });
  }
  
  getListCitiesByCountryId(countryId: number) {
    return this.httpClient.get<ICity[]>(this.baseUrl + '/api/staticdata/countries/'+countryId+'/cities', { observe: 'body' });
  }


  

  private cacheOfViewsByName = new Map<string, Observable<UiView>>();
  
  getViewByName(viewName: string) {

    if (!this.cacheOfViewsByName.get(viewName)) {
      console.log('caching.........');
      let viewObservable = this.httpClient.get<UiView>(this.baseUrl + '/api/staticdata/view', { params: {'viewName': viewName},  observe: 'body' })
        .pipe(
          publishReplay(1),
          refCount(),
          // take(1)
        );
      this.cacheOfViewsByName.set(viewName, viewObservable)
    }

    return this.cacheOfViewsByName.get(viewName);

    // return this.httpClient.get<UiView>(this.baseUrl + '/api/staticdata/view', { params: {'viewName': viewName},  observe: 'body' });
  }
}
