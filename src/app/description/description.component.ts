import { SharedServiceService } from './../shared-service.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SortAlgorythm } from '../sortAlgorythms';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DescriptionComponent implements OnInit {
  selectedAlgorythm: any;

  constructor(private _sharedService: SharedServiceService) {}

  ngOnInit(): void {
    this.subscribeToAlgorythmSelecting();
  }

  subscribeToAlgorythmSelecting() {
    this._sharedService.selectedAlgorythm.subscribe(
      (algorythm: SortAlgorythm) => {
        this.selectedAlgorythm = algorythm;
      }
    );
  }
}
