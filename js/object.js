/*TODO 对象的一些东西*/
/*TODO JavaScript 的对象继承方式，有几种写法*/
//todo 对象冒充
/*
其原理如下：构造函数使用 this 关键字给所有属性和方法赋值（即采用类声明的构造函数方式）。因为构造函数只是一个函数，所以可使 Parent 构造函数 成为 Children 的方法，然后调用它。Children 就会收到 Parent 的构造函数中定义的属性和方法。例如，用下面的方式定义 Parent 和 Children：
* 原理：就是把 Parent 构造函数放到 Children 构造函数里面执行一次。那为什么不直接执行，非要转个弯把 Parent 赋值给 Children 的 method 属性再执行呢？ 这跟 this 的指向有关，在函数内 this 是指向 window 的。当将 Parent 赋值给 Children 的 method 时, this 就指向了 Children 类的实例*/
/*var Parent = function (name) {
    this.name = name;
    this.sayHi = function () {
        console.log('Hi! ' + this.name + '.')
    }
}

var Children = function (name) {
    this.method = Parent;
    this.method(name);
    delete this.method;
    this.getName = function () {
        console.log(this.name);
    }
}

var p = new Parent('john');
var c = new Children('joe');

p.sayHi();
c.sayHi();
c.getName();*/
//todo 原型链继承
/*
* 众所周知，JavaScript 是一门基于原型的语言，在 JavaScript 中 prototype 对象的任何属性和方法都被传递给那个类的所有实例。原型链利用这种功能来实现继承机制：
*注意：调用 Parent 的构造函数，没有给它传递参数。这在原型链中是标准做法。要确保构造函数没有任何参数。
* */
/*var Parent = function () {
    this.name = 'john';
    this.sayHi = function () {
        console.log('Hi! '+this.name+'。')
    }
}

var Children = function () {

}

Children.prototype = new Parent();
var p = new Parent();
var c = new Children();
p.sayHi();
c.sayHi();*/
//todo 使用 call 或 applay 方法
/*
* 这个方法是与对象冒充方法最相似的方法，因为它也是通过改变了 this 的指向而实现继承:
* apply 方法本人就不举列了，它和 call 方法的区别在于它的第二个参数必须是数组。
* */
/*var Parent = function (name){
    this.name = name;
    this.sayHi = function () {
        console.log('Hi!'+this.name+'。');
    }
}

var Children = function (name) {
    Parent.call(this,name);
    this.getName = function () {
        console.log(this.name);
    }
}
var p = new Parent('john')
var c = new Children('joe')
p.sayHi();
c.sayHi()
c.getName()*/
//todo 混合方式
/*
* 对象冒充的主要问题是必须使用构造函数方式，这不是最好的选择。不过如果使用原型链，就无法使用带参数的构造函数了。如何选择呢？答案很简单，两者都用。 在 JavaScript 中创建类的最好方式是用构造函数定义属性，用原型定义方法。这种方式同样适用于继承机制：
* */
/*var Parent = function (name){
    this.name = name;
}
Parent.prototype.sayHi = function (name){
    console.log('Hi!'+this.name+'。');
}
var Children = function (name,age) {
    Parent.call(this,name);
    this.age = age;
}
Children.prototype = new Parent();
Children.prototype.getAge = function () {
    console.log(this.age)
}
var p = new Parent('john');
var c = new Children('joe',30);
p.sayHi();
c.sayHi();
c.getAge();*/
//todo 使用 Object.create 方法
/*
* Object.create 方法会使用指定的原型对象及其属性去创建一个新的对象:
*@ 当执行 Children.prototype = Object.create(Parent.prototype) 这个语句后，Children 的 constructor 就被改变为 Parent ,因此需要将 Children.prototype.constructor 重 新指定为 Children 自身。
* */
/*var Parent = function (name) {
    this.name = name;
}
Parent.prototype.sayHi = function (name) {
    console.log('Hi!' + this.name + '。');
}
var Children = function (name, age) {
    Parent.call(this, name);
    this.age = age;
}
Children.prototype = Object.create(Parent.prototype);
Children.prototype.constructor = Children;
Children.prototype.getAge = function () {
    console.log(this.age)
}
var p = new Parent('john');
var c = new Children('joe', 30);
p.sayHi();
c.sayHi();
c.getAge();*/
//todo extends 关键字实现继承
/*
*这个是 ES6 的语法糖，下面看下es6实现继承的方法：
* 上面代码中，子类的constructor方法没有调用super之前，就使用this关键字，结果报错，而放在super方法之后就是正确的。子类Children的构造函数之中的super()，代表调用父类Parent的构造函数。这是必须的，否则 JavaScript 引擎会报错。

注意，super虽然代表了父类Parent的构造函数，但是返回的是子类Children的实例，即super内部的this指的是Children，因此super()在这里相当于Parent.prototype.constructor.call(this)。
* */
class Parent {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

class Children extends Parent {
    constructor(name, age, job) {
        this.job = job;
        super(nam, age)
        this.job = job;
    }
}




















