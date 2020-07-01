import { BehaviorSubject } from 'rxjs';

class ReloadService {
  subject$ = new BehaviorSubject(true);

  getNewData() {
    return this.subject$.asObservable();
  }

  reloadData() {
    this.subject$.next(true)
  }
}

export const reloadService = new ReloadService();
