import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'anonymous-svg',
  templateUrl: './anonymous.component.html',
  styleUrls: ['./anonymous.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnonymousComponent {
  readonly width = input(500);
  readonly height = input(500);
  readonly borderRadius = input(500);
  readonly fillColor = input('');

  get svgStyles(): Record<string, string | number> {
    return {
      width: this.width(),
      height: this.height(),
      borderRadius: `${this.borderRadius()}px`,
    };
  }

  get styles(): Record<string, string> {
    return {
      fill: this.fillColor(),
      'fill-opacity': '1',
      'fill-rule': 'nonzero',
      stroke: 'none',
    };
  }
}
