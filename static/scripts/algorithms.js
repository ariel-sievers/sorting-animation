let play = false;
var recursiveCalls = 0;

class Algorithms {

    static quick(elements, ascending = true) {
        recursiveCalls = 0;

        quickSort(elements, 0, elements.length - 1, ascending);
    }

    static heap(elements, ascending = true) {
        heapSort(elements, ascending);
    }

    static bubble(elements, ascending = true) {
        bubbleSort(elements, ascending);
    }

    static insertion(elements, ascending = true) {
        insertionSort(elements, ascending);
    }

    static selection(elements, ascending = true) {
        selectionSort(elements, ascending);
    }

    static merge(elements, ascending = true) {
        recursiveCalls = 0;

        mergeSort(elements, 0, elements.length - 1, ascending);
    }

}

/***********************
    QUICK SORT
 ***********************/

async function quickSort(elements, low, high, ascending = true) {
    recursiveCalls++;

    if (low < high) {
        partitionIndex = await partition(elements, low, high, ascending);

        await quickSort(elements, low, partitionIndex - 1, ascending);
        await quickSort(elements, partitionIndex + 1, high, ascending);
    }

    if (--recursiveCalls == 0) {
        resetHighlights();
        pause();
    }

}

async function partition(elements, low, high, ascending = true) {
    const pivot = elements[high].offsetHeight;
    const container = elements[0].parentElement;

    // partition around pivot
    i = low - 1;
    for (j = low; j < high; j++) {
        await highlight(container, i + 1, j);

        if ((ascending && elements[j].offsetHeight < pivot)
            || (!ascending && elements[j].offsetHeight > pivot)) {

            await insert(j, ++i, container);
        }
    }

    await highlight(container, i + 1, j);
    await insert(high, ++i, container);

    return i;
}

/***********************
    HEAP SORT
 ***********************/

async function heapSort(elements, ascending = true) {
    const size = elements.length;
    const container = elements[0].parentElement;

    // build heap (rearrange the array)
    for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
        await heapify(elements, i, size, ascending);
    }

    for (let i = size - 1; i >= 0; i--) {
        // current root is stored at end
        await swap(0, i, container);

        // continue with reduced heap size
        await heapify(elements, 0, i, ascending);
    }

    resetHighlights();
    pause();
}

async function heapify(elements, rootIndex, size, ascending = true) {
    const container = elements[0].parentElement;

    let leftIndex = 2 * rootIndex + 1;
    let rightIndex = 2 * rootIndex + 2;

    if (leftIndex >= size) return;

    let newIndex = leftIndex;
    if (rightIndex < size) {
        if ((ascending && elements[leftIndex].offsetHeight <= elements[rightIndex].offsetHeight)
            || (!ascending && elements[leftIndex].offsetHeight > elements[rightIndex].offsetHeight)) {

            newIndex = rightIndex;
        }
    }

    await highlight(container, rootIndex, newIndex);

    if ((ascending && elements[rootIndex].offsetHeight < elements[newIndex].offsetHeight)
        || (!ascending && elements[rootIndex].offsetHeight > elements[newIndex].offsetHeight)) {

        await swap(rootIndex, newIndex, container);
        await heapify(elements, newIndex, size, ascending);
    }
}

/***********************
    BUBBLE SORT
 ***********************/

async function bubbleSort(elements, ascending = true) {
    const container = elements[0].parentElement;

    for (let i = 0; i < elements.length - 1; i++) {
        for (let j = 0; j < elements.length - i - 1; j++) {
            await highlight(container, j, j + 1);

            if ((ascending && elements[j].offsetHeight > elements[j + 1].offsetHeight)
                || (!ascending && elements[j].offsetHeight < elements[j + 1].offsetHeight)) {

                await swap(j, j + 1, container);
            }
        }
    }

    resetHighlights();
    pause();
}

/***********************
    INSERTION SORT
 ***********************/

async function insertionSort(elements, ascending = true) {
    const container = elements[0].parentElement;

    for (let i = 1; i < elements.length; i++) {
        let j = i - 1;

        await highlight(container, i, j);

        // check previous elements
        while (j >= 0 && 
            (ascending && elements[j].offsetHeight > elements[i].offsetHeight)
            || (!ascending && elements[j].offsetHeight < elements[i].offsetHeight)) {

            await highlight(container, i, j);
            j--;
        }
        await insert(i, j + 1, container);
    }

    resetHighlights();
    pause();
}

/***********************
    SELECTION SORT
 ***********************/

async function selectionSort(elements, ascending = true) {
    const container = elements[0].parentElement;

    let next = 0, target = 0;
    while (next < elements.length - 1) {
        target = next;

        // find min/max between elements [next..n]
        for (let i = next + 1; i < elements.length; i++) {
            await highlight(container, next, i);

            if ((ascending && elements[i].offsetHeight < elements[target].offsetHeight)
                || (!ascending && elements[i].offsetHeight > elements[target].offsetHeight)) {

                target = i;
            }
        }
        await highlight(container, next, target);

        // swap target element with the one stored at the next pointer
        if (next != target) {
            await swap(next, target, container);
        }
        next++;
    }

    resetHighlights();
    pause();
}

/***********************
    MERGE SORT
 ***********************/

async function mergeSort(elements, left, right, ascending = true) {
    if (left >= right) return;

    recursiveCalls++;

    let middle = left + Math.floor((right - left) / 2);

    await mergeSort(elements, left, middle, ascending);
    await mergeSort(elements, middle + 1, right, ascending);

    middle++;
    await merge(elements, left, middle, right, ascending);

    if (--recursiveCalls == 0) {
        resetHighlights();
        pause();
    }
}

async function merge(elements, left, middle, right, ascending = true) {
    const container = elements[0].parentElement;

    while (left <= middle && middle <= right) {
        await highlight(container, left, middle);

        if ((ascending && elements[left].offsetHeight > elements[middle].offsetHeight)
            || (!ascending && elements[left].offsetHeight < elements[middle].offsetHeight)) {
                
            await insert(middle, left, container);
            middle++;
        }
        left++;
    }
}

