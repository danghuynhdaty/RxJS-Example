import { of } from 'rxjs'; 
import { map } from 'rxjs/operators';
import data from './map';

const source = of('World').pipe(
  map(x => `Hello ${x}! \n Run the example by copy and paste content into index`)
);

source.subscribe(x => console.log(x));
