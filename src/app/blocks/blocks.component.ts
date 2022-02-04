import { Component, OnInit } from '@angular/core';

import SortingAlgorithm from 'src/algorithms/SortingAlgorithm';
import { SharedServiceService } from './../shared-service.service';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss'],
})
export class BlocksComponent implements OnInit {
  selectedAlgorithm: SortingAlgorithm | undefined;
  sortedDataset: number[] = [];
  dataset: number[] = [];
  datasetSize: number = 80;
  animationSpeed: number = 50;

  constructor(private _sharedService: SharedServiceService) {
    this.subscribeToSharedData();
  }

  ngOnInit(): void {}

  subscribeToSharedData() {
    this.subscribeToAlgorithmSelecting();
    this.subscribeToCommands();
  }

  subscribeToAlgorithmSelecting() {
    this._sharedService.selectedAlgorithm.subscribe((algorithm) => {
      this.setData();
      this.selectedAlgorithm = new algorithm(
        this.dataset,
        this.sortedDataset,
        this.animationSpeed
      );
    });
  }

  subscribeToCommands() {
    this._sharedService.command.subscribe((command) => {
      if (this.selectedAlgorithm) {
        if (command === 'sort') {
          this.selectedAlgorithm.sort();
        } else if (command === 'setData') {
          this.setData();
          this.selectedAlgorithm = new (
            this.selectedAlgorithm as SortingAlgorithm & { constructor: any }
          ).constructor();
          if (this.selectedAlgorithm) {
            this.selectedAlgorithm.dataset = this.dataset;
            this.selectedAlgorithm.sortedDataset = this.sortedDataset;
          }
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
