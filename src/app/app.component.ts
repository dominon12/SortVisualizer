import { SwUpdate } from '@angular/service-worker';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SortVisualizer';

  constructor(private swUpdate: SwUpdate) {
    this.subscribeToUpdates();
    this.setCheckForUpdateInterval();
  }

  subscribeToUpdates() {
    this.swUpdate.available.subscribe((event) => {
      if (
        confirm('Update Available. Refresh the page now to update the cache.')
      ) {
        window.location.reload();
      }
    });
  }

  setCheckForUpdateInterval() {
    setInterval(() => {
      this.swUpdate.checkForUpdate();
    }, 20000);
  }
}
