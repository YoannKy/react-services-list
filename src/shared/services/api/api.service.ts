import { Observable, from, of, iif, defer } from 'rxjs';
import { flatMap, tap, catchError, map } from 'rxjs/operators';

import { snackbarService } from '../snackbar.service';

export class ApiService<T> {
  private baseUrl: string = 'http://localhost:8080';
  private entity: string;

  constructor(entity: string) {
    this.entity = entity;
  }


  list(): Observable<T[]> {
    return from(fetch(
      `${this.baseUrl}/${this.entity}`,
      {
        method: 'get',
      }
    )).pipe(
      catchError(() => of('failed')),
      flatMap(result =>
        iif(
          () => !(result instanceof Response),
          of(result).pipe(tap(() => snackbarService.emitMessage(`Error while fetching for services`)), map(() => [])),
          defer(async() => await (result as Response).json()).pipe(tap(() => snackbarService.emitMessage(`Services fetched`)))
        ),
      ),
    );
  }

  post(body: Partial<T>): Observable<unknown> {
    return from(fetch(
      `${this.baseUrl}/${this.entity}`,
      {
        method: 'post',
        body: JSON.stringify(body),
      },
    )).pipe(
      catchError(() => of('failed')),
      tap((res) => snackbarService.emitMessage(
        res === 'failed'? `Error while creating service` : `Service created`
      ))
    )
  }

  delete(id: string): Observable<unknown> {
    return from(fetch(
      `${this.baseUrl}/${this.entity}`,
      {
        method: 'delete',
        body: JSON.stringify({ name: id }),
      },
    )).pipe(
      catchError(() => of('failed')),
      tap((res) => snackbarService.emitMessage(
        res === 'failed'? `Error while deleting service` : `Service ${id} deleted`
      ))
    )
  }

  put(body: Partial<T>): Observable<unknown> {
    return from(fetch(
      `${this.baseUrl}/${this.entity}`,
      {
        method: 'put',
        body: JSON.stringify(body)
      },
    )).pipe(
      catchError(() => of('failed')),
      tap((res) => snackbarService.emitMessage(
        res === 'failed'? `Error while updating service` : `Service updated`
      ))
    )
  }
}
