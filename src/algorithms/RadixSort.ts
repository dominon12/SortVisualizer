import SortingAlgorithm from './SortingAlgorithm';
import { sleep } from 'src/helpers/helper';

export default class RadixSort extends SortingAlgorithm {
  static description: string = `
      <p>
        Radix sort is an non-comparison based sorting algorithm. 
        It uses radix of the elements to distribute them in buckets 
        to avoid the comparison.
      </p>
      <p>
        It sorts the elements by first grouping or distributing them in 
        buckets on the individual digits of the same place value.
      </p>
      <p>
        For example suppose we have an array of 10 elements. 
        First, we will sort elements based on the value of the unit place. 
        Then, we will sort elements based on the value of the tenth place. 
        This process goes on until the last significant place.
      </p>
      <p>
        As it breaks the elements at it’s place after every cycle, 
        radix sort can only be performed on integers.
      </p>
      <p>
        You should be familiar with the counting sort before 
        learning radix sort because it uses counting sort as an intermediate sort.
      </p>
      <h3>Algorithm:</h3>
      <ol>
        <li>
            First find the largest element from the array i.e max and let d be 
            the number of digits in the max, because we have to cycle 
            through each significant places of the largest number.
        </li>
        <li>
            Now, go through each significant place one by one and use any 
            stable sorting technique to sort the digits at each significant place. 
            I have used counting sort for this as it is an integer based sorting algorithm.
        </li>
      </ol>
    `;
  static specifications: string = `
    <p>
      <b>Best, Worst and Average Case</b>: O(k * n)
    </p>
    <p>
        <b>Space complexity:</b> O(n + d)
    </p>
      `;
  static code: string = `
      <pre>
    def countingSort(arr, exp1):

    n = len(arr)

    # The output array elements that will have sorted arr
    output = [0] * (n)

    # initialize count array as 0
    count = [0] * (10)

    # Store count of occurrences in count[]
    for i in range(0, n):
        index = arr[i] // exp1
        count[index % 10] += 1

    # Change count[i] so that count[i] now contains actual
    # position of this digit in output array
    for i in range(1, 10):
        count[i] += count[i - 1]

    # Build the output array
    i = n - 1
    while i >= 0:
        index = arr[i] // exp1
        output[count[index % 10] - 1] = arr[i]
        count[index % 10] -= 1
        i -= 1

    # Copying the output array to arr[],
    # so that arr now contains sorted numbers
    i = 0
    for i in range(0, len(arr)):
        arr[i] = output[i]

# Method to do Radix Sort
def radixSort(arr):

    # Find the maximum number to know number of digits
    max1 = max(arr)

    # Do counting sort for every digit. Note that instead
    # of passing digit number, exp is passed. exp is 10^i
    # where i is current digit number
    exp = 1
    while max1 / exp > 1:
        countingSort(arr, exp)
        exp *= 10


# Driver code
arr = [170, 45, 75, 90, 802, 24, 2, 66]

# Function Call
radixSort(arr)

for i in range(len(arr)):
    print(arr[i],end=" ")

# This code is contributed by Mohit Kumra
# Edited by Patrick Gallagher
    </pre>`;
  static sources: string[] = [
    'https://www.geeksforgeeks.org/bogosort-permutation-sort/',
  ];

  sort() {
    this.radixSort(this.dataset);
  }

  async countingSort(arr: number[], size: number, place: number) {
    let output = new Array(size + 1).fill(0);
    let max = Math.max(...arr);

    let freq = new Array(max + 1).fill(0);

    // Calculate count of elements
    for (let i = 0; i < size; i++) {
      const num = Math.floor(arr[i] / place) % 10;
      freq[num]++;
    }

    // Calculate cummulative count
    for (let i = 1; i < 10; i++) {
      freq[i] += freq[i - 1];
    }

    // Place the elements in sorted order
    for (let i = size - 1; i >= 0; i--) {
      const num = Math.floor(arr[i] / place) % 10;
      output[freq[num] - 1] = arr[i];
      freq[num]--;
    }

    //Copy the output array
    for (let i = 0; i < size; i++) {
      await sleep(this.animationSpeed);
      arr[i] = output[i];
    }
  }

  async radixSort(arr: number[], size = arr.length) {
    //Get the max element
    let max = Math.max(...arr);

    //Sort the array using counting sort
    for (let i = 1; max / i > 0; i *= 10) {
      await this.countingSort(arr, size, i);
    }
  }

  static toString() {
    return 'Radix Sort';
  }
}
