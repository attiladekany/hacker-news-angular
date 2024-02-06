import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AnonymousComponent } from 'src/app/comonents/anonymous/anonymous.component';
import { LocaleDatePipe } from 'src/app/pipes/local-date.pipe';
import { ItemIds } from 'src/app/resolvers/item-resolver';
import { ItemService } from 'src/app/services/item.service.ts';
import { Item } from 'src/typescript-angular-client-generated';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
  imports: [CommonModule, MatCardModule, AnonymousComponent, LocaleDatePipe],
  standalone: true,
})
export class ShowComponent implements OnInit {
  items$: Observable<Item[]> = of([]);

  constructor(private _route: ActivatedRoute, private _itemService: ItemService) {}

  ngOnInit(): void {
    const { ids } = this._route.snapshot.data as ItemIds;

    const count: number = 15;
    let itemIds = ids.splice(0, count);
    this.items$ = this._itemService.getItemsByIds$(itemIds);

    this._itemService.getItemsByIds$(itemIds).subscribe((items) => {
      items.forEach((item) => {
        console.log('item: ', item);
      });
    });
  }

  onUrlClicked(url: string | undefined): void {
    if (!url) return;

    if (!confirm(`Are you sure to open this page?\n${url}`)) return;

    window.open(url);
  }
}
