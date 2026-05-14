import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, inject } from '@angular/core';

// Ref.: https://dev.to/krivanek06/angular-infinite-scrolling-2jab

@Directive({
  selector: '[appScrollNearEnd]',
})
export class ScrollNearEndDirective {
  @Output() readonly nearEnd = new EventEmitter<void>();

  /**
   * threshold in PX when to emit before page end scroll
   */
  @Input() threshold = 120;

  private readonly el = inject(ElementRef);

  @HostListener('window:scroll')
  windowScrollEvent(): void {
    const { document, scrollY, innerHeight } = window;
    const heightOfWholePage = document.documentElement.scrollHeight;
    const heightOfElement = this.el.nativeElement.scrollHeight;
    const currentScrolledY = scrollY;
    const spaceOfElementAndPage = heightOfWholePage - heightOfElement;
    const scrollToBottom = heightOfElement - innerHeight - currentScrolledY + spaceOfElementAndPage;

    if (scrollToBottom < this.threshold) {
      this.nearEnd.emit();
    }
  }
}
