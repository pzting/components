/**
 * Created by peter on 2019/1/9.
 */
var socket = io.connect('/');//连接聊天室的io服务器 /是跟地址

var text = document.getElementById('text');
var chatBox = document.getElementById('chatBox');
var btn = document.getElementById('btn');
var chatContent = document.getElementById('chatContent');
let chatObj = {
    userId: '',
    headImg: '',
    wordArr: ['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'],
    bg: '',
    word: '',
    lastDate: null,
    isShowTime: true,
    isInput: false, // 是否输入状态
    basic () { // 默认值
        this.userId = Math.random().toString()
//            this.headImg = parseInt(Math.random()*2)+1
        this.bg = this.bgColor(255,255,255,.8);
        this.word = this.wordArr[parseInt(Math.random()*12)]
        console.log(this.word)
    },
    init () { // 初始化
        this.basic()
        this.send()
        this.accept()
    },
    bgColor (r,g,b,a) { // 随机生成颜色
        return 'rgba('+parseInt(Math.random()*r)+','+parseInt(Math.random()*g)+','+parseInt(Math.random()*b)+','+a+')'
    },
    time () {
        var date = new Date();
        var year = date.getFullYear()
        var month = date.getMonth()+1
        var hours = date.getHours(),
            minutes = date.getMinutes();
        return year+'-'+month+' '+this.timeFormat(hours)+ ':'+this.timeFormat(minutes);
    },
    timeFormat (n) {
        return n<10?'0'+n:n;
    },
    send () { // 发送消息
        let me = this
        document.onkeydown = function (event) {
            let nowDate = new Date()
            let TDOA = nowDate-me.lastDate
            me.isShowTime = (TDOA>1000*60*10) ? true : false
            var e = event || window.event;
            var obj ={
                text: '发送中...',
                userId: me.userId,
                bg: me.bg,
                word: me.word,
                isInput: true,
                sending: true,
                isShowTime: me.isShowTime,
                headImg: me.headImg
            }
            if (!obj) {
                return;
            }
            socket.send(obj)
            /*if (!me.isInput){
                socket.send(obj)
                me.isInput = true
            }*/
            if (e && e.keyCode == 13) { //回车键的键值为13
                me.isInput = false;
                var obj ={
                    text: chatBox.value,
                    userId: me.userId,
                    bg: me.bg,
                    word: me.word,
                    isInput: false,
                    sending: false,
                    isShowTime: me.isShowTime,
                    headImg: me.headImg
                }
                socket.send(obj)//发消息
                chatBox.value = '';
            }
        };
    },
    accept () { // 接受消息
        let me = this
        socket.on('message', function (mes) {
            var text = mes.text
            var div = document.createElement('div')
            var divTime = document.createElement('div')
            divTime.className = 'time';
            div.className = 'chat chatLeft';
            // 先删除掉 类是sending的元素
            document.querySelector('.sending') && (chatContent.removeChild(document.querySelector('.sending')))
            if (mes.sending){ // 判断发送的状态
                div.className = 'chat sending chatLeft';
            }
            if(mes.isShowTime){
                divTime.innerHTML = '<span>'+me.time()+'</span>'
                chatContent.appendChild(divTime)
            }
            var html = ''
            if (me.userId != mes.userId){ // 别人发给我的
                html =
                    '<span style="background:'+mes.bg+'">' +
                    mes.word+
//            '<img src="images/via'+mes.headImg+'.jpg" alt="">' +
                    '</span>' +
                    '<p>' + text +
                    '</p>'
            }
            if (me.userId == mes.userId && !mes.sending) { // 我发给别人的
                div.className = 'chat chatRight';
                html =
                    '<span style="background:'+mes.bg+'">' +
                    mes.word+
//                '<img src="images/via'+mes.headImg+'.jpg" alt="">' +
                    '</span>' +
                    '<p>' +text +
                    '</p>'
            }
            div.innerHTML = html
            chatContent.appendChild(div)
            chatContent.scrollTop = chatContent.scrollHeight // 滚动条始终在底部
            me.lastDate = new Date()
            /*if (mes.isInput){
                var len = document.getElementsByClassName('chat').length
                chatContent.removeChild(document.getElementsByClassName('chat')[len-1])
            }*/
        });//
    }

}
chatObj.init()