/**
 * Created by peter on 2018/11/20.
 */
/*
 * 简单算法*/

/* todo 771. 宝石与石头
 给定字符串J 代表石头中宝石的类型，和字符串 S代表你拥有的石头。 S 中每个字符代表了一种你拥有的石头的类型，你想知道你拥有的石头中有多少是宝石。
 J 中的字母不重复，J 和 S中的所有字符都是字母。字母区分大小写，因此"a"和"A"是不同类型的石头。
 */
/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
/*var numJewelsInStones = function (J, S) {
 var num = 0;
 for (var i = 0; i < J.length; i++) {
 var reg = new RegExp(J.charAt(i), 'g');
 console.log(reg+' '+S.match(reg))
 if(S.match(reg)){
 num += (S.match(reg)).length
 }
 }
 return num;
 };
 console.log(

 numJewelsInStones("z", "ZZ")
 )*/

/*todo 665. 非递减数列
 * 给定一个长度为 n 的整数数组，你的任务是判断在最多改变 1 个元素的情况下，该数组能否变成一个非递减数列。

 我们是这样定义一个非递减数列的： 对于数组中所有的 i (1 <= i < n)，满足 array[i] <= array[i + 1]。
 */
//todo 不会了
/*
var checkPossibility = function (nums) {
    let isNotReduce = function (arr) {
        // debugger;
        let result = false;
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length - i - 1; j++) {
                debugger;
                if (arr[i] <= arr[j]) {
                    result = true;
                } else {
                    result = false;
                }
            }
        }
        return result;
    }
    return isNotReduce(nums)
};
console.log(
    checkPossibility([1, 2, 1])
)*/
