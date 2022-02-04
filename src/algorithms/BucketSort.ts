import SortingAlgorithm from './SortingAlgorithm';
import { sleep } from 'src/helpers/helper';

export default class BucketSort extends SortingAlgorithm {
  static description: string = `
      <p>
        Bucket sort is mainly useful when input is uniformly distributed over a range. 
        For example, consider the following problem. 
        Sort a large set of floating point numbers which are in range from 0.0 to 
        1.0 and are uniformly distributed across the range. How do we sort the 
        numbers efficiently?
      </p>
      <p>
        A simple way is to apply a comparison based sorting algorithm. 
        The lower bound for Comparison based sorting algorithm (Merge Sort, 
        Heap Sort, Quick-Sort .. etc) is Ω(n Log n), i.e., they cannot do 
        better than nLogn. 
      </p>
      <p>
        Can we sort the array in linear time? Counting sort can not be 
        applied here as we use keys as index in counting sort. Here keys are 
        floating point numbers.  
        The idea is to use bucket sort. 
      </p>
      <h3>Algorithm:</h3>
      <pre>
bucketSort(arr[], n)
1) Create n empty buckets (Or lists).
2) Do following for every array element arr[i].
.......a) Insert arr[i] into bucket[n * array[i]]
3) Sort individual buckets using insertion sort.
4) Concatenate all sorted buckets.
    </pre>
    `;
  static specifications: string = `
    <p>
      <b>Worst Case</b>: O(n²) 
    </p>
    <p>
      <b>Base and Average Case</b>: O(n + k) 
    </p>
      `;
  static code: string = `
      <pre>
def insertionSort(b):
for i in range(1, len(b)):
    up = b[i]
    j = i - 1
    while j >= 0 and b[j] > up:
        b[j + 1] = b[j]
        j -= 1
    b[j + 1] = up    
return b    
        
def bucketSort(x):
arr = []
slot_num = 10 # 10 means 10 slots, each
            # slot's size is 0.1
for i in range(slot_num):
    arr.append([])
    
# Put array elements in different buckets
for j in x:
    index_b = int(slot_num * j)
    arr[index_b].append(j)

# Sort individual buckets
for i in range(slot_num):
    arr[i] = insertionSort(arr[i])
    
# concatenate the result
k = 0
for i in range(slot_num):
    for j in range(len(arr[i])):
        x[k] = arr[i][j]
        k += 1
return x

# Driver Code
x = [0.897, 0.565, 0.656,
0.1234, 0.665, 0.3434]
print("Sorted Array is")
print(bucketSort(x))

# This code is contributed by
# Oneil Hsiao
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
