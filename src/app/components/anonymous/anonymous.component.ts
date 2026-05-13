import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'anonymous-svg',
  templateUrl: './anonymous.component.html',
  styleUrls: ['./anonymous.component.scss'],
})
export class AnonymousComponent implements OnInit {
  @Input() width = 500;
  @Input() height = 500;
  @Input() borderRadius = 500;
  @Input() fillColor = '';

  styles: Record<string, unknown> | null = null;
  svgStyles: Record<string, string | number> = {};

  ngOnInit(): void {
    this.svgStyles = {
      width: this.width,
      height: this.height,
      borderRadius: `${this.borderRadius}px`,
    };

    this.styles = {
      fill: this.fillColor,
      'fill-opacity': '1',
      'fill-rule': 'nonzero',
      stroke: 'none',
    };
  }
}
