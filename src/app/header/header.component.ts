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
      algorythm: [0],
    });
  }

  ngOnInit(): void {
    this.subscribeToAlgorythmSelecting();
    this.setData();
    this.setAlgorythm(this.algorythms[0]);
  }

  subscribeToAlgorythmSelecting() {
    this.algorythmSelectForm.valueChanges.subscribe((algorythm) => {
      let algorythmIndex = parseInt(algorythm.algorythm);
      this.setData();
      this.setAlgorythm(this.algorythms[algorythmIndex]);
    });
  }

  public setAlgorythm(algorythm: any): void {
    this._sharedSerice.selectedAlgorythm.next(algorythm);
  }

  public sort(): void {
    this._sharedSerice.command.next('sort');
  }

  public setData(): void {
    this._sharedSerice.command.next('setData');
  }
}
