import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appDecimal2Correct]'
})
export class Decimal2CorrectDirective  implements OnInit {


  constructor(private el: ElementRef) {
    // console.log('Decimal2CorrectDirective constructor');
  }


  ngOnInit(): void {
    this.el.nativeElement.value = this.correctFormatNumber( this.el.nativeElement.value );
  }




  @HostListener('blur', ['$event']) onBlur(event) {
    // console.log('Decimal2CorrectDirective');

    if ( event.target.value !== '' ) {
      // event.target.value = parseFloat(event.target.value).toFixed(2);
      const stringNumberValue = this.correctFormatNumber(event.target.value);

      event.target.value = stringNumberValue;
    }
  }


  correctFormatNumber(stringNumberValue: string) {
    if( !stringNumberValue ) {
      return stringNumberValue;
    }

    const indexOfDecimalPoint = stringNumberValue.indexOf('.');

    if (indexOfDecimalPoint === -1) {
      stringNumberValue = stringNumberValue + '.00';
    } else {
      if ( stringNumberValue.length - indexOfDecimalPoint < 3  ) {
        stringNumberValue = stringNumberValue + '0'.repeat( 3 - (stringNumberValue.length - indexOfDecimalPoint) );
      }
    }

    // console.log('Decimal2CorrectDirective', stringNumberValue);

    return stringNumberValue;
  }

}
