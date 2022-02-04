import { sleep } from 'src/helpers/helper';
import { SortingAlgorithm } from './SortingAlgorithm';

export class BubbleSort extends SortingAlgorithm {
  static description: string = `
      <p>
        Bubble Sort is the simplest sorting algorithm that works 
        by repeatedly swapping the adjacent elements if they are in wrong order.
      </p>
      <p>
        Example:
      </p>
      <p>1st pass:</p>
      <pre>
  arr[] = 64 25 12 22 11
  ( 5 1 4 2 8 ) –> ( 1 5 4 2 8 ), Here, algorithm compares the first two elements, and swaps since 5 > 1.
  ( 1 5 4 2 8 ) –>  ( 1 4 5 2 8 ), Swap since 5 > 4
  ( 1 4 5 2 8 ) –>  ( 1 4 2 5 8 ), Swap since 5 > 2
  ( 1 4 2 5 8 ) –> ( 1 4 2 5 8 ), Now, since these elements are already in order (8 > 5), algorithm does not swap them.
      </pre>
      <p>2nd pass:</p>
      <pre>
  arr[] = 64 25 12 22 11
  ( 1 4 2 5 8 ) –> ( 1 4 2 5 8 )
  ( 1 4 2 5 8 ) –> ( 1 2 4 5 8 ), Swap since 4 > 2
  ( 1 2 4 5 8 ) –> ( 1 2 4 5 8 )
  ( 1 2 4 5 8 ) –>  ( 1 2 4 5 8 )
      </pre>
      <p>Now, the array is already sorted, but our algorithm does
       not know if it is completed. The algorithm needs one whole 
       pass without any swap to know it is sorted.
       </p>
       <p>3rd pass:</p>
       <pre>
  ( 1 2 4 5 8 ) –> ( 1 2 4 5 8 )
  ( 1 2 4 5 8 ) –> ( 1 2 4 5 8 )
  ( 1 2 4 5 8 ) –> ( 1 2 4 5 8 )
  ( 1 2 4 5 8 ) –> ( 1 2 4 5 8 )
       </pre>
       <p>
          Due to its simplicity, bubble sort is often used to introduce 
          the concept of a sorting algorithm.
          In computer graphics it is popular for its capability to detect a very small 
          error (like swap of just two elements) in almost-sorted arrays and fix it with just 
          linear complexity (2n). For example, it is used in a polygon filling algorithm, 
          where bounding lines are sorted by their x coordinate at a specific scan line (a 
          line parallel to x axis) and with incrementing y their order changes (two elements are swapped)
          only at intersections of two lines 
       </p>
      `;
  static specifications: string = `
      <p>
        <b>Worst and Average Case Time Complexity</b>: O(n*n). Worst case occurs when array is reverse sorted.
      </p>
      <p>
        <b>Best Case Time Complexity</b>: O(n). Best case occurs when array is already sorted.
      </p>
      <p>
        <b>Auxiliary Space</b>: O(1)
      </p>
      <p>
        <b>Boundary Cases</b>: Bubble sort takes minimum time (Order of n) when elements are already sorted.
      </p>
      `;
  static code: string = `
      <pre>
  def bubble_sort(arr):
    n = len(arr)
  
    # Traverse through all array elements
    for i in range(n):
  
        # Last i elements are already in place
        for j in range(0, n - i - 1):
  
            # traverse the array from 0 to n - i - 1
            # Swap if the element found is greater
            # than the next element
            if arr[j] > arr[j + 1] :
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    </pre>`;
  static sources: string[] = ['https://www.geeksforgeeks.org/bubble-sort/'];

  async sort() {
    let arrayLength = this.dataset.length;
    for (let i = 0; i < arrayLength - 1; i++) {
      for (let j = 0; j < arrayLength - i - 1; j++) {
        if (this.dataset[j] > this.dataset[j + 1]) {
          let currentValue = this.dataset[j];
          await sleep(0);
          this.dataset[j] = this.dataset[j + 1];
          this.dataset[j + 1] = currentValue;
        }
      }
    }
  }

  static toString() {
    return 'Bubble Sort';
  }
}
