import { MapOperators } from './Operators/mergeMap.usecase';
import { SwitchMapOperator } from './Operators/switchMap.usecase';
import { ConcatMapOperator } from './Operators/concatMap.usecase';

// const switchMap = new SwitchMapOperator();
// switchMap.executting();

const concatMap = new ConcatMapOperator();
concatMap.executting();