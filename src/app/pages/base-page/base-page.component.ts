import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/comonents/card/card.component';
import { AbstractBasePage } from '../abstract-base-page.directive';
import { LayoutComponent } from '../layout-components/layout/layout.component';

@Component({
  standalone: true,
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  imports: [LayoutComponent, CommonModule, CardComponent],
  styleUrls: ['./base-page.component.scss'],
})
export class BasePageComponent extends AbstractBasePage {

  onNearEndScroll(): void {
    console.log('Method not implemented.');
  }
}
