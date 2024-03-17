import { Component, Input } from '@angular/core';
import { LocaleDatePipe } from 'src/app/pipes/local-date.pipe';
import { Item } from 'src/typescript-angular-client-generated';
import { AnonymousComponent } from '../anonymous/anonymous.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBook, faClock, faGripLinesVertical, faNewspaper, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';

@Component({
  standalone: true,
  imports: [CommonModule, AnonymousComponent, LocaleDatePipe, FontAwesomeModule],
  selector: 'app-tile-element',
  templateUrl: './tile-element.component.html',
  styleUrls: ['./tile-element.component.scss'],
})
export class TileElementComponent {
  @Input({ required: true }) item: Item = {} as Item;

  faComment = faComment;
  faClock = faClock;
  faUser = faUser;
  faStar = faStar;
  faBook = faBook;
  faNewspaper = faNewspaper;
  faGripLinesVertical = faGripLinesVertical;
}
