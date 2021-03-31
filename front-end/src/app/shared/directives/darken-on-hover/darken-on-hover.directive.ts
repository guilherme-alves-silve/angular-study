import { Directive, ElementRef, HostListener, Renderer2, Input } from "@angular/core";

@Directive({
    selector: '[apDarkenOnHover]'
})
export class DarkenOnHoverDirective {

    @Input() brightness = '70%';

    constructor(
        private _el: ElementRef,
        private _renderer: Renderer2
    ) { }

    @HostListener('mouseover')
    darkenOn() {
        this._renderer.setStyle(this._el.nativeElement, 'filter', `brightness(${this.brightness})`);
    }

    @HostListener('mouseleave')
    darkenOff() {
        this._renderer.setStyle(this._el.nativeElement, 'filter', 'brightness(100%)');
    }
}