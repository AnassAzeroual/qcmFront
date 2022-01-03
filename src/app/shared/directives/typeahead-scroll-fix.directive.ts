import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTypeaheadScrollFix]'
})
export class TypeaheadScrollFixDirective {

  constructor(el: ElementRef) { 
  }




  @HostListener('keyup.arrowUp', ['$event']) 
  keyArrowUp($event) {
    this.doscroll($event);
  }
  
  @HostListener('keyup.arrowDown', ['$event']) 
  keyArrowDown($event) {
    this.doscroll($event);
  }


  doscroll($event: any) {
    
    if($event && $event.currentTarget && $event.currentTarget.nextElementSibling) {
      // console.info('TypeaheadScrollFixDirective.scroll', $event.currentTarget.nextElementSibling);
      const elem = $event.currentTarget.nextElementSibling.getElementsByClassName('active')[0];
      // const y = elem.getBoundingClientRect().top + window.pageYOffset - 30;   // + offset
      elem.scrollIntoView({behavior: 'smooth', block: 'nearest'/*, top: y*/});
    }
  }
}
