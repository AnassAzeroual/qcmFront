import { Input } from '@angular/core';
import { Directive, ElementRef, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { Habilitation } from '../admin/models/habilitation.model';
import { UiView } from '../models/ui-view.model';
import { AuthService } from '../services/auth.service';
import { StaticDataService } from '../services/static-data.service';

@Directive({
  selector: '[AutoApplyAuthorities]'
})
export class AutoApplyAuthoritiesDirective  implements OnInit, AfterViewInit {


  @Input('viewName') viewName: string;

  view: UiView;

  

  constructor(private el: ElementRef, private staticDataService: StaticDataService, private authService: AuthService) {
  }
  
  
  ngOnInit(): void {
  }
  
  
  
  ngAfterViewInit(): void {
    this.staticDataService.getViewByName(this.viewName).subscribe(
      (data) => {
        this.view = data;



        if(this.view && this.view.elements) {
          for (const element of this.view.elements.filter(elm => !elm.typeElement || elm.typeElement === 'A')) {
            let domNodes = this.el.nativeElement.querySelectorAll('[id="'+element.code+'"]');
            if(domNodes && domNodes.length) {


              let habilitations: string[] = element.habilitations.map(hab => hab.label)   // habilitations
                                                  .concat(  element.roles.map(role => role.label)  );   // concaténé à roles

              if(   !this.authService.hasAnyAuthority( habilitations )   )  {
                
                if(element.typeDesactivation === 'S') {
                  domNodes[0].remove();
                }
                else if(element.typeDesactivation === 'D') {
                  domNodes[0].disabled = true;
                  domNodes[0].title = element.messageDesactivation;
                }
                else {  // par defaut
                  domNodes[0].remove();
                }
              }
            }
            else {
              console.warn('element view with code = "'+element.code+'" is not found !!');
            }
          }
        }




      }
    );
  }


}
