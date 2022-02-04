import { sleep } from 'src/helpers/helper';
import { SortingAlgorithm } from './SortingAlgorithm';

export class CountingSort extends SortingAlgorithm {
  static description: string = `
      <p>
        Counting sort is a sorting technique based on keys between a specific range. 
        It works by counting the number of objects having distinct key values (kind of hashing). 
        Then doing some arithmetic to calculate the position of each object in the output sequence.
        Let us understand it with the help of an example. 
      </p>
      <p>
        For simplicity, consider the data in the range 0 to 9. 
      </p>
      <p>
        Input data: 1, 4, 1, 2, 7, 5, 2
      </p>
      <h3>1) Take a count array to store the count of each unique object.</h3>
      <pre>
    Index:     0  1  2  3  4  5  6  7  8  9
    Count:     0  2  2  0  1  1  0  1  0  0
      </pre>
      <h3>2) Modify the count array such that each element at each index stores the sum of previous counts. </h3>
      <pre>
    Index:     0  1  2  3  4  5  6  7  8  9
    Count:     0  2  4  4  5  6  6  7  7  7
      </pre>
      <p>
        The modified count array indicates the position of each object in 
        the output sequence.
      </p>
      <h3>3) Output each object from the input sequence followed by decreasing its count by 1.</h3>
      <p>
        Process the input data: 1, 4, 1, 2, 7, 5, 2. Position of 1 is 2.
        Put data 1 at index 2 in output. Decrease count by 1 to place 
        next data 1 at an index 1 smaller than this index.
      </p>`;
  static specifications: string = `
      <p>
        <b>Time Complexity</b>: O(n + k) where n is the number of elements in input array and k is the range of input. 
      </p>    
      <p>
        <b>Auxiliary Space</b>: O(n + k)
      </p>
      `;
  static code: string = `
      <pre>
  def count_sort(arr):
    
      # The output character array that will have sorted arr
      output = [0 for i in range(len(arr))]
    
      # Create a count array to store count of inidividual
      # characters and initialize count array as 0
      count = [0 for i in range(256)]
    
      # For storing the resulting answer since the
      # string is immutable
      ans = ["" for _ in arr]
    
      # Store count of each character
      for i in arr:
          count[ord(i)] += 1
    
      # Change count[i] so that count[i] now contains actual
      # position of this character in output array
      for i in range(256):
          count[i] += count[i - 1]
    
      # Build the output character array
      for i in range(len(arr)):
          output[count[ord(arr[i])] - 1] = arr[i]
          count[ord(arr[i])] -= 1
    
      # Copy the output array to arr, so that arr now
      # contains sorted characters
      for i in range(len(arr)):
          ans[i] = output[i]
      return ans
      </pre>`;
  static sources: string[] = ['https://www.geeksforgeeks.org/counting-sort/'];

  async sort() {
    let count: number[] = [];
    let z = 0;
    let max = Math.max(...this.dataset);

    for (let i = 0; i <= max; i++) {
      count[i] = 0;
    }
    for (let i = 0; i < this.dataset.length; i++) {
      count[this.dataset[i]]++;
    }
    for (let i = 0; i <= max; i++) {
      while (count[i]-- > 0) {
        await sleep(this.animationSpeed);
        this.dataset[z++] = i;
      }
    }
  }

  static toString() {
    return 'Counting Sort';
  }
}
