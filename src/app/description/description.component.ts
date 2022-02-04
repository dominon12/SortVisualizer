import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { SharedServiceService } from './../shared-service.service';
import SortingAlgorithm from 'src/algorithms/SortingAlgorithm';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DescriptionComponent implements OnInit {
  selectedAlgorithm: any;

  constructor(private _sharedService: SharedServiceService) {}

  ngOnInit(): void {
    this.subscribeToAlgorithmSelecting();
  }

  subscribeToAlgorithmSelecting() {
    this._sharedService.selectedAlgorithm.subscribe(
      (algorithm: SortingAlgorithm) => {
        this.selectedAlgorithm = algorithm;
      }
    );
  }
}
