function ArrayList(){
	var array = [];
     
    //私有函数，只能用在ArrayList（）内部
    var swap = function(index1, index2){
		var temp = array[index1];
    	array[index1] = array[index2];
    	array[index2] = temp;
    };

	this.insert = function(item){
		array.push(item);
	};
	this.toString = function(){
		return array.join();
	};

	//冒泡排序O(n*n) (V)
	this.bubbleSort = function(){
	    var length = array.length;   //这里要用array.length 不能用this.length
	    for(var i=0; i<length; i++){
	    	for(var j=0; j<length-1-i; j++){   //j<lengtth-1-i
	    		if(array[j]>array[j+1]){
	    			swap(j, j+1);
	    		}
	    	}
	    }
	};

	//选择排序
	this.selectionSort = function(){
		var length = array.length;
		var indexMin;  //定义一个当前最小值
		for(var i=0; i<length; i++){  //假定当前值为最小值
			indexMin = i; 
			for(var j=i; j<length; j++){
				if(array[indexMin]>array[j]){
					indexMin = j;
				}
			}
			if(i !== indexMin){  //如果该最小值和原最小值不同（行{7}），则交换其值
				swap(i, indexMin);
			}
		}
	};

	//插入排序
	this.insertionSort = function(){
	    var length = array.length;
	    var j, temp;
	    for(var i=1; i<length; i++){
	    	j = i;  
	    	temp = array[i];
	    	while(j>0 && array[j-1]>temp){   //数组的第一个索引是0且数组中前面的值比待比较值的值大
	    		array[j] = array[j-1];
	    		j--;
	    	}
	    	array[j] = temp;
	    }
	};

	//归并排序（二分排序）O(nlog^n)
	// 将原始数组分割直至只有一个元素的子数组，然后开始归并。归并过程也会完成排序，直至原始数组完全合并并完成排序
	this.mergeSort = function(){
	    array = mergeSortRec(array);
	};
    //用于归并
    var mergeSortRec = function(array){
        var length = array.length;
        if(length === 1){
            return array;
        }
        var mid = Math.floor(length / 2);
        var left = array.slice(0, mid);
        var right = array.slice(mid, length);
        return merge(mergeSortRec(left), mergeSortRec(right));
    };
    var merge = function(left, right){
        var result = [];
        var il = 0,
            ir = 0;
        while(il < left.length && ir < right.length){
            if(left[il] < right[ir]){
                result.push(left[il++]);
            }else{
                result.push(right[ir++]);
            }
        }
        while(il < left.length){
            result.push(left[il++]);
        }
        while(ir < right.length){
            result.push(right[ir++])
        }
        return result;    //返回一个数组，接口
    };


	//快速排序
	this.quickSort = function(){
        quick(array, 0, array.length-1);
	};
	//用于快速排序
	var swapQuickSort = function(array, index1, index2){
	    var aux = array[index1];
	    array[index1] = array[index2];
	    array[index2] = aux;
	};
	var partition = function(array, left, right){
	    var pivot = array[Math.floor((right+left)/2)],
	        i = left,
	        j = right;
	    while(i<=j){
	        while(array[i]<pivot){
	            i++;
	        }
	        while(array[j]>pivot){
	            j--;
	        }
	        if(i<=j){
	            swapQuickSort(array, i, j);
	            i++;
	            j--;
	        }
	    }
	    return i;
	};
	var quick = function(array, left, right){
	    var index;
	    if(array.length > 1){
	        index = partition(array, left, right);
	        if(left < index-1){
	            quick(array, left, index-1);
	        }
	        if(index < right){
	            quick(array, index, right);
	        }
	    }
	};


	// 搜索
	//顺序搜索
	this.sequentialSearch = function(item){
		for(var i=0; i<array.length; i++){
			if(item == array[i]){
				return i;
			}else{
				return false; //return -1;  or   return null;
			}
		}
	};

	//二分搜索
	this.binarySearch = function(item){
		this.quickSort();

		var low = 0,
		    high = array.length - 1;
		var element, mid;
		while(low<=high){
			mid = Math.floor((low+high)/2);
			element = array[mid];
			if(element < item){
				low = mid + 1;
			}else if(element > item){
				high = mid -1;
			}else{
				return mid;
			}
		}
		return -1;
	}

}

function createArray(size){
	var array = new ArrayList();
	for(var i=size; i>0; i--){
		array.insert(i);
	}
	return array;
}

window.onload = function () {
    var arr1 = createArray(5);
    console.log(arr1.toString());
    arr1.bubbleSort();
    console.log(arr1.toString());

    // var arr2 = createArray(5);
    // arr2.selectionSort();
    // console.log(arr2.toString());

    // var arr3 = createArray(5);
    // arr3.insertionSort();
    // console.log(arr3.toString());

    // var arr4 = createArray(5);
    // arr4.mergeSort();
    // console.log(arr4.toString());

    // var arr5 = createArray(5);
    // arr5.quickSort();
    // console.log(arr5.toString());
    // console.log(arr5.binarySearch(2));
    // console.log(arr5.toString());
};





