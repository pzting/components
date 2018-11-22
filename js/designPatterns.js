/*todo js的一些设计模式*/
//https://juejin.im/post/59df4f74f265da430f311909
/*TODO 1.单例模式

单例模式的定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点。实现的方法为先判断实例存在与否，如果存在则直接返回，如果不存在就创建了再返回，这就确保了一个类只有一个实例对象。

适用场景：一个单一对象。比如：弹窗，无论点击多少次，弹窗只应该被创建一次。

*/
/*
class CreateUser {
    constructor(name) {
        this.name = name;
        this.getName();
    }

    getName() {
        return this.name;
    }
}

// 代理实现单例模式
var ProxyMode = (function () {
    var instance = null;
    return function (name) {
        if (!instance) {
            instance = new CreateUser(name);
        }
        return instance;
    }
})();
// 测试单体模式的实例
var a = new ProxyMode("aaa");
var b = new ProxyMode("bbb");
// 因为单体模式是只实例化一次，所以下面的实例是相等的
console.log(a === b);    //true
*/
/*TODO 2.策略模式
策略模式的定义：定义一系列的算法，把他们一个个封装起来，并且使他们可以相互替换。

策略模式的目的就是将算法的使用算法的实现分离开来。
一个基于策略模式的程序至少由两部分组成。第一个部分是一组策略类（可变），策略类封装了具体的算法，并负责具体的计算过程。第二个部分是环境类Context（不变），Context接受客户的请求，随后将请求委托给某一个策略类。要做到这一点，说明Context中要维持对某个策略对象的引用。
*/
/*//!*策略类*
var levelOBJ = {
    "A": function(money) {
        return money * 4;
    },
    "B" : function(money) {
        return money * 3;
    },
    "C" : function(money) {
        return money * 2;
    }
};
//!*环境类*
var calculateBouns =function(level,money) {
    return levelOBJ[level](money);
};
console.log(calculateBouns('A',10000)); // 40000
*/
/*todo 3.代理模式

代理模式的定义：为一个对象提供一个代用品或占位符，以便控制对它的访问。

常用的虚拟代理形式：某一个花销很大的操作，可以通过虚拟代理的方式延迟到这种需要它的时候才去创建（例：使用虚拟代理实现图片懒加载）
图片懒加载的方式：先通过一张loading图占位，然后通过异步的方式加载图片，等图片加载好了再把完成的图片加载到img标签里面。
*/
/*var imgFunc = (function () {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    return {
        setSrc: function (src) {
            imgNode.src = src;
        }
    }
})();
var proxyImage = (function () {
    var img = new Image();
    img.onload = function () {
        imgFunc.setSrc(this.src);
    }
    return {
        setSrc: function (src) {
            imgFunc.setSrc('./loading,gif');
            img.src = src;
        }
    }
})();
proxyImage.setSrc('./pic.png');*/
