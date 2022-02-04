import SortingAlgorithm from './SortingAlgorithm';
import { sleep } from 'src/helpers/helper';

export default class CocktailSort extends SortingAlgorithm {
  static description: string = `
    <p>
      Cocktail Sort is a variation of Bubble sort. 
      The Bubble sort algorithm always traverses elements from left and moves 
      the largest element to its correct position in first iteration and 
      second largest in second iteration and so on. Cocktail Sort traverses 
      through a given array in both directions alternatively. 
    </p>
    <h3>Algorithm:</h3>
    <p>
      Each iteration of the algorithm is broken up into 2 stages: 
    </p>
    <ul>
      <li>
        The first stage loops through the array from left to right, 
        just like the Bubble Sort. During the loop, adjacent items 
        are compared and if value on the left is greater than the 
        value on the right, then values are swapped. At the end of 
        first iteration, largest number will reside at the end of the array.
      </li>
      <li>
        The second stage loops through the array in opposite direction - starting 
        from the item just before the most recently sorted item, and moving back 
        to the start of the array. Here also, adjacent items are compared and are swapped if required.
      </li>
    </ul>
    <h3>Example:</h3>
    <p>Let us consider an example array = [5, 1, 4, 2, 8, 0, 2]</p>
    <h4>First Forward Pass:</h4>
    <pre>
    (5 1 4 2 8 0 2) ? (1 5 4 2 8 0 2), Swap since 5 > 1 
    (1 5 4 2 8 0 2) ? (1 4 5 2 8 0 2), Swap since 5 > 4 
    (1 4 5 2 8 0 2) ? (1 4 2 5 8 0 2), Swap since 5 > 2 
    (1 4 2 5 8 0 2) ? (1 4 2 5 8 0 2) 
    (1 4 2 5 8 0 2) ? (1 4 2 5 0 8 2), Swap since 8 > 0 
    (1 4 2 5 0 8 2) ? (1 4 2 5 0 2 8), Swap since 8 > 2
    </pre>
    <p>
      After first forward pass, greatest element of the array will be present at the last index of array.
    </p>
    <h4>First Backward Pass:</h4>
    <pre>
    (1 4 2 5 0 2 8) ? (1 4 2 5 0 2 8) 
    (1 4 2 5 0 2 8) ? (1 4 2 0 5 2 8), Swap since 5 > 0 
    (1 4 2 0 5 2 8) ? (1 4 0 2 5 2 8), Swap since 2 > 0 
    (1 4 0 2 5 2 8) ? (1 0 4 2 5 2 8), Swap since 4 > 0 
    (1 0 4 2 5 2 8) ? (0 1 4 2 5 2 8), Swap since 1 > 0
    </pre>
    <p>
      After first backward pass, smallest element of the array will be present at 
      the first index of the array.
    </p>
    <h4>Second Forward Pass:</h4>
    <pre>
    (0 1 4 2 5 2 8) ? (0 1 4 2 5 2 8) 
    (0 1 4 2 5 2 8) ? (0 1 2 4 5 2 8), Swap since 4 > 2 
    (0 1 2 4 5 2 8) ? (0 1 2 4 5 2 8) 
    (0 1 2 4 5 2 8) ? (0 1 2 4 2 5 8), Swap since 5 > 2
    </pre>
    <h4>Second Backward Pass:</h4>
    <pre>
    (0 1 2 4 2 5 8) ? (0 1 2 2 4 5 8), Swap since 4 > 2
    </pre>
    <p>
      Now, the array is already sorted, but our algorithm doesn’t 
      know if it is completed. The algorithm needs to complete this 
      whole pass without any swap to know it is sorted. 
    </p>
    <pre>
    (0 1 2 2 4 5 8) ? (0 1 2 2 4 5 8) 
    (0 1 2 2 4 5 8) ? (0 1 2 2 4 5 8)
    </pre>
    `;
  static specifications: string = `
    <p>
      <b>Worst and Average Case Time Complexity</b>: O(n*n). 
    </p>
    <p>
      <b>Best Case Time Complexity</b>: O(n). Best case occurs when array is already sorted.
    </p>
    <p>
      <b>Auxiliary Space</b>: O(1)
    </p>
    <p>
      <b>Comparison with Bubble Sort</b>: Time complexities are same, but Cocktail performs 
      better than Bubble Sort. Typically cocktail sort is less than two times faster than 
      bubble sort. Consider the example (2, 3, 4, 5, 1). Bubble sort requires four 
      traversals of array for this example, while Cocktail sort requires only two traversals.
    </p>
    `;
  static code: string = `
    <pre>
  def cocktail_sort(a):
    n = len(a)
    swapped = True
    start = 0
    end = n - 1
    while swapped:
  
        # reset the swapped flag on entering the loop,
        # because it might be true from a previous
        # iteration.
        swapped = False
  
        # loop from left to right same as the bubble
        # sort
        for i in range(start, end):
            if (a[i] > a[i + 1]):
                a[i], a[i + 1] = a[i + 1], a[i]
                swapped = True
  
        # if nothing moved, then array is sorted.
        if not swapped:
            break
  
        # otherwise, reset the swapped flag so that it
        # can be used in the next stage
        swapped = False
  
        # move the end point back by one, because
        # item at the end is in its rightful spot
        end -= 1
  
        # from right to left, doing the same
        # comparison as in the previous stage
        for i in range(end - 1, start - 1, -1):
            if (a[i] > a[i + 1]):
                a[i], a[i + 1] = a[i + 1], a[i]
                swapped = True
  
        # increase the starting point, because
        # the last stage would have moved the next
        # smallest number to its rightful spot.
        start += 1
    </pre>`;
  static sources: string[] = ['https://www.geeksforgeeks.org/cocktail-sort/'];

  async sort() {
    let arrayLength = this.dataset.length;
    let swapped = true;
    let start = 0;
    let end = arrayLength - 1;

    while (swapped) {
      swapped = false;
      for (let i = start; i < end; i++) {
        if (this.dataset[i] > this.dataset[i + 1]) {
          let temp = this.dataset[i];
          await sleep(0);
          this.dataset[i] = this.dataset[i + 1];
          this.dataset[i + 1] = temp;
          swapped = true;
        }
      }

      swapped = false;
      end--;

      for (let i = end - 1; i >= start; i--) {
        if (this.dataset[i] > this.dataset[i + 1]) {
          let temp = this.dataset[i];
          await sleep(0);
          this.dataset[i] = this.dataset[i + 1];
          this.dataset[i + 1] = temp;
          swapped = true;
        }
      }

      start++;
    }
  }

  static toString() {
    return 'Cocktail Sort';
  }
}
