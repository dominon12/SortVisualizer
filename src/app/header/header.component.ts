import {
  BubbleSort,
  InsertionSort,
  SelectionSort,
  HeapSort,
  ShellSort,
  CountingSort,
  OddEvenSort,
  CoctailSort,
  CycleSort,
  GnomeSort,
  CombSort,
  BogoSort,
  PancakeSort,
  StoogeSort,
} from './../sortAlgorythms';
import { SharedServiceService } from './../shared-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  localStorageKey: string = 'algorythmIndex';
  algorythmSelectForm: FormGroup;
  selectedAlgorythm: any;
  algorythms = [
    SelectionSort,
    BubbleSort,
    InsertionSort,
    HeapSort,
    ShellSort,
    CountingSort,
    OddEvenSort,
    CoctailSort,
    CycleSort,
    GnomeSort,
    CombSort,
    BogoSort,
    PancakeSort,
    StoogeSort,
  ];

  constructor(
    private _sharedSerice: SharedServiceService,
    private _fb: FormBuilder
  ) {
    this.selectedAlgorythm = this.algorythms[0];
    this.algorythmSelectForm = this._fb.group({
      algorythm: [this.savedAlgorythmIndex],
    });
  }

  ngOnInit(): void {
    this.subscribeToAlgorythmSelecting();
    this.setData(this.savedAlgorythmIndex);
  }

  get savedAlgorythmIndex() {
    let algorythmIndex = localStorage.getItem(this.localStorageKey);
    return algorythmIndex === null ? 0 : parseInt(algorythmIndex);
  }

  subscribeToAlgorythmSelecting() {
    this.algorythmSelectForm.valueChanges.subscribe((algorythm) => {
      let algorythmIndex = parseInt(algorythm.algorythm);
      this.setData(algorythmIndex);
    });
  }

  public sort(): void {
    this._sharedSerice.command.next('sort');
  }

  counter = 0;

  public setData(savedAlgorythmIndex: number | null): void {
    this._sharedSerice.command.next('setData');
    console.log(`water ${this.counter}`);
    this.counter++;
    console.log(savedAlgorythmIndex);
    if (savedAlgorythmIndex !== null) {
      console.log(`fire ${this.counter}`);
      this.setAlgorythm(this.algorythms[savedAlgorythmIndex]);
      this.saveToLocalstorage(savedAlgorythmIndex);
      this.counter++;
    }
  }

  saveToLocalstorage(algorythmIndex: number) {
    localStorage.setItem(this.localStorageKey, algorythmIndex.toString());
  }

  public setAlgorythm(algorythm: any): void {
    this._sharedSerice.selectedAlgorythm.next(algorythm);
  }
}
