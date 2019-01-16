/**
 * Created by peter on 2019/1/9.
 */
var socket = io.connect('/');//连接聊天室的io服务器 /是跟地址

var text = document.getElementById('text');
var chatBox = document.getElementById('chatBox');
var sendBtn = document.getElementById('send');
var chatContent = document.getElementById('chatContent')
var keyEnter = document.querySelector('#chatBox');
let chatObj = {
    userId: '',
    headImg: '',
    wordArr: ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
    bg: '',
    word: '',
    lastDate: null,
    isShowTime: true,
    isInput: false, // 是否输入状态
    basic () { // 默认值
        // 当前id
        let userIdStorage =localStorage.getItem('userId')
        if (userIdStorage) {
            this.userId = userIdStorage
        }else{
            this.userId = Math.random().toString()
            localStorage.setItem('userId',this.userId)
        }
//            this.headImg = parseInt(Math.random()*2)+1
        // 当前头像背景
        let bgStorage =localStorage.getItem('bg')
        if (bgStorage) {
            this.bg = bgStorage;
        }else{
            this.bg = this.bgColor(500, 555, 555, .8);
            localStorage.setItem('bg',this.bg)
        }
        // 当前头像文字
        let wordStorage =localStorage.getItem('word')
        if (wordStorage) {
            this.word = wordStorage;
        }else{
            this.word = this.wordArr[parseInt(Math.random() * 12)];
            localStorage.setItem('word',this.word)
        }
        this.lastDate = new Date()
        localStorage.setItem('lastDate',this.lastDate.getTime())
        console.log(this.word)
    },
    init () { // 初始化
        this.basic()
        this.history()
        this.send()
        this.btnClick()
        this.accept()
    },
    history () { // 读取历史消息
        let mes = localStorage.getItem('mes')
        let html = ''
        let timeHtml = ''
        let item = ''
        let cla = 'chatLeft' // 默认样式
        if (!mes) return
        mes = JSON.parse(mes)
        for(let i=0;i<mes.length;i++){
            item = JSON.parse(mes[i])
            if(item.userId == this.userId) {
                cla = 'chatRight'
            } else {
                cla = 'chatLeft'
            }
            if(item.isShowTime){
                timeHtml = '<div class="time">' +
                    '<span>'+item.time+'</span>' +
                    '</div>'
            }else{
                timeHtml = ''
            }
            html += timeHtml+'<div class="chat '+cla+'">' +
                '<span style="background:' + item.bg + '">' +
                item.word +
                '</span>' +
                '<p>' + item.text +
                '</p>' +
                '</div>'
        }
        chatContent.innerHTML=html;
        chatContent.scrollTop = chatContent.scrollHeight
    },
    bgColor (r, g, b, a) { // 随机生成颜色
        return 'rgba(' + parseInt(Math.random() * r) + ',' + parseInt(Math.random() * g) + ',' + parseInt(Math.random() * b) + ',' + a + ')'
    },
    time () {
        var date = new Date();
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var hours = date.getHours()
        var day = date.getDate()
            minutes = date.getMinutes();
        return month + '-' + day +' ' + this.timeFormat(hours) + ':' + this.timeFormat(minutes);
    },
    timeFormat (n) {
        return n < 10 ? '0' + n : n;
    },
    send () { // 发送消息
        let me = this
        document.addEventListener('keyup', function (e) {
            e = e || window.event;
            /*let nowDate = new Date()
            let TDOA = nowDate - me.lastDate
            me.isShowTime = (TDOA > 1000 * 60 * 10) ? true : false*/
            var e = event || window.event;
            if (chatBox.value) {
                me.isInput = true
            } else {
                me.isInput = false
            }
            var obj = {
                text: '输入中...',
                userId: me.userId,
                bg: me.bg,
                word: me.word,
                isInput: me.isInput,
                sending: true,
                isShowTime: false,
                headImg: me.headImg
            }
            if (!obj) {
                return;
            }
            socket.send(obj)
        })
        document.addEventListener('keydown', function (e) {
            e = e || window.event;
            var keyCode = e.keyCode || e.which || e.charCode;
            var ctrlKey = e.ctrlKey || e.metaKey;
            if (ctrlKey && keyCode == 13) {
                var str = keyEnter.value;
                keyEnter.value = str + "\n"
            } else if (keyCode == 13) {
                e.preventDefault();
                // e.cancelBubble=true;
                // e.stopPropagation();
                sendBtn.click()
            }
        })
    },
    btnClick () {
        let me = this;
        sendBtn.onclick = function () {
            if (chatBox == document.activeElement) {
                // alert('获取焦点');
            } else {
                chatBox.focus()
            }
            if (!chatBox.value) return
            if (!chatBox.value.trim()) return
            let lastDate = localStorage.getItem('lastDate')
            let nowDate = new Date()
            let TDOA = 0 // 时间差
            if (lastDate){
                TDOA = nowDate.getTime() - parseInt(lastDate)
                me.isShowTime = (TDOA > 1000 * 60*10) ? true : false
            }else{
                me.isShowTime = true
            }
            if(me.isShowTime){
                var time = me.time()
            }
            console.log(TDOA)
            me.isInput = false;
            var obj = {
                text: chatBox.value,
                userId: me.userId,
                bg: me.bg,
                word: me.word,
                isInput: false,
                sending: false,
                isShowTime: me.isShowTime,
                time: time,
                headImg: me.headImg
            }
            socket.send(obj)//发消息
            chatBox.value = '';
            me.lastDate = new Date()
            localStorage.setItem('lastDate',me.lastDate.getTime())
        }
    },
    accept () { // 接受消息
        let me = this
        var arr = []
        let arrMes = localStorage.getItem('mes') // 缓存中的内容
        if (arrMes){
            arr = JSON.parse(arrMes)
        }
        socket.on('message', function (mes) {
            var text = mes.text
            text = text.replace('\n','<br />')
            if (text != '输入中...') {
                arr.push(JSON.stringify(mes))
                localStorage.setItem('mes',JSON.stringify(arr)) // 存取
            }
            var div = document.createElement('div')
            var divTime = document.createElement('div')
            divTime.className = 'time';
            div.className = 'chat chatLeft';
            // 先删除掉 类是sending的元素
            document.querySelector('.sending') && (chatContent.removeChild(document.querySelector('.sending')))
            if (mes.sending) { // 判断发送的状态
                div.className = 'chat sending chatLeft';
            }
            if (mes.isShowTime) { // 显示时间
                divTime.innerHTML = '<span>' + mes.time + '</span>'
                chatContent.appendChild(divTime)
            }
            var html = ''
            if (me.userId != mes.userId) { // 别人发给我的
                let notPadding='' // 输入中的样式
                if (text == '输入中...') {
                    text = '<img  src="images/dot2.gif" alt="">' // 输入中动图
                    notPadding = 'class="notPadding"'
                }
                html =
                    '<span style="background:' + mes.bg + '">' +
                    mes.word +
//            '<img src="images/via'+mes.headImg+'.jpg" alt="">' +
                    '</span>' +
                    '<p '+notPadding+'>' + text +
                    '</p>'
            }
            if (me.userId == mes.userId && !mes.sending) { // 我发给别人的
                div.className = 'chat chatRight';
                html =
                    '<span style="background:' + mes.bg + '">' +
                    mes.word +
//                '<img src="images/via'+mes.headImg+'.jpg" alt="">' +
                    '</span>' +
                    '<p>' + text +
                    '</p>'
            }
            div.innerHTML = html
            chatContent.appendChild(div)
            chatContent.scrollTop = chatContent.scrollHeight // 滚动条始终在底部
           /* me.lastDate = new Date()
            localStorage.setItem('lastDate',me.lastDate.getTime())*/
            if (!mes.isInput && document.querySelector('.sending')) {
                (chatContent.removeChild(document.querySelector('.sending')))
            }
        });//
    }

}
chatObj.init()
