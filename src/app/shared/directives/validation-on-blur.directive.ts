import { NgControl } from "@angular/forms";
import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";
/**
 * * Directive : 
 * 
 * check and validation Reactive Forms input And apply animation styles in it
 * 
 */
@Directive({
  selector: "[validateOnBlur]",
})
export class ValidationOnBlurDirective {
  constructor(private ngCTL: NgControl, private el: ElementRef, private r2: Renderer2) { }

  @HostListener("blur", ["$event"]) onBlur(event) {
    const status = this.ngCTL.control.status;
    if (status === "INVALID") {
      this.ngCTL.control.setValue("");
      this.r2.addClass(this.el.nativeElement, 'flashValidation');
      setTimeout(() => {
        this.r2.removeClass(this.el.nativeElement, 'flashValidation');
      }, 1000);
    }
  }
}
