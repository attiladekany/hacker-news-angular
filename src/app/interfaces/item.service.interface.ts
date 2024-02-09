import { Observable } from 'rxjs';

export interface IItemService {
  getItemIds$(uri: string): Observable<number[]>;
}
