import { Injectable } from '@angular/core';
import { DummyClient } from '../models/DummyClient';
import { DummyDocument } from '../models/DummyDocument';
import { DummyDocumentType } from '../models/DummyDocumentType';

@Injectable({
  providedIn: 'root'
})
export class DummyDocumentService {
  
  private listDocuments: DummyDocument[] = [

  ];
  
  private listTypes: DummyDocumentType[] = [
    {id: 1, libelle: 'type1'},
    {id: 2, libelle: 'type2'},
  ];


  private listClients: DummyClient[] = [
    {
        "id": 1
      , "codeClient": "0001"
      , "raisonSociale": "PH Rajab"
      , "nomPharmacien": "Ahmed Touzani"
      , "adresse1": ""
      , "adresse2": ""
      , "localite": ""
      , "patente": ""
      , "tag": ""
      , "ville": "Casablanca"
    },
    {
        "id": 2
      , "codeClient": "0002"
      , "raisonSociale": "PH La gare"
      , "nomPharmacien": "Mohcine Aboud"
      , "adresse1": ""
      , "adresse2": ""
      , "localite": ""
      , "patente": ""
      , "tag": ""
      , "ville": "Casablanca"
    },
    {
        "id": 3
      , "codeClient": "0002"
      , "raisonSociale": "PH Zam Zam"
      , "nomPharmacien": "Jilali abdellah"
      , "adresse1": ""
      , "adresse2": ""
      , "localite": ""
      , "patente": ""
      , "tag": ""
      , "ville": "Rabat"
    },
  ];




  constructor() { }
  
  

  getListTypes() {
    return this.listTypes;
  }

  getListDocuments() {
    return this.listDocuments;
  }

  
  getModelById(id: number) {
    return this.listDocuments.find(elem => elem.id === id);
  }
  
  
  save(model: DummyDocument) {
    if(model.id) {
      let ndx = this.listDocuments.findIndex(elem => elem.id === model.id);
      if(ndx>=0) {
        this.listDocuments[ndx] = model;
      }
    }
    else {
      if(this.listDocuments.length) {
        model.id = Math.max( ...this.listDocuments.map(elem => elem.id) ) + 1;
      }
      else {
        model.id = 1;
      }
      this.listDocuments.push(model);
    }
  }
  
  searchClients(criteria: string): DummyClient[] {
    if(!criteria) {
      return this.listClients;
    }
    else {
      return this.listClients.filter(elem => elem.raisonSociale.toLowerCase().indexOf(criteria.toLowerCase()) >= 0);
    }
  }

}
