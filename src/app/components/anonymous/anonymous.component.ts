import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'anonymous-svg',
  templateUrl: './anonymous.component.html',
  styleUrls: ['./anonymous.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnonymousComponent {
  @Input() width = 500;
  @Input() height = 500;
  @Input() borderRadius = 500;
  @Input() fillColor = '';

  get svgStyles(): Record<string, string | number> {
    return {
      width: this.width,
      height: this.height,
      borderRadius: `${this.borderRadius}px`,
    };
  }

  get styles(): Record<string, string> {
    return {
      fill: this.fillColor,
      'fill-opacity': '1',
      'fill-rule': 'nonzero',
      stroke: 'none',
    };
  }
}
