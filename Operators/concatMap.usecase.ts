import { of, from } from 'rxjs';
import { map, delay, mergeMap, concatMap } from 'rxjs/operators';

export class ConcatMapOperator {

  /**
   * concatMap can be use in case of taking care of requests's order
   */

  private data$ = from([1, 2, 3, 4]);

  private getData = (param) => {
    const delayTime = Math.floor(Math.random() * 10000) + 1;
    return of(`retrieved new data with params: ${param} and delay: ${delayTime}`).pipe(
      delay(delayTime)
    )
  }

  private useMap() {
    // using a regular map
    this.data$.pipe(
      map(param => this.getData(param))
    ).subscribe(val => val.subscribe(data => console.log('map:', data)));

  }

  private useMergeMap() {
    // using mergeMap
    this.data$.pipe(
      mergeMap(param => this.getData(param))
    ).subscribe(val => console.log('mergeMap:', val));

  }

  private useConCatMap() {
    // using concatMap
    this.data$.pipe(
      concatMap(param => this.getData(param))
    ).subscribe(val => console.log('concatMap:', val));

  }

  // using switchMap
  public executting() {
    this.useMap();
    this.useMergeMap();
    this.useConCatMap();
  }
}
