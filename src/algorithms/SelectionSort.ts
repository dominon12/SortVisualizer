import SortingAlgorithm from './SortingAlgorithm';
import { sleep } from 'src/helpers/helper';

export default class SelectionSort extends SortingAlgorithm {
  static description: string = `
      <p>
        The selection sort algorithm sorts an array by repeatedly finding the
        minimum element (considering ascending order) from unsorted part and
        putting it at the beginning. The algorithm maintains two subarrays in
        a given array.
      </p>
      <p>
        1) The subarray which is already sorted. <br />
        2) Remaining subarray which is unsorted.
      </p>
      <p>
        In every iteration of selection sort, the minimum element (considering
        ascending order) from the unsorted subarray is picked and moved to the
        sorted subarray.
      </p>
      <p>Following example explains the above steps:</p>
      <pre>
  arr[] = 64 25 12 22 11
  
  // Find the minimum element in arr[0...4]
  // and place it at beginning
  11 25 12 22 64
  
  // Find the minimum element in arr[1...4]
  // and place it at beginning of arr[1...4]
  11 12 25 22 64
  
  // Find the minimum element in arr[2...4]
  // and place it at beginning of arr[2...4]
  11 12 22 25 64
  
  // Find the minimum element in arr[3...4]
  // and place it at beginning of arr[3...4]
  11 12 22 25 64 
    </pre>`;
  static specifications: string = `
      <p><b>Time Complexity</b>: O(n2) as there are two nested loops.</p>
      <p>
        <b>Auxiliary Space:</b> O(1) The good thing about selection sort is it
        never makes more than O(n) swaps and can be useful when memory write
        is a costly operation.
      </p>
      `;
  static code: string = `
      <pre>
  def selection_sort(arr):
  
    # Traverse through all array elements
    for i in range(len(arr)):
            
        # Find the minimum element in remaining 
        # unsorted array
        min_idx = i
        for j in range(i + 1, len(arr)):
            if arr[min_idx] > arr[j]:
                min_idx = j
                    
        # Swap the found minimum element with 
        # the first element        
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
      </pre>`;
  static sources: string[] = ['https://www.geeksforgeeks.org/selection-sort/'];

  async sort() {
    let arrayLength = this.dataset.length;
    for (let i = 0; i < arrayLength; i++) {
      let minValue = Math.min(...this.dataset);
      await sleep(this.animationSpeed);
      this.dataset = this.removeArrayElement(this.dataset, minValue);
      await sleep(this.animationSpeed);
      this.sortedDataset.push(minValue);
    }
  }

  private removeArrayElement(array: number[], elementToRemove: number) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === elementToRemove) {
        array.splice(i, 1);
        break;
      }
    }
    return array;
  }

  static toString() {
    return 'Selection Sort';
  }
}
