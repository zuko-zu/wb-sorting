import { animationSpeed, isSorting } from './index.js';

export async function bubbleSort(array) {
  const len = array.length;

  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (!isSorting) {
        return;
      }

      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        renderArray(array);
        await sleep(animationSpeed);
      }
    }
  }
  renderArray(array);
}

export async function mergeSort(array) {
  async function merge(left, right, start, middle, end) {
    let result = [];
    let leftIndex = start;
    let rightIndex = middle + 1;

    while (leftIndex <= middle && rightIndex <= end) {
      if (!isSorting) {
        return;
      }

      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    while (leftIndex <= middle) {
      result.push(left[leftIndex]);
      leftIndex++;
    }

    while (rightIndex <= end) {
      result.push(right[rightIndex]);
      rightIndex++;
    }

    for (let i = 0; i < result.length; i++) {
      array[start + i] = result[i];
    }

    renderArray(array);
    await sleep(animationSpeed);
  }

  async function mergeSortRec(start, end) {
    if (start >= end) {
      return;
    }

    const middle = Math.floor((start + end) / 2);
    await mergeSortRec(start, middle);
    await mergeSortRec(middle + 1, end);
    await merge(array.slice(), array.slice(), start, middle, end);
  }

  await mergeSortRec(0, array.length - 1);
  renderArray(array);
}

export async function quickSort(array) {
  const partition = async (low, high) => {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (array[j] < pivot) {
        i++;
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        renderArray(array);
        await sleep(animationSpeed);
      }
    }

    const temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;
    renderArray(array);
    await sleep(animationSpeed);

    return i + 1;
  };

  const quickSortRec = async (low, high) => {
    if (low < high) {
      const pi = await partition(low, high);
      await quickSortRec(low, pi - 1);
      await quickSortRec(pi + 1, high);
    }
  };

  await quickSortRec(0, array.length - 1);
  renderArray(array);
}

export async function selectionSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    if (!isSorting) {
      return;
    }

    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    const temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
    renderArray(array);
    await sleep(animationSpeed);
  }
  renderArray(array);
}

export async function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    if (!isSorting) {
      return;
    }

    const key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      renderArray(array);
      await sleep(animationSpeed);
      j--;
    }

    array[j + 1] = key;
    renderArray(array);
    await sleep(animationSpeed);
  }
  renderArray(array);
}

export function renderArray(array) {
  const arrayContainer = document.querySelector('.array-container');
  arrayContainer.innerHTML = '';
  array.forEach((value) => {
    const bar = document.createElement('div');
    bar.className = 'array-bar';
    bar.style.height = value * 2 + 'px';
    arrayContainer.appendChild(bar);
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
