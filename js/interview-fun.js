/*todo 前端的一些函数题*/

/*todo 实现一个函数，判断输入是不是回文字符串。*/
/*
function run(input) {
    if (typeof input !== 'string') return false;
    return input.split('').reverse().join('') === input;
}*/
/*todo 实现效果，点击容器内的图标，图标边框变成border 1px solid red，点击空白处重置。*/
/* todo 自己写的
let icon = document.getElementsByClassName('icon')[0]
icon.onclick= function (e) {
    e.stopPropagation();
    let target = e.target;
    !target.classList.contains('on')&&target.classList.add('on')
}
let doc = document;
doc.onclick = function (e) {
    let target = e.target;
    if(target.nodeName != 'SPAN'){
        icon.classList.contains('on')&&icon.classList.remove('on')
    }
}*/
/*TODO 别人的
* const box = document.getElementById('box');
function isIcon(target) {
  return target.className.includes('icon');
}

box.onclick = function(e) {
  e.stopPropagation();
  const target = e.target;
  if (isIcon(target)) {
    target.style.border = '1px solid red';
  }
}
const doc = document;
doc.onclick = function(e) {
  const children = box.children;
  for(let i = 0; i < children.length; i++) {
    if (isIcon(children[i])) {
      children[i].style.border = 'none';
    }
  }
}*/

/*todo 请简单实现双向数据绑定mvvm。
* const data = {};
const input = document.getElementById('input');
Object.defineProperty(data, 'text', {
  set(value) {
    input.value = value;
    this.value = value;
  }
});
input.onChange = function(e) {
  data.text = e.target.value;
}*/
/* todo 实现Storage，使得该对象为单例，并对localStorage进行封装设置值setItem(key,value)和getItem(key)
* var instance = null;
class Storage {
  static getInstance() {
    if (!instance) {
      instance = new Storage();
    }
    return this.instance;
  }
  setItem = (key, value) => localStorage.setItem(key, value),
  getItem = key => localStorage.getItem(key)
}*/
/*todo JSX做表达式判断时候，需要强转为boolean类型，所以，!!(a)的作用是将a强制转换为布尔型（boolean）。
* render() {
  const b = 0;
  return <div>
    {
      !!b && <div>这是一段文本</div>
    }
  </div>
}
*/