import { of, from } from 'rxjs';
import { map, mergeMap, delay, mergeAll, switchAll, switchMap } from 'rxjs/operators';

/**
 https://medium.com/@luukgruijs/understanding-rxjs-map-mergemap-switchmap-and-concatmap-833fc1fb09ff
 **/

export class MapOperators {

  private data$ = from([1, 2, 3, 4]);

  private getData = (param) => {
    return of(`retrieved new data with param ${param}`).pipe(
      delay(1000)
    )
  };

  /**
   * PROBLEM
   * we have a Observable<number> object;s ID and 
   * want to fecth data from server
   */


  /** MANNER #0
   * rxjs's map operator is equivalent to array's map function in ES6
   * we have from([1,2,3,4]) as our ‘outer’ Observable, 
   * and the result of the getData() as our ‘inner’ Observable. 
   * In theory we have to subscribe to both our outer and inner
   * Observable to get the data out.
   */
  public mapOperator() {
    console.log('Use map operator');
    this.data$.pipe(
      map(param => this.getData(param))
    ).subscribe(val => val.subscribe(data => console.log(data)));
  }


  /** MANNER #1
   * We can simplifize MANNER #1 by using mergeMap operator
   * MergeAll takes care of subscribing to the ‘inner’ Observable
   * so that we no longer have to Subscribe two times 
   * as mergeAll merges the value of the ‘inner’ Observable
   * into the ‘outer’ Observable. 
   */
  public mergeAllOperator() {
    console.log('Use map and mergeAll operator');
    this.data$.pipe(
      map(param => this.getData(param)),
      mergeAll()
    ).subscribe(data => console.log(data));
  }

  /** MANNER #2
   * We can use mergeMap as the best solution
   */
  public mergeMapOperator() {
    console.log('Use mergeMap operator');
    this.data$.pipe(
      mergeMap(param => this.getData(param))
    ).subscribe(data => console.log(data));
  }

  /** switchAll
   * switchAll cancel all previous subscrition and
   * subscribes the last one
   */
  public swithAllOperator() {
    console.log('Use switchAll operator');
    this.data$.pipe(
      map(param => this.getData(param)),
      switchAll()
    ).subscribe(data => console.log(data));
  }


  /** switchMap
   * switchMap is the combination of map and switchAll
   */
  public switchMapOperator() {
    console.log('Use swtich Map operator');
    this.data$.pipe(
      switchMap(param => this.getData(param))
    ).subscribe(data => console.log(data));
  }

  /**
   * Execute examples
   */
  public executting() {
    // this.mapOperator();
    // this.mergeAllOperator();
    // this.mergeMapOperator();
    this.swithAllOperator();
    this.switchMapOperator();
  }
}
