import SortingAlgorithm from './SortingAlgorithm';
import { sleep } from 'src/helpers/helper';

export default class BucketSort extends SortingAlgorithm {
  static description: string = `
      <p>
        BogoSort also known as permutation sort, stupid sort, slow sort, 
        shotgun sort or monkey sort is a particularly ineffective algorithm 
        based on generate and test paradigm. 
      </p>
      <p>
        The algorithm successively generates permutations of its 
        input until it finds one that is sorted.
      </p>
      <p>
        For example, if bogosort is used to sort a deck of cards, it would 
        consist of checking if the deck were in order, and if it were not, 
        one would throw the deck into the air, pick the cards up at random, 
        and repeat the process until the deck is sorted.
      </p>
      <h3>PseudoCode:</h3>
      <pre>
  while not Sorted(list) do
      shuffle (list)
  done
    </pre>
    <h3>Example:</h3>
    <p>Let us consider an example array = [3, 2, 5, 1, 0, 4]</p>
    <pre>
    4 5 0 3 2 1 (1st shuffling)
    4 1 3 2 5 0 (2nd shuffling)
    1 0 3 2 5 4 (3rd shuffling)
    3 1 0 2 4 5 (4th shuffling)
    1 4 5 0 3 2 (5th shuffling)
    .
    .
    .
    0 1 2 3 4 5 (nth shuffling) — Sorted Array
    </pre>
    <p>
      Here, n is unknown because algorithm doesn’t known in which 
      step the resultant permutation will come out to be sorted.
    </p>
    `;
  static specifications: string = `
    <p>
      &#9;<b>Worst Case</b>: O(∞) (since this algorithm has no upper bound)  
    </p>
    <p>
      &#9;<b>Average Case</b>: O(n*n!)  
    </p>
    <p>
      &#9;<b>Best Case</b>: O(n)(when array given is already sorted)  
    </p> <br>
    <p>
     <b>Auxiliary Space</b>: O(1)  
    </p>
      `;
  static code: string = `
      <pre>
  import random
  
  # Sorts array a[0..n-1] using Bogo sort
  def bogo_sort(a):
      n = len(a)
      while (is_sorted(a) == False):
          shuffle(a)
    
  # To check if array is sorted or not
  def is_sorted(a):
      n = len(a)
      for i in range(0, n - 1):
          if (a[i] > a[i + 1] ):
              return False
      return True
    
  # To generate permuatation of the array
  def shuffle(a):
      n = len(a)
      for i in range (0, n):
          r = random.randint(0, n - 1)
          a[i], a[r] = a[r], a[i]
    </pre>`;
  static sources: string[] = [
    'https://www.geeksforgeeks.org/bogosort-permutation-sort/',
  ];

  async sort() {
    this.bucketSort(this.dataset);
  }

  async bucketSort(arr: number[]) {
    if (arr.length === 0) {
      return arr;
    }
    let i,
      minValue = arr[0],
      maxValue = arr[0],
      bucketSize = 5;

    arr.forEach((currentVal) => {
      if (currentVal < minValue) {
        minValue = currentVal;
      } else if (currentVal > maxValue) {
        maxValue = currentVal;
      }
    });

    let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    let allBuckets: number[][] = new Array(bucketCount);
    for (i = 0; i < allBuckets.length; i++) {
      allBuckets[i] = [];
    }

    arr.forEach((currentVal) => {
      allBuckets[Math.floor((currentVal - minValue) / bucketSize)].push(
        currentVal
      );
    });

    arr.length = 0;

    for (let i = 0; i < allBuckets.length; i++) {
      await this.insertionSort(allBuckets[i]);

      for (let j = 0; j < allBuckets[i].length; j++) {
        await sleep(this.animationSpeed);
        arr.push(allBuckets[i][j]);
      }
    }

    // allBuckets.forEach(async (bucket) => {
    //   this.insertionSort(bucket);
    //   bucket.forEach(async (element) => {
    //     await sleep(this.animationSpeed);
    //     arr.push(element);
    //   });
    // });
    return arr;
  }

  async insertionSort(arr: number[]) {
    let length = arr.length;
    let i, j;
    for (i = 1; i < length; i++) {
      let temp = arr[i];
      for (j = i - 1; j >= 0 && arr[j] > temp; j--) {
        await sleep(this.animationSpeed);
        arr[j + 1] = arr[j];
      }
      await sleep(this.animationSpeed);
      arr[j + 1] = temp;
    }
    return arr;
  }

  static toString() {
    return 'Bucket Sort';
  }
}
