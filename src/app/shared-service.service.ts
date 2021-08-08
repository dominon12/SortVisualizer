import { ISortingAlgorithm, BubbleSort } from './sortingAlgorithms';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedServiceService {
  command: BehaviorSubject<string> = new BehaviorSubject('')
  selectedAlgorithm: BehaviorSubject<any> = new BehaviorSubject(BubbleSort);

  constructor() {}
}
