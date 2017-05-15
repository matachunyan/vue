/**
 * Created by admin on 2017/5/15.
 */
import Vue from 'vue'

var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todoList: []
    },
    created: function(){
        // onbeforeunload文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onbeforeunload当窗口即将被卸载时,会触发该事件
        window.onbeforeunload = ()=>{
            let dataString = JSON.stringify(this.todoList) // 返回与指定值相对应的一个JSON字符串，可选地仅包含某些属性或以用户定义的方式替换属性值JSON 文档: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON
            window.localStorage.setItem('myTodos', dataString) /* Storage.setItem() 方法往里面添加一个数据项。 看文档https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage*/
        }

        let oldDataString = window.localStorage.getItem('myTodos')
        let oldData = JSON.parse(oldDataString)
        this.todoList = oldData || []

    },
    methods: {
        addTodo: function () {
            this.todoList.push({
                title: this.newTodo,
                createdAt: new Date(),
                done: false // 添加一个 done 属性
            })
            this.newTodo = ''//清空框中项
            console.log(this.todoList)
        },
        // 在每一项后面添加一个删除按钮
        //点击按钮则从 data.todoList 中删除该项
        removeTodo: function (todo) {
            let index = this.todoList.indexOf(todo) // Array.prototype.indexOf 是 ES 5 新加的 API
            this.todoList.splice(index, 1) // 将index项单独删除
        }
    }
})