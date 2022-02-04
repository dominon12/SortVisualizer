import { sleep } from 'src/helpers/helper';
import { SortingAlgorithm } from './SortingAlgorithm';

export class BogoSort extends SortingAlgorithm {
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
    let isSorted = this.isSorted();
    while (!isSorted) {
      // if array isn't sorted, shuffle
      await sleep(this.animationSpeed);
      this.shuffle();
    }
  }

  private shuffle() {
    for (var i = this.dataset.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = this.dataset[i];
      this.dataset[i] = this.dataset[j];
      this.dataset[j] = temp;
    }
  }

  private isSorted() {
    let arrayLength = this.dataset.length;
    for (let i = 0; i < arrayLength - 1; i++) {
      if (this.dataset[i] > this.dataset[i + 1]) {
        return false;
      }
    }
    return true;
  }

  static toString() {
    return 'Bogo Sort';
  }
}
