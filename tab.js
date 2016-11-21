/**
 * 1. 初始化显示
 * 2. 点击显示
 */
Vue.component('tab', {
	props: ['title'],

	computed: {
		show: function() {
			console.log(this.$parent.$target, '.....index', this.index);
			return this.$parent.$target === this.index;
		}
	},

	data: function() {
		return {
			index: ''
		}
	},

	watch: {
		'$parent.$target': function() {
			console.log('.///watch')
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
			$target: 0
		}
	},

	computed: {
		test: function() {
			return this.$target - 1;
		}
	},

	template: `<div class="vue-tabs">
		<ul class="tab-nav">
			<li @click="toggle(i)" v-for="(tab, i) in tabList">{{ tab.title }}</li>
		</ul>
		<div class="tab-content">
			{{ test }}
			{{ $target }}
			<slot></slot>
		</div>
	</div>`,

	methods: {
		toggle: function(index) {
			this.$target = index;
			debugger;
		}
	},

	created: function() {
		this.$target = this.active;
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