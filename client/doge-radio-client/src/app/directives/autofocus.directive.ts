import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[autofocus]'
})
export class AutofocusDirective {

    private focus: boolean;

    constructor(private elementRed: ElementRef) {
        this.focus = true;
    }

    ngOnInit()
    {
        if (this.focus)
        {
            //Otherwise Angular throws error: Expression has changed after it was checked.
            window.setTimeout(() =>
            {
                this.elementRed.nativeElement.focus(); //For SSR (server side rendering) this is not safe. Use: https://github.com/angular/angular/issues/15008#issuecomment-285141070)
            });
        }
    }

    @Input() set autofocus(condition: boolean)
    {
        this.focus = condition !== false;
    }

}
