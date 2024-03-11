import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AnonymousComponent } from '../anonymous/anonymous.component';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterModule, AnonymousComponent],
})
export class HeaderComponent {
  title = '';

  constructor(protected _route: ActivatedRoute) {}

  ngOnInit(): void {
    // todo set title
    this.title = this._route.snapshot.routeConfig?.title as string;
  }
}
