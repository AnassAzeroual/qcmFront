import { Injectable } from '@angular/core';
import { MessageService } from '@progress/kendo-angular-l10n';

const data = {
  fr: {
    rtl: false,
    messages: {
      "kendo.grid.noRecords": "Il n'y a pas d'éléments à afficher.",
      "kendo.grid.filterContainsOperator": "Contient",
      "kendo.grid.filterEndsWithOperator": "Se termine par",
      "kendo.grid.filterEqOperator": "Est égal à",
      "kendo.grid.filterNotEqOperator": "N'est pas égal à",
      "kendo.grid.filterNotContainsOperator": "Ne contient pas",
      "kendo.grid.filterStartsWithOperator": "Commence avec",
      "kendo.grid.filterIsNullOperator": "Est null",
      "kendo.grid.filterIsNotNullOperator": "N'est pas null",
      "kendo.grid.filterIsEmptyOperator": "Est vide",
      "kendo.grid.filterIsNotEmptyOperator": "N'est pas vide",
      "kendo.grid.filterOrLogic": "Ou",
      "kendo.grid.filterAndLogic": "Et",
      "kendo.grid.filterClearButton": "Effacer",
      "kendo.grid.filterFilterButton": "Filtrer",
      "kendo.grid.filterGteOperator": "Est supérieur ou égal à",
      "kendo.grid.filterGtOperator": "Est supérieur à",
      "kendo.grid.filterLteOperator": "Est inférieur ou égal à",
      "kendo.grid.filterLtOperator": "Est inférieur à",
      "kendo.grid.columns": "Colonnes",
      "kendo.grid.sortDescending": "Tri Décroissant",
      "kendo.grid.sortAscending": "Tri Croissant",
      "kendo.grid.filter": "Filtrer",
      "kendo.grid.pagerItems": "ligne(s)",
      "kendo.pager.itemsPerPage" : "élément par page ",
      "kendo.pager.items" : "éléments",
      "kendo.pager.of" : "de",

    }
  }
};


@Injectable()
export class MyMessageService extends MessageService {
  public set language(value: string) {
    const lang = data[value];
    if (lang) {
      this.localeId = value;
      this.notify(lang.rtl);
    }
  }

  public get language(): string {
    return this.localeId;
  }

  private localeId = 'fr';
  private get messages(): any {
    const lang = data[this.localeId];

    if (lang) {
      return lang.messages;
    }
  }

  public get(key: string): string {
    return this.messages[key];
  }
}

