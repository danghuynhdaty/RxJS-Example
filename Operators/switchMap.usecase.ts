import { of, from, BehaviorSubject } from 'rxjs';
import { map, delay, switchAll, switchMap } from 'rxjs/operators';

export class SwitchMapOperator {

  /** switchMap usecase can apply as type ahead
   * PROBLEM: we want to user input as filter and 
   * request to server and get back data
   * But we dont want every time use enter a key we call request
   * Preventing this annoying to server we can use switchMap
   * to ignore all previous request and take care the last one
   */


  private filters = ['brand=porsche', 'model=911', 'horsepower=389', 'color=red']
  public activeFilters = new BehaviorSubject('');

  private getData = (params) => {
    console.log(params);
    return of(`retrieved new data with params ${params}`).pipe(
      delay(1000)
    )
  }

  private applyFilters = () => {
    this.filters.forEach((filter, index) => {

      let newFilters = this.activeFilters.value;
      if (index === 0) {
        newFilters = `?${filter}`
      } else {
        newFilters = `${newFilters}&${filter}`
      }

      this.activeFilters.next(newFilters)
    })
  }

  // using switchMap
  public executting() {
    this.activeFilters.pipe(
      switchMap(param => this.getData(param))
    ).subscribe(val => console.log(val));

    this.applyFilters()
  }
}
