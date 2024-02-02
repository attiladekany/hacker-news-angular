import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'anonymous-svg',
  templateUrl: './anonymous.component.html',
  styleUrls: ['./anonymous.component.scss'],
  standalone: true,
})
export class AnonymousComponent implements OnInit {
  @Input() width: number = 500;
  @Input() height: number = 500;
  @Input() borderRadius: number = 500;
  @Input() fillColor: string = '';

  styles: {} | null = null;
  svgStyles: { [klass: string]: string | number } = {};

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
