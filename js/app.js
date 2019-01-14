;(function (window) {
	const todos = [
		{
			id: 1,
			title: '吃饭',
			completed: true
		}, {
			id: 2,
			title: '上课',
			completed: false
		}, {
			id: 3,
			title: '打游戏',
			completed: false
		}
	]

	new Vue({
		data: {
			todos,
			currentEditing: null
		},
		methods: {
			handleNewTodoKeyDown(e) {
				// 0. 注册按下的回车事件
				// 1. 获取文本框的内容
				// 2. 数据检验
				// 3. 添加到todos列表中
				// console.log(this.todoText)
				// console.log(e.target)
				// const value = e.target.value.trim()
				const target = e.target
				const value = target.value.trim()
				if (!value.length) {
					return
				}
				this.todos.push({
					id: todos.length ? todos[todos.length - 1].id + 1 : 1,
					title: value,
					completed: false
				})

				target.value = ''
			},

			handleToggleAllChange(e) {
				// 0. 绑定 checkbox 的change事件
				// 1. 获取checkbox 的选中状态
				// 2. 直接循环所有的子任务项的选中状态
				const checked = e.target.checked
				this.todos.forEach(item => {
					item.completed = checked
				})
			},
			// 		当事件处理函数没有传参的时候，第一个参数就是默认的事件源对象：event
			// 当手动传递了参数的时候，就没办法获取默认的 event 事件源对象
			// 这个时候我们可以手动在调用方法的时候传递 $event 来接收 event 事件源对象
			handleRemoveTodoClick(index) {
				this.todos.splice(index, 1)
			},

			handleGetEditingDblclick(todo) {
				// 把这个变量等于当前双击的todo
				this.currentEditing = todo
				console.log(this.currentEditing)
			},

			handleSaveEditKeyDown(todo, index, e) {
				// 0. 注册绑定事件处理函数
				// 1. 获取编辑文本的数据
				// 2. 数据检验
				//  如果数据是空的，则直接删除该元素
				//  否则保存编辑
				const target = e.target
				const value = target.value.trim()

				// 数据被编辑为空了，直接删除
				if (!value.length) {
					this.todos.splice(index, 1)
				} else {
					todo.title = value
					this.currentEditing = null
				}


			},

			handleCancelEditEsc() {
				// 1. 把样式去除
				this.currentEditing = null
			},

			handleClearAllDoneClick() {
				// 不要在forEach 循环遍历中删除数组元素，会导致索引错乱，错误的写法
				// this.todos.forEach((item, index) => {
				// 	if (item.completed) {
				// 		this.todos.splice(index, 1)
				// 	}
				// })

				// 手动控制遍历索引的方式
				// for (var i = 0; i < this.todos.length; i++) {
				// 	if (this.todos[i].completed) {
				// 		this.todos.splice(i, 1)
				// 		// 删除元素之后，让我们遍历的这个 小索引 往后倒退一次，
				// 		    // 因为你删除之后，后面的所有元素的索引都会倒退一次
				// 		    // 纠正索引的遍历
				// 		i--
				// 	}
				// }

				// 过滤结果的方式
				// 我们这里还有一种办法也很简单
				// 我们把需要的结果给过滤出来重新赋值到 todos 中
				this.todos = this.todos.filter(t => !t.completed)
			}
		}


	}).$mount('#app')

})(window);
