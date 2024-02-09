import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { IItemService } from '../interfaces/item.service.interface';

export const getIds$: ResolveFn<number[]> = (route: ActivatedRouteSnapshot): Observable<number[]> => {
  const service = route.data['service'];
  const uri = route.data['uri'];

  const _service = inject(service);
  if (!_service) throw new Error('Service resolution has failed');

  return (_service as IItemService).getItemIds$(uri);
};
