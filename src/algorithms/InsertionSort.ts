import { sleep } from 'src/helpers/helper';
import { SortingAlgorithm } from './SortingAlgorithm';

export class InsertionSort extends SortingAlgorithm {
  static description: string = `
      <p>
        Insertion sort is a simple sorting algorithm 
        that works similar to the way you sort playing cards in your hands. 
        The array is virtually split into a sorted and an unsorted part. 
        Values from the unsorted part are picked and placed at the correct position in the sorted part.
      </p>
      <h3>
        Algorithm 
      </h3>
      <p>
        To sort an array of size n in ascending order: 
      </p>
      <ul>
        <li>Iterate from arr[1] to arr[n] over the array.</li>
        <li>Compare the current element (key) to its predecessor.</li>
        <li>If the key element is smaller than its predecessor, compare it to 
        the elements before. Move the greater elements one position up to make space 
        for the swapped element.</li>
      </ul>
      <h3>Example:</h3>
      <pre>
        <b>12</b>, 11, 13, 5, 6
      </pre>
      <p>
        Let us loop for i = 1 (second element of the array) to 4 (last element of the array)
        i = 1. Since 11 is smaller than 12, move 12 and insert 11 before 12 
      </p>
      <pre>
        <b>11, 12,</b> 13, 5, 6
      </pre>
      <p>
        i = 2. 13 will remain at its position as all elements in A[0..I-1] are smaller than 13 
      </p>
      <pre>
        <b>11, 12, 13,</b> 5, 6
      </pre>
      <p>
        i = 3. 5 will move to the beginning and all other elements from 11 
        to 13 will move one position ahead of their current position. 
      </p>
      <pre>
        <b>5, 11, 12, 13,</b> 6
      </pre>
      <p>
        i = 4. 6 will move to position after 5, and elements 
        from 11 to 13 will move one position ahead of their current position. 
      </p>
      <pre>
        <b>5, 6, 11, 12, 13 </pre>
      </p>
      `;
  static specifications: string = `
        <p>
          <b>Time Complexity</b>: O(n*2)
        </p>
        <p>
          <b>Auxiliary Space</b>: O(1)
        </p>
        <p>
          <b>Boundary Cases</b>: Insertion sort takes maximum time to 
          sort if elements are sorted in reverse order. And it takes 
          minimum time (Order of n) when elements are already sorted.
        </p>
        <p>
          <b>Algorithmic Paradigm</b>: Incremental Approach
        </p>
        <p>
          <b>Uses</b>: Insertion sort is used when number of elements is small. 
          It can also be useful when input array is almost sorted, only few elements 
          are misplaced in complete big array.
        </p>
      `;
  static code: string = `
      <pre>
  def insertion_sort(arr):
    
      # Traverse through 1 to len(arr)
      for i in range(1, len(arr)):
    
          key = arr[i]
    
          # Move elements of arr[0..i-1], that are
          # greater than key, to one position ahead
          # of their current position
          j = i - 1
          while j >= 0 and key < arr[j] :
                  arr[j + 1] = arr[j]
                  j -= 1
          arr[j + 1] = key
      </pre>`;
  static sources: string[] = ['https://www.geeksforgeeks.org/insertion-sort/'];

  async sort() {
    let arrayLength = this.dataset.length;
    for (let i = 1; i < arrayLength; i++) {
      let keyItem = this.dataset[i];
      let j = i - 1;
      while (j >= 0 && this.dataset[j] > keyItem) {
        await sleep(this.animationSpeed);
        this.dataset[j + 1] = this.dataset[j];
        j--;
      }
      await sleep(this.animationSpeed);
      this.dataset[j + 1] = keyItem;
    }
  }

  static toString() {
    return 'Insertion Sort';
  }
}
