// import { of } from 'rxjs'; 
// import { map } from 'rxjs/operators';
// import data from './map';

// const source = of('World').pipe(
//   map(x => `Hello ${x}! \n Run the example by copy and paste content into index`)
// );

// source.subscribe(x => console.log(x));


import { of, from } from 'rxjs'; 
import { map, mergeMap, delay, mergeAll } from 'rxjs/operators';

const getData = (param) => {
  return of(`retrieved new data with param ${param}`).pipe(
    delay(1000)
  )
}

// using a regular map
from([1,2,3,4]).pipe(
  map(param => getData(param))
).subscribe(val => val.subscribe(data => console.log(data)));

// using map and mergeAll
from([1,2,3,4]).pipe(
  map(param => getData(param)),
  mergeAll()
).subscribe(val => console.log(val));

// using mergeMap
from([1,2,3,4]).pipe(
  mergeMap(param => getData(param))
).subscribe(val => console.log(val));
