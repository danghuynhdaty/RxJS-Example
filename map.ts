import { of } from 'rxjs'; 
import { map } from 'rxjs/operators';

// lets create our data first
const data = of([
  {
    brand: 'porsche',
    model: '911'
  },
  {
    brand: 'porsche',
    model: 'macan'
  },
  {
    brand: 'ferarri',
    model: '458'
  },
  {
    brand: 'lamborghini',
    model: 'urus'
  }
]);

// get data as brand+model string. Result: 
// ["porsche 911", "porsche macan", "ferarri 458", "lamborghini urus"]
data
  .pipe(
    map(cars => cars.map(car => `${car.brand} ${car.model}`))
  ).subscribe(cars => console.log(cars))

// filter data so that we only have porsches. Result:
// [
//   {
//     brand: 'porsche',
//     model: '911'
//   },
//   {
//     brand: 'porsche',
//     model: 'macan'
//   }
// ]
data
  .pipe(
    map(cars => cars.filter(car => car.brand === 'porsche'))
  ).subscribe(cars => console.log(cars))

export default data;