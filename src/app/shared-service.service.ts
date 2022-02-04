import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BubbleSort } from 'src/algorithms/BubbleSort';

@Injectable({
  providedIn: 'root',
})
export class SharedServiceService {
  command: BehaviorSubject<string> = new BehaviorSubject('');
  selectedAlgorithm: BehaviorSubject<any> = new BehaviorSubject(BubbleSort);

  constructor() {}
}
