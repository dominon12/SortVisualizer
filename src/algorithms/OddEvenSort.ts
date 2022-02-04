import SortingAlgorithm  from './SortingAlgorithm';
import { sleep } from 'src/helpers/helper';

export default class OddEvenSort extends SortingAlgorithm {
  static description: string = `
      <p>
        This is basically a variation of bubble-sort. This algorithm is
        divided into two phases- Odd and Even Phase.
        The algorithm runs until the array elements are sorted and in 
        each iteration two phases occurs- Odd and Even Phases.
      </p>
      <p>
        In the odd phase, we perform a bubble sort on odd indexed elements and in the even phase, 
        we perform a bubble sort on even indexed elements.
      </p>
      <p>
        We demonstrate the above algorithm using the below illustration on the array = [3, 2, 3, 8, 5, 6, 4, 1]
      </p>
      <p>
        <img src="https://www.geeksforgeeks.org/wp-content/uploads/odd-even-sort.png">
      </p>
      `;
  static specifications: string = `
      <p>
        <b>Time Complexity</b>: O(N2) where, N = Number of elements in the input array.
      </p>
      <p>
        <b>Auxiliary Space</b>: O(1). Just like bubble sort this is also an in-place algorithm.
      </p>`;
  static code: string = `
      <pre>
  def odd_even_sort(arr, n):
    # Initially array is unsorted
    is_sorted = 0
    while not is_sorted:
        is_sorted = True
        temp = 0
        for i in range(1, n - 1, 2):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                is_sorted = False
                  
        for i in range(0, n - 1, 2):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                is_sorted = False
      
    return
    </pre>`;
  static sources: string[] = [
    'https://www.geeksforgeeks.org/odd-even-sort-brick-sort/',
  ];

  async sort() {
    let arrayLength = this.dataset.length;
    let sort = false;
    while (!sort) {
      sort = true;
      for (let i = 1; i < arrayLength - 1; i += 2) {
        if (this.dataset[i] <= this.dataset[i + 1]) continue;
        var temp = this.dataset[i];
        await sleep(0);
        this.dataset[i] = this.dataset[i + 1];
        await sleep(0);
        this.dataset[i + 1] = temp;
        sort = false;
      }
      for (var i = 0; i < arrayLength - 1; i += 2) {
        if (this.dataset[i] <= this.dataset[i + 1]) continue;
        var temp = this.dataset[i];
        await sleep(0);
        this.dataset[i] = this.dataset[i + 1];
        await sleep(0);
        this.dataset[i + 1] = temp;
        sort = false;
      }
    }
  }

  static toString() {
    return 'Odd Even Sort';
  }
}
