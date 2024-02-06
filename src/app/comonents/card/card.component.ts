import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LocaleDatePipe } from 'src/app/pipes/local-date.pipe';
import { Item } from 'src/typescript-angular-client-generated';
import { AnonymousComponent } from '../anonymous/anonymous.component';

@Component({
  standalone: true,
  imports: [MatCardModule, AnonymousComponent, LocaleDatePipe],
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input({ required: true }) item: Item = {} as Item;
  onUrlClicked(url: string | undefined): void {
    if (!url) return;

    if (!confirm(`Are you sure to open this page?\n${url}`)) return;

    window.open(url);
  }
}
