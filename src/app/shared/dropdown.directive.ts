import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isClicked: boolean;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.isClicked = false;
  }

  @HostListener('document:click', ['$event']) toggleOpen(eventData: Event) {
    this.isClicked = this.elRef.nativeElement.contains(eventData.target) ? !this.isClicked : false;
  }
  //mou epitrepei na kleinw ta dropdown ama clickarw opoudhpote

}
