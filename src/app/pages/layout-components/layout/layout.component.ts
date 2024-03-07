import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/comonents/card/card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { Observable, map, of } from 'rxjs';
import { ScrollNearEndDirective } from 'src/app/directives/scroll-near-end.directive';
import { Item } from 'src/typescript-angular-client-generated';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, CardComponent, MatProgressSpinnerModule, LayoutModule, ScrollNearEndDirective],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  @Input({ required: true }) title = '';
  @Input({ required: true }) entities: Item[] = [];
  @Input({ required: true }) isLoading = true;
  @Output() nearEnd: EventEmitter<void> = new EventEmitter<void>();

  small$: Observable<boolean> = of(false);
  constructor(private responsive: BreakpointObserver) {}

  ngOnInit(): void {
    this.small$ = this.responsive.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(map((result) => result.matches));
  }
}
