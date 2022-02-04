import SortingAlgorithm from './SortingAlgorithm';
import { sleep } from 'src/helpers/helper';

export default class StoogeSort extends SortingAlgorithm {
  static description: string = `
      <p>
        The Stooge sort is a recursive sorting algorithm. 
        It is defined as below (for ascending order sorting).
      </p>
      <pre>
  Step 1 : If value at index 0 is greater than
            value at last index, swap them.
  
  Step 2:  Recursively, 
    a) Stooge sort the initial 2/3rd of the array.
    b) Stooge sort the last 2/3rd of the array.
    c) Stooge sort the initial 2/3rd again to confirm.
      </pre>
      <h3>Illustration:</h3>
      <pre>
      Input : 2 4 5 3 1
      Output : 1 2 3 4 5
      </pre>
      <h4>Initially, swap 2 and 1 following above step 1.</h4>
      <pre>
      1 4 5 3 2
      </pre>
      <h4>Now, recursively sort initial 2/3rd of the elements.</h4>
      <pre>
      1 4 5 3 2
      1 3 4 5 2 
      </pre>
      <h4>Then, recursively sort last 2/3rd of the elements.</h4>
      <pre>
      1 3 4 5 2
      1 2 3 4 5
      </pre>
      <h4>Again, sort the initial 2/3rd of the elements to confirm final data is sorted.</h4>
      <pre>
      1 2 3 4 5
      </pre>
      <p>
        <img src="https://media.geeksforgeeks.org/wp-content/uploads/stoogeSort.png">    
      </p>
      `;
  static specifications: string = `
      <p>
        <b>Time complexity</b>: O(nlog 3 / log 1.5 ) = O(n2.7095...), hence it is slower than even bubble sort(n^2)  
      </p>    
      `;
  static code: string = `
      <pre>
  def stooge_sort(arr, l, h):
    if l >= h:
        return
  
    # If first element is smaller
    # than last, swap them
    if arr[l] > arr[h]:
        t = arr[l]
        arr[l] = arr[h]
        arr[h] = t
  
    # If there are more than 2 elements in
    # the array
    if h - l + 1 > 2:
        t = ((h - l + 1) / 3)
  
        # Recursively sort first 2 / 3 elements
        stooge_sort(arr, l, (h - t))
  
        # Recursively sort last 2 / 3 elements
        stooge_sort(arr, l + t, (h))
  
        # Recursively sort first 2 / 3 elements
        # again to confirm
        stooge_sort(arr, l, (h - t))
  </pre>`;
  static sources: string[] = ['https://www.geeksforgeeks.org/stooge-sort/'];

  sort() {
    let arrayLength = this.dataset.length;
    this.stoogeSort(this.dataset, 0, arrayLength - 1, 0);
  }

  private async stoogeSort(arr: number[], i: number, h: number, depth: number) {
    if (i >= h) {
      return;
    }
    // If first element is smaller than last,swap them
    if (arr[i] > arr[h]) {
      let temp = arr[i];
      await sleep(0);
      arr[i] = arr[h];
      await sleep(0);
      arr[h] = temp;
    }
    // If there are more than 2 elements in the array
    if (h - i + 1 > 2) {
      let t = Math.floor((h - i + 1) / 3);
      // Recursively sort first 2/3 elements
      await this.stoogeSort(arr, i, h - t, depth + 100000);
      // Recursively sort last 2/3 elements
      await this.stoogeSort(arr, i + t, h, depth + 100000);
      // Recursively sort first 2/3 elements again to confirm
      await this.stoogeSort(arr, i, h - t, depth + 100000);
    }
  }

  static toString() {
    return 'Stooge Sort';
  }
}
