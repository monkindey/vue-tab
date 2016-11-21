/**
 * 1. 初始化显示
 * 2. 点击显示
 */
Vue.component('tab', {
	props: ['title'],

	computed: {
		show: function() {
			return this.$parent.current == this.index;
		}
	},

	data: function() {
		return {
			index: ''
		}
	},

	created: function() {
		if (!this.index) {
			this.index = this.$parent.$children.indexOf(this) + '';
		}
	},

	template: `
		<div v-show="show" class="tab-panel">
			<slot></slot>
		</div>
	`
});

Vue.component('vue-tabs', {
	props: ['active'],

	data: function() {
		return {
			tabList: [],
			current: 0
		}
	},

	template: `<div class="vue-tabs">
		<ul class="tab-nav">
			<li :class="{ active: current == i }" @click="toggle(i)" v-for="(tab, i) in tabList">{{ tab.title }}</li>
		</ul>
		<div class="tab-content">
			<slot></slot>
		</div>
	</div>`,

	methods: {
		toggle: function(index) {
			this.current = index;
		}
	},

	created: function() {
		this.current = this.active;
	},

	mounted: function() {
		this.tabList = this.$children.map(function(c) {
			return {
				title: c.title
			}
		});
	}
});

var vm = new Vue({
	el: '#app'
})