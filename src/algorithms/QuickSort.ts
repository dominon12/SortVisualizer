import SortingAlgorithm from './SortingAlgorithm';
import { sleep } from 'src/helpers/helper';

export default class QuickSort extends SortingAlgorithm {
  static description: string = `
      <p>
        Like Merge Sort, QuickSort is a Divide and Conquer algorithm. 
        It picks an element as pivot and partitions the given array around the picked pivot. 
        There are many different versions of quickSort that pick pivot in different ways. 
      </p>
      <ol>
        <li>Always pick first element as pivot.</li>
        <li>Always pick last element as pivot (implemented below)</li>
        <li>Pick a random element as pivot.</li>
        <li>Pick median as pivot.</li>
      </ol>
      <p>
        The key process in quickSort is partition(). Target of partitions is, 
        given an array and an element x of array as pivot, put x at its correct position 
        in sorted array and put all smaller elements (smaller than x) before x, and put all 
        greater elements (greater than x) after x. All this should be done in linear time.
      </p>
      <h3>
        Partition Algorithm  
      </h3>
      <p>
        There can be many ways to do partition, following pseudo code adopts 
        the method given in CLRS book. The logic is simple, we start from the 
        leftmost element and keep track of index of smaller (or equal to) 
        elements as i. While traversing, if we find a smaller element, we swap 
        current element with arr[i]. Otherwise we ignore current element. 
      </p>
      `;
  static specifications: string = `
        <p>
          <b>Best and Average Time Complexity</b>: O(nlogn)
        </p>
        <p>
          <b>Worst Time Complexity</b>: O(n^2)
        </p>
        <p>
          <b>Worst Case:</b> The worst case occurs when the partition process 
          always picks greatest or smallest element as pivot. If we consider 
          above partition strategy where last element is always picked as pivot, 
          the worst case would occur when the array is already sorted in increasing or 
          decreasing order. Following is recurrence for worst case. 
        </p>
        <p>
          <b>Best Case:</b> The best case occurs when the partition process always picks 
          the middle element as pivot. Following is recurrence for best case. 
        </p>
      `;
  static code: string = `
      <pre>
# This Function handles sorting part of quick sort
# start and end points to first and last element of
# an array respectively
def partition(start, end, array):
      
    # Initializing pivot's index to start
    pivot_index = start
    pivot = array[pivot_index]
      
    # This loop runs till start pointer crosses
    # end pointer, and when it does we swap the
    # pivot with element on end pointer
    while start < end:
          
        # Increment the start pointer till it finds an
        # element greater than  pivot
        while start < len(array) and array[start] <= pivot:
            start += 1
              
        # Decrement the end pointer till it finds an
        # element less than pivot
        while array[end] > pivot:
            end -= 1
          
        # If start and end have not crossed each other,
        # swap the numbers on start and end
        if(start < end):
            array[start], array[end] = array[end], array[start]
      
    # Swap pivot element with element on end pointer.
    # This puts pivot on its correct sorted place.
    array[end], array[pivot_index] = array[pivot_index], array[end]
    
    # Returning end pointer to divide the array into 2
    return end
      
# The main function that implements QuickSort
def quick_sort(start, end, array):
      
    if (start < end):
          
        # p is partitioning index, array[p]
        # is at right place
        p = partition(start, end, array)
          
        # Sort elements before partition
        # and after partition
        quick_sort(start, p - 1, array)
        quick_sort(p + 1, end, array)
          
# Driver code
array = [ 10, 7, 8, 9, 1, 5 ]
quick_sort(0, len(array) - 1, array)
  
print(f'Sorted array: {array}')
      
# This code is contributed by Adnan Aliakbar
      </pre>`;
  static sources: string[] = ['https://www.geeksforgeeks.org/quick-sort/'];

  async sort() {
    this.quickSort(this.dataset, 0, this.dataset.length - 1);
  }

  async swap(items: number[], leftIndex: number, rightIndex: number) {
    var temp = items[leftIndex];
    await sleep(this.animationSpeed);
    items[leftIndex] = items[rightIndex];
    await sleep(this.animationSpeed);
    items[rightIndex] = temp;
  }

  async partition(items: number[], left: number, right: number) {
    var pivot = items[Math.floor((right + left) / 2)], //middle element
      i = left, //left pointer
      j = right; //right pointer
    while (i <= j) {
      while (items[i] < pivot) {
        i++;
      }
      while (items[j] > pivot) {
        j--;
      }
      if (i <= j) {
        await this.swap(items, i, j); //sawpping two elements
        i++;
        j--;
      }
    }
    return i;
  }

  async quickSort(items: number[], left: number, right: number) {
    var index;
    if (items.length > 1) {
      index = await this.partition(items, left, right); //index returned from partition
      if (left < index - 1) {
        //more elements on the left side of the pivot
        await this.quickSort(items, left, index - 1);
      }
      if (index < right) {
        //more elements on the right side of the pivot
        await this.quickSort(items, index, right);
      }
    }
    return items;
  }

  static toString() {
    return 'Quick Sort';
  }
}
