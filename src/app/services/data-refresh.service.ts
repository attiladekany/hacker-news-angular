import { Service } from '@angular/core';
import { Subject } from 'rxjs';

@Service()
export class DataRefreshService {
  private refreshSubject = new Subject<void>();
  public refresh$ = this.refreshSubject.asObservable();

  triggerRefresh(): void {
    this.refreshSubject.next();
  }
}
