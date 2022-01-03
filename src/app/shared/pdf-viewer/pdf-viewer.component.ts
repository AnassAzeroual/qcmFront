import { Component, OnInit, OnDestroy, Input, TemplateRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit, OnDestroy {
  private _src: any;

  @ViewChild('content', { static: true })
  private content: TemplateRef<any> | undefined;

  @Input()
  title: string = 'Pdf Viewer';

  constructor(private sanitizer: DomSanitizer, private modalService: NgbModal) {
		//console.log('PdfViewerComponent.constructor');
	}

  ngOnInit() {
		//console.log('PdfViewerComponent.ngOnInit');
	}

  @Input('src')
  set src(src: any) {
    if(src) {
      let fileURL = URL.createObjectURL(src);
      this._src = this.getSafeUrl(fileURL);
      this.open(this.content);
    }
  }

  get src(): any {
    return this._src;
  }

  // to remove error : Error: unsafe value used in a resource URL context
  getSafeUrl(url:string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  open(content:any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then(result => {}, reason => {});
  }

  ngOnDestroy() {
		//console.log('PdfViewerComponent.ngOnDestroy');
	}
}
