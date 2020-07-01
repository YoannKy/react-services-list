import { Subject } from 'rxjs';

 class SnackbarService {
  private subject$ = new Subject<string>();

  getMessage() {
    return this.subject$.asObservable();
  }

  emitMessage(message: string) {
    this.subject$.next(message);
  }
}

export const snackbarService = new SnackbarService();
