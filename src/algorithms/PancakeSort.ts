import { sleep } from 'src/helpers/helper';
import { SortingAlgorithm } from './SortingAlgorithm';

export class PancakeSort extends SortingAlgorithm {
  static description: string = `
      <p>
        How to sort an array if you are allowed to do only following operation on array:
      </p>
      <pre>
      flip(arr, i): Reverse array from 0 to i 
      </pre>
      <p>
        Unlike a traditional sorting algorithm, which attempts to sort with 
        the fewest comparisons possible, the goal is to sort the sequence 
        in as few reversals as possible. 
      </p>
      <p>
        The idea is to do something similar to Selection Sort. We one by one 
        place maximum element at the end and reduce the size of current array by one. 
      </p>
      <h3>Algorithm:</h3>
      <ul>
        <li>
          Start from current size equal to n and reduce current size by one 
          while it’s greater than 1. Let the current size be curr_size. 
          Do following for every curr_size 
        </li>
        <ul>
          <li>
            Find index of the maximum element in arr[0..curr_szie-1]. Let the index be ‘mi’
          </li>
          <li>
            Call flip(arr, mi)
          </li>
          <li>
            Call flip(arr, curr_size-1)
          </li>
        </ul>
      </ul>
      `;
  static specifications: string = `
    <p>
      <b>Overall time complexity</b>: O(n^2).
    </p>
      `;
  static code: string = `
      <pre>
  # Reverses arr[0..i] */
  def flip(arr, i):
      start = 0
      while start < i:
          arr[start], arr[i] = arr[i], arr[start]
          start += 1
          i -= 1
    
  # Returns index of the maximum
  # element in arr[0..n-1] */
  def find_max(arr, n):
      mi = 0
      for i in range(0, n):
          if arr[i] > arr[mi]:
              mi = i
      return mi
    
  # The main function that
  # sorts given array
  # using flip operations
  def pancake_sort(arr, n):
        
      # Start from the complete
      # array and one by one
      # reduce current size
      # by one
      curr_size = n
      while curr_size > 1:
          # Find index of the maximum
          # element in
          # arr[0..curr_size-1]
          mi = find_max(arr, curr_size)
    
          # Move the maximum element
          # to end of current array
          # if it's not already at
          # the end
          if mi != curr_size - 1:
              # To move at the end,
              # first move maximum
              # number to beginning
              flip(arr, mi)
    
              # Now move the maximum
              # number to end by
              # reversing current array
              flip(arr, curr_size - 1)
          curr_size -= 1
    </pre>`;
  static sources: string[] = ['https://www.geeksforgeeks.org/pancake-sorting/'];

  async sort() {
    let arrayLength = this.dataset.length;
    while (arrayLength > 0) {
      // Find index of the maximum element in arr
      let mi = this.findMax(this.dataset, arrayLength);
      // Move the maximum element to end of current
      // array if it's not already at the end
      if (mi !== arrayLength - 1) {
        // To move at the end, first move maximum number to beginning
        await this.flip(mi);
        // Now move the maximum number to end by reversing current array
        await this.flip(arrayLength - 1);
      }
      arrayLength--;
    }
  }

  private findMax(arr: number[], arrayLength: number) {
    let mi = 0;
    for (let i = 0; i < arrayLength; i++) {
      if (arr[i] > arr[mi]) {
        mi = i;
      }
    }
    return mi;
  }

  private async flip(i: number) {
    let start = 0;
    while (start < i) {
      let temp = this.dataset[start];
      await sleep(0);
      this.dataset[start] = this.dataset[i];
      await sleep(0);
      this.dataset[i] = temp;
      start += 1;
      i -= 1;
    }
  }

  static toString() {
    return 'Pancake Sort';
  }
}
