import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
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
import { GlobalActions } from 'src/app/+state/global.actions';
import { selectFavoriteItemIds$, selectIsMobile$ } from 'src/app/+state/global.selector';

@Component({
  imports: [CommonModule, LocaleDatePipe, FontAwesomeModule],
  selector: 'app-tile-element',
  templateUrl: './tile-element.component.html',
  styleUrls: ['./tile-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileElementComponent {
  private readonly _route = inject(ActivatedRoute);
  private readonly store = inject(Store);
  private readonly _titleIconMap = new Map<string, IconDefinition>([
    ['top', faHeart],
    ['ask', faCircleQuestion],
    ['show', faEye],
    ['job', faBriefcase],
    [':date', faNewspaper],
  ]);

  readonly routePath = this._route.snapshot.routeConfig?.path;
  readonly titleIcon = this._titleIconMap.get(this.routePath ?? '') ?? faFaceFrown;
  readonly navigator = window.navigator;

  readonly small$ = this.store.select(selectIsMobile$);
  readonly favoriteItemIds$ = this.store.select(selectFavoriteItemIds$);

  @Input({ required: true }) item: Item = {} as Item;

  faComment = faComment;
  faClock = faClock;
  faUser = faUser;
  faStar = faStar;
  faBook = faBook;
  faNewspaper = faNewspaper;
  faGripLinesVertical = faGripLinesVertical;
  faShareNodes = faShareNodes;
  faHeart = faHeart;
  faUpRightFromSquare = faUpRightFromSquare;

  onUrlClicked(url: string | undefined): void {
    if (!url) return;

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

  onFavoriteClicked(item: Item): void {
    if (typeof item.id !== 'number') {
      return;
    }

    this.store.dispatch(GlobalActions.toggleFavoriteItem({ itemId: item.id }));
  }
}
