import { ISortAlgorythm } from './../sortAlgorythms';
import { SharedServiceService } from './../shared-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss'],
})
export class BlocksComponent implements OnInit {
  selectedAlgorythm: ISortAlgorythm | undefined;
  sortedDataset: number[] = [];
  dataset: number[] = [];
  datasetSize: number = 80;
  animationSpeed: number = 50;

  constructor(private _sharedSerice: SharedServiceService) {
    this.subscribeToSharedData();
  }

  ngOnInit(): void {}

  subscribeToSharedData() {
    this.subscribeToAlgorythmSelecting();
    this.subscribeToCommands();
  }

  subscribeToAlgorythmSelecting() {
    this._sharedSerice.selectedAlgorythm.subscribe((algorythm: any) => {
      this.selectedAlgorythm = new algorythm(
        this.dataset,
        this.sortedDataset,
        this.animationSpeed
      );
    });
  }

  subscribeToCommands() {
    this._sharedSerice.command.subscribe((command) => {
      if (this.selectedAlgorythm) {
        if (command === 'sort') {
          this.selectedAlgorythm.sort();
        } else if (command === 'setData') {
          this.setData();
          this.selectedAlgorythm.dataset = this.dataset;
          this.selectedAlgorythm.sortedDataset = this.sortedDataset;
        }
      }
    });
  }

  getBlockPartsArray(blocksNum: number) {
    return Array(blocksNum).keys();
  }

  setData() {
    this.dataset = this.getRandomData();
    this.sortedDataset = [];
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getRandomData() {
    let dataset = [];
    for (let i = 0; i < this.datasetSize; i++) {
      let randomFigure = this.getRandomInt(this.datasetSize);
      dataset.push(randomFigure);
    }
    return dataset;
  }
}
