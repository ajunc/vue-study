// 我们的插件：
// 1.实现一个Router类并挂载期实例
// 2.实现两个全局组件router-link和router-view
let Vue;
class VueRouter {

}

// 插件需要实现install方法
// 接收一个参数，Vue构造函数，主要用于数据响应式
VueRouter.install = function (_Vue) {
  // 保存Vue构造函数在VueRouter中使用
  Vue = _Vue

  // 任务1：使用混入来做router挂载这件事情
  Vue.mixin({
    beforeCreate() {
      // 只有根实例才有router选项
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }

    }
  })

  // 任务2：实现两个全局组件
  // router-link: 生成一个a标签，在url后面添加#
  // <a href="#/about">aaaa</a>
  // <router-link to="/about">aaa</router-link>
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true
      },
    },
    render(h) {
      // h(tag, props, children)
      return h('a',
        { attrs: { href: '#' + this.to } },
        this.$slots.default
      )
      // 使用jsx
      // return <a href={'#'+this.to}>{this.$slots.default}</a>
    }
  })
  Vue.component('router-view', {
    render(h) {
      return h('div', 'router-view content...')
    }
  })
}

export default VueRouter