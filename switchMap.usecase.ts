import { of, from, BehaviorSubject } from 'rxjs';
import { map, delay, switchAll, switchMap } from 'rxjs/operators';

export class SwitchMapUseCase {

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
  public useSwichMap() {
    this.activeFilters.pipe(
      switchMap(param => this.getData(param))
    ).subscribe(val => console.log(val));

    this.applyFilters()
  }
}
