import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localeDate',
  standalone: true,
})
export class LocaleDatePipe implements PipeTransform {
  transform(time: number | undefined): string {
    if (!time) return '';

    return new Date(time).toLocaleTimeString();
  }
}
