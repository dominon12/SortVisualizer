import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { SharedServiceService } from './../shared-service.service';

import BogoSort from 'src/algorithms/BogoSort';
import BubbleSort from 'src/algorithms/BubbleSort';
import CocktailSort from 'src/algorithms/CoctailSort';
import CombSort from 'src/algorithms/CombSort';
import CountingSort from 'src/algorithms/CountingSort';
import CycleSort from 'src/algorithms/CycleSort';
import GnomeSort from 'src/algorithms/GnomeSort';
import HeapSort from 'src/algorithms/HeapSort';
import InsertionSort from 'src/algorithms/InsertionSort';
import OddEvenSort from 'src/algorithms/OddEvenSort';
import PancakeSort from 'src/algorithms/PancakeSort';
import SelectionSort from 'src/algorithms/SelectionSort';
import ShellSort from 'src/algorithms/ShellSort';
import StoogeSort from 'src/algorithms/StoogeSort';
import QuickSort from 'src/algorithms/QuickSort';
import BucketSort from 'src/algorithms/BucketSort';
import RadixSort from 'src/algorithms/RadixSort';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  localStorageKey: string = 'algorithmIndex';
  algorithmSelectForm: FormGroup;
  selectedAlgorithm: any;
  algorithms = [
    BogoSort,
    BubbleSort,
    BucketSort,
    CocktailSort,
    CombSort,
    CountingSort,
    CycleSort,
    GnomeSort,
    HeapSort,
    InsertionSort,
    OddEvenSort,
    PancakeSort,
    QuickSort,
    RadixSort,
    SelectionSort,
    ShellSort,
    StoogeSort,
  ];

  constructor(
    private _sharedService: SharedServiceService,
    private _fb: FormBuilder
  ) {
    this.selectedAlgorithm = this.algorithms[0];
    this.algorithmSelectForm = this._fb.group({
      algorithm: [this.savedAlgorithmIndex],
    });
  }

  ngOnInit(): void {
    this.subscribeToAlgorithmSelecting();
    this.setData(this.savedAlgorithmIndex);
  }

  get savedAlgorithmIndex() {
    let algorithmIndex = localStorage.getItem(this.localStorageKey);
    return algorithmIndex === null ? 0 : parseInt(algorithmIndex);
  }

  subscribeToAlgorithmSelecting() {
    this.algorithmSelectForm.valueChanges.subscribe((algorithm) => {
      let algorithmIndex = parseInt(algorithm.algorithm);
      this.setData(algorithmIndex);
    });
  }

  public sort(): void {
    this._sharedService.command.next('sort');
  }

  public setData(savedAlgorithmIndex: number | null): void {
    this._sharedService.command.next('setData');
    if (savedAlgorithmIndex !== null) {
      this.setAlgorithm(this.algorithms[savedAlgorithmIndex]);
      this.saveToLocalStorage(savedAlgorithmIndex);
    }
  }

  saveToLocalStorage(algorithmIndex: number) {
    localStorage.setItem(this.localStorageKey, algorithmIndex.toString());
  }

  public setAlgorithm(algorithm: any): void {
    this._sharedService.selectedAlgorithm.next(algorithm);
  }
}
