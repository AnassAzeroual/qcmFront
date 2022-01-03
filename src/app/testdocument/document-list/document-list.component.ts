import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DummyDocument } from '../models/DummyDocument';
import { DummyDocumentService } from '../services/dummy-document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {


  text1 = "abcdef";
  text2 = "abcdef anass amine youness";

  gridData: GridDataResult;
  pageSize = 3;
  skip = 0;
  items: DummyDocument[];

  public sort: SortDescriptor[];





  constructor(private dummyDocumentService: DummyDocumentService,
    private router: Router,
    private modalService: NgbModal,
    private alertService: AlertService) { }

  ngOnInit() {
    this.items = this.dummyDocumentService.getListDocuments();
    this.loadItems();
  }





  pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    // this.Rechercher(this.critereRemise);

    this.loadItems();
  }



  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.items = orderBy(this.items, this.sort);

    this.loadItems();
  }

  private loadItems(): void {
    this.gridData = {
      data: this.items.slice(this.skip, this.skip + this.pageSize),
      total: this.items.length
    };
  }

  resetSorting() {
    this.sort = [];
  }









  filterSearch() {
    //   let criteria = null;  // TODO 

    //   this.skip = 0;
    //   this.resetSorting();

    //   this.service
    //       .search(criteria)
    //       .subscribe((res: any) => {
    //         this.items = res.body;

    //         this.loadItems();
    //       });
  }

  viderFitre() {
    this.items = [];
    this.gridData = null;
    this.resetSorting();
  }



  gotoNewDocument() {
    this.router.navigateByUrl('/document/edit');
  }



  gotoEditDocument(model) {
    this.router.navigateByUrl('/document/edit/' + model.id);
  }



  openModalFiltrer(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
      .result.then(
        result => {
          console.log(result);
        },
        reason => {
          console.log('Err!', reason);
        }
      );
  }


}
