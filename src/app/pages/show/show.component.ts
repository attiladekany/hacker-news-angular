import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from 'src/app/comonents/card/card.component';
import { AbstractBasePage } from '../abstract-base-page.directive';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
  imports: [CommonModule, CardComponent],
  standalone: true,
})
export class ShowComponent extends AbstractBasePage {}
