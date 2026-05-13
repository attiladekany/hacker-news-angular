import { Component, Input, OnInit, inject } from '@angular/core';
import { LocaleDatePipe } from 'src/app/pipes/local-date.pipe';
import { Item } from 'src/typescript-angular-client-generated';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBook,
  faBriefcase,
  faCircleQuestion,
  faClock,
  faEye,
  faFaceFrown,
  faGripLinesVertical,
  faHeart,
  faNewspaper,
  faShareNodes,
  faStar,
  faUpRightFromSquare,
  faUser,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsMobile$ } from 'src/app/+state/global.selector';

@Component({
  standalone: true,
  imports: [CommonModule, LocaleDatePipe, FontAwesomeModule],
  selector: 'app-tile-element',
  templateUrl: './tile-element.component.html',
  styleUrls: ['./tile-element.component.scss'],
})
export class TileElementComponent implements OnInit {
  private _route = inject(ActivatedRoute);
  private store = inject(Store);
  titleIcon: IconDefinition = faFaceFrown;
  navigator = window.navigator;
  routePath: string | undefined;

  small$ = this.store.select(selectIsMobile$);

  @Input({ required: true }) item: Item = {} as Item;

  faComment = faComment;
  faClock = faClock;
  faUser = faUser;
  faStar = faStar;
  faBook = faBook;
  faNewspaper = faNewspaper;
  faGripLinesVertical = faGripLinesVertical;
  faShareNodes = faShareNodes;
  faUpRightFromSquare = faUpRightFromSquare;

  private _titleIconMap: Map<string, IconDefinition> = new Map<string, IconDefinition>([
    ['top', faHeart],
    ['ask', faCircleQuestion],
    ['show', faEye],
    ['job', faBriefcase],
    [':date', faNewspaper],
  ]);

  ngOnInit(): void {
    this.routePath = this._route.snapshot.routeConfig?.path;
    this.titleIcon = this._titleIcon;
  }

  private get _titleIcon(): IconDefinition {
    if (!this.routePath) {
      console.warn('No route path');
      return faFaceFrown;
    }

    return this._titleIconMap.get(this.routePath)!;
  }

  onUrlClicked(url: string | undefined): void {
    if (!url) return;

    // if (!confirm(`Are you sure to open this page?\n${url}`)) return;

    window.open(url);
  }

  onShareClicked(item: Item): void {
    if (!this.navigator.share) {
      alert('share not supported');
      return;
    }

    const shareData = {
      title: item.title,
      text: `By: ${item.by}`,
      url: item.url,
    };

    this.navigator
      .share(shareData)
      .then(() => console.log(`Successfully shared`))
      .catch((err) => console.log(`Error: ${err}`));
  }
}
