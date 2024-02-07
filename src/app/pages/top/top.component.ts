import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/comonents/card/card.component';
import { AbstractBasePage } from '../abstract-base-page.directive';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  standalone: true,
  imports: [CommonModule, CardComponent],
  styleUrls: ['./top.component.scss'],
})
export class TopComponent extends AbstractBasePage {}
