import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from 'src/app/comonents/card/card.component';
import { AbstractBasePage } from '../abstract-base-page.directive';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
  imports: [CommonModule, CardComponent],
  standalone: true,
})
export class JobComponent extends AbstractBasePage {}
