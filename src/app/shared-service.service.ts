import { ISortAlgorythm, BubbleSort } from './sortAlgorythms';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedServiceService {
  command: BehaviorSubject<string> = new BehaviorSubject('')
  selectedAlgorythm: BehaviorSubject<any> = new BehaviorSubject(BubbleSort);

  constructor() {}
}
