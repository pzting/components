/*
* 经典的几个算法
* */

/*todo 快速排序(从小到大)*/
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    var index = Math.floor(arr.length / 2);
    var value = arr.splice(index, 1)[0];
    var left = [], right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < value) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat(value, quickSort(right));
}

console.log(quickSort([9, 6, 7, 8, 3, 2, 5, 4])); // [2, 3, 4, 5, 6, 7, 8, 9]

/*todo 选择排序*/
function selectSort(arr) {
    var minIndex, tmp;
    for (var i = 0; i < arr.length - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        tmp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = tmp;
    }
    return arr;
}

console.log(selectSort([9, 6, 7, 8, 3, 2, 5, 4])); //[2, 3, 4, 5, 6, 7, 8, 9]

/**/