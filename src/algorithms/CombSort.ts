import { sleep } from 'src/helpers/helper';
import { SortingAlgorithm } from './SortingAlgorithm';

export class CombSort extends SortingAlgorithm {
  static description: string = `
      <p>
        Comb Sort is mainly an improvement over Bubble Sort. 
        Bubble sort always compares adjacent values. So all inversions are 
        removed one by one. Comb Sort improves on Bubble Sort by using gap of 
        size more than 1. The gap starts with a large value and shrinks by a 
        factor of 1.3 in every iteration until it reaches the value 1. 
        Thus Comb Sort removes more than one inversion counts with one swap 
        and performs better than Bubble Sort.
      </p>
      <p>
        The shrink factor has been empirically found to be 1.3 
        (by <a href="https://en.wikipedia.org/wiki/Comb_sort" target="_blank" rel="noreferrer">testing Combsort</a> 
        on over 200,000 random lists)
      </p>
      <p>
        Although, it works better than Bubble Sort on average, worst case remains O(n2).
      </p>
      <h3>Illustration:</h3>
      <p>
        Let the array elements be = [8, 4, 1, 56, 3, -44, 23, -6, 28, 0]
      </p>
      <p>
        Initially gap value = 10 <br>
        After shrinking gap value => 10 / 1.3 = 7; 
      </p>
      <pre>
      8 4 1 56 3 -44 23 -6 28 0
      -6 4 1 56 3 -44 23  8 28 0
      -6 4 0 56 3 -44 23  8 28 1
      </pre>
      <p>
        New gap value => 7 / 1.3 = 5;  
      </p>
      <pre>
      -44 4 0 56 3 -6 23 8 28 1
      -44 4 0 28 3 -6 23 8 56 1
      -44 4 0 28 1 -6 23 8 56 3
      </pre>
      <p>
        New gap value => 5 / 1.3 = 3; 
      </p>
      <pre>
      -44 1  0 28 4 -6 23 8 56 3
      -44 1 -6 28 4  0 23 8 56 3
      -44 1 -6 23 4  0 28 8 56 3
      -44 1 -6 23 4  0  3 8 56 28
      </pre>
      <p>
        New gap value => 3 / 1.3 = 2;  
      </p>
      <pre>
      -44 1 -6 0 4 23 3 8 56 28
      -44 1 -6 0 3 23 4 8 56 28
      -44 1 -6 0 3 8 4 23 56 28
      </pre>
      <p>
        New gap value => 2 / 1.3 = 1;  
      </p>
      <pre>
      -44 -6 1 0 3 8 4 23 56 28
      -44 -6 0 1 3 8 4 23 56 28
      -44 -6 0 1 3 4 8 23 56 28
      -44 -6 0 1 3 4 8 23 28 56 
  
      no more swaps required (Array sorted)
      </pre>
      `;
  static specifications: string = `
    <p>
      <b>Time Complexity</b>: Average case time complexity of the algorithm is Ω(N2/2p), 
      where p is the number of increments. The worst-case complexity of this 
      algorithm is O(n2) and the Best Case complexity is O(nlogn). 
    </p>
    <p>
      <b>Auxiliary Space</b>: O(1).   
    </p>
      `;
  static code: string = `
      <pre>
  # To find next gap from current
  def get_next_gap(gap):
  
    # Shrink gap by Shrink factor
    gap = (gap * 10) / 13
    if gap < 1:
        return 1
    return gap
        
  # Function to sort arr[] using Comb Sort
  def comb_sort(arr):
    n = len(arr)
  
    # Initialize gap
    gap = n
  
    # Initialize swapped as true to make sure that
    # loop runs
    swapped = True
  
    # Keep running while gap is more than 1 and last
    # iteration caused a swap
    while gap != 1 or swapped == 1:
  
        # Find next gap
        gap = get_next_gap(gap)
  
        # Initialize swapped as false so that we can
        # check if swap happened or not
        swapped = False
  
        # Compare all elements with current gap
        for i in range(0, n - gap):
            if arr[i] > arr[i + gap]:
                arr[i], arr[i + gap] = arr[i + gap], arr[i]
                swapped = True
    </pre>`;
  static sources: string[] = ['https://www.geeksforgeeks.org/comb-sort/'];

  async sort() {
    let arrayLength = this.dataset.length;
    let gap = this.dataset.length;
    let shrink = 1.3;
    let noSwap = false;

    while (!noSwap) {
      //   let interval = setInterval(() => {
      gap = Math.floor(gap / shrink);

      if (gap < 1) {
        gap = 1;
        noSwap = true;
      } else {
        noSwap = false;
      }

      let i = 0;

      while (i + gap < arrayLength) {
        if (this.dataset[i] > this.dataset[i + gap]) {
          let temp = this.dataset[i];
          await sleep(this.animationSpeed);
          this.dataset[i] = this.dataset[i + gap];
          await sleep(this.animationSpeed);
          this.dataset[i + gap] = temp;
        }
        i++;
      }
    }
    //   }, this.animationSpeed);
  }

  static toString() {
    return 'Comb Sort';
  }
}
