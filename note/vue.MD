18613887545    8700
#################webpack 笔记#######################
//cd对应文件夹  然后
npm init -y  //就是yes的意思，在init的时候省去了敲回车的步骤，生成的默认的package.json
//安装需要的包
npm i webpack webpack-cli webpack-dev-server babel-core babel-loader babel-preset-es2015 babel-preset-stage-0 css-loader style-loader less-loader file-loader url-loader html-webpack-plugin --save-dev
//配置webpack
自己建一个 webpack.config.js文件  写配置
//babel需要建一个配置文件 .babelrc
{
  "presets":['es2015','stage-0']
}
////一个简单的webpack.config.js的配置；
let path = require('path');  //引入nodejs默认模块
let HtmlWebpackPlugin = require('html-webpack-plugin'); //引入处理html的插件
let VueLoaderPlugin = require('vue-loader/lib/plugin'); //VUE需要的插件
module.exports = {
  entry:'./main.js',//入口文件路径
  output:{//打包出口设置
    path:__dirname+'./dist',//路径设置绝对地址
    filename:'bundle.js',//设置输出文件名字
  },
  module:{//设置引入模板的规则
    rules:[//设置规则
       {
           test:/\.js$/,   //正则匹配
           use:'babel-loader', //使用的模块名
           exclude:/node_modules/    //排除某个正则匹配的
       },
       {
           test:/\.css$/,use:['style-loader','css-loader']//使用顺序从右到左
       },
    ]
  },
  plugins:[//插件的配置
    new HtmlWebpackPlugin({
           template:'./src/index.html'
       }),
    new VueLoaderPlugin(),
  ]
}

全家桶：vue-cli 脚手架
       vue2.0 主要框架
       vue-router 路由管理
       vuex 数据状态管理
       axios 跨域请求
       element-ui/vant ui  ui组件库 
############# 创建项目 #############
npm 安装 vue
npm install -g vue-cli
vue init webpack name
cd name
npm install
npm run dev
############################## flex 布局 ###########################################

display:flex
flex-direction:row / column //水平排列 或 垂直排列
justify-content:center //水平居中
align-items: center  //垂直居中
flex:1 //每个占一份

############################# es6 promise #########################################
Promise 是 ES6 为 JavaScript 异步编程定义的全新 api 。为异步编程而生，实际上就是另类的回调函数。
代码更整洁，可读性强，易于维护（避免了回调地狱）。
链式操作，容易编写，易于开发。  //可以像jquery那样进行链式操作
一般使用：
let _p = new Promise(function(resolve,reject){//resolve 相当于成功时 调用  //reject 相当于失败或报错时调用
    console.log(1);//resolve之外的代码都会及时执行
    resolve(2);//then时才会执行这个
});
_p.then(res=>{//res 参数是 上面resolve方法传过来的
    console.log(res);
    return 3
},err=>{//出错时 reject的调用 会在这里传递到err 
}).then(res=>{//链式操作
    console.log(res) 
},err=>{})
________________________
1
2
3
________________________
let _p = new Promise(function(resolve,reject){
    console.log(1);
    setTimeout(()=>{
      resolve(2);
    },1000)
});
_p.then(res=>{ 
    console.log(res);
    return 3
},err=>{}).then(res=>{
    console.log(res)
},err=>{})
________________________
1
2  1秒后
3  1秒后
________________________异步执行到resolve时  后面的then才会执行
let _p = new Promise((resolve,reject)=>{
    console.log(1);
    resolve(2);
});
_p.then(res=>{ 
    console.log(res);
    return 3
},err=>{}).then(res=>{
    console.log(res)
},err=>{});
console.log(11);
________________________
1
11 
2
3  
_______________________promise里resolve之外的代码 会继续执行，resolve的内容 then的时候才执行 
                       并且then会把调用顺序排到最后面去；
let _p = new Promise((resolve,reject)=>{
    throw new Error('warning');
});
_p.then(res=>{
  
})//如果不写 err=>{}的回掉  会发生报错
_p.then(res=>{},err=>{})//这样不会发生报错警告 
_p.then(res=>{},err=>{console.log(err)})//会在控制台打出信息
——————————————————————————————————————————————————————————————
let _p = new Promise(function(resolve,reject){
    throw new Error('warning');
    resolve(2)
})
_p.then(res=>{
   console.log(res)
},err=>{
   console.log(err)//打印错误信息  不会执行resolve
})
______________________________________________________________
let _p = new Promise(function(resolve,reject){
     console.log(1);
     resolve(2);
     throw new Error('warning')
     console.log(11)
});
_p.then(res=>{
  console.log(res)
},err=>{
  console.log(err)
})
___________________________________________
1
2
打印错误信息
——————————————————————————————————————
###################################################################################
vue里 靠数据来改变页面       jquery靠事件操作dom来改变页面
vue里 基本不再用var 而改用在data里去定义一个数据，然后再来操作这个数据；

vue框架的个人理解是 vue把事件运行相关的方法都做了  不需要我们像jquery那样去用事件改变dom；
dom的更新依靠的data数据，因为vue是双向绑定，所以数据变了就会驱动框架去更新事件  这样就达到
改变页面效果的目的，我们所要做的就是操作data的数据  而无需更多的纠结事件的逻辑过程  提高了开
发效率。

############################### 基础笔记 ###########################################

import Vue from 'vue'
import vueRouter from 'vue-router'  引入一个npm新安装的插件
Vue.use(vueRouter)   需要vue 先用原型方法 use一下
let router = new vueRouter  //才可以对引入的插件进行 new 操作

###################################################################################
es6 import 引入模块  两种方式 
                    1.{a,b,c...}//export导出的每一项;  
                    2.* as 任意名字  //所有的引入过来赋一个别名使用
                    特殊
                    ～如果模块是 export default 这样导出的  我们 import 任意名字 from ''//
                    我们可以用任意名字来命名引入的模块。
    export 导出模块   export let a = 'a'
                     export function b(){console.log(1)}
                     export {a,b}
                     export default //可以是export default {}，对象
                                           export default function(){}, 匿名函数
                                           export default 一个变量  (String,Number,Boolean)非对象数据

###################################################################################
～事件修饰符
	# 事件.stop  阻止事件传播  不限于阻止冒泡也阻止捕获
	相当于  stopPropagation  cancleBubble = true

	# 事件.capture  捕获
	相当于 xxx.addEventListener('click',fn,true)

	# 事件.prevent 取消默认事件
	相当于 preventDefault()  returnValue = false;

	# 事件.once  只触发一次
	相当于 jquery 的 once 

	# 事件.self 判断事件源
	相当于 e.target
###########################

～过滤器  filters
	{{'123' | my('123')}}
	filters:{
	   my(data,param1,param2...){

	   }
	},
	全局过滤器，注意要放在代码顶部
	也可以挂在vue的构造函数上  Vue.filter('name',(data)=>{ return 'add'+data})
  与computed的区别
  filters与computed都可以计算改变 它们的区别是，filter可以接受参数来改变一组数据，computed计算属性 计算的是固定的
  filters不会缓存数据，每次都会重新计算。computed会缓存不会每次都计算。
  比如一个列表循环出来的数据需要改造 filters就比较适合，如果用computed得设定很多属性。
################################
～计算属性  computed  是属性不是方法   不支持异步
  ——区别是 方法不会缓存，computed会根据依赖（归vue管理的数据，可以响应式变化的）的属性进行缓存
  ——两部分组成get和set（可以只写get，不能只写set）一般情况用js赋值影响其他人或表单元素设置值的时候会调用set方法
  computed:{
    checkAll:{
      get(){//返回什么结果就会赋予给checkAll属性
         return this.products.every(item=>item.isSelected)
         //因为必须要return 所以不能支持异步
      },
      set(val){//val 是checkAll赋予值的时候 传递过来的
         this.products.forEach(item=>item.isSelected = val)
      }
    }
  }
########################
～观察者  watch  只有值变化的时候才触发，支持异步，其他情况我们更倾向用computed

  watch:{//a变化后执行函数
    a(newVlaue,oldVlue){//watch要和观察者的名字一样,只有值变化后才触发，可以支持异步

    }
  } 
  //只能监控一层数据变化，多维数据时就监测不到深层的了 比如这样的多层数据[{name:'huwei'},{age:12}]
  watch:{
     todo:{//深度监控
       handler(){
          
       },deep:true
     }
  }
############################
～条件 v-if 操作的是dom  v-show操作的是样式
  默认情况下切换dom的时候相同的结构会复用 如果不需要复用dom上必须加key
  <template v-if="cut">
    <input type="text" key="1"/>
  </template>
  <template v-else>
    <input type="text" key="2"/>
  </template>
#################################
～绑定  v-bind简写 : 动态绑定属性 
  <img :src="src"/>
  // 可以 class  style  第一种方式 对象  第二种 数组
  :class绑定的样式和 class不冲突
  1. {classname:isclass}
  2.[class1,class2,'z']  data:{class1:'x',class2:'y'}
  :style
  1.{backGround:'red'}
  2.[sty1,sty2] data:{sty1:{backGround:'red'}}
################################

～实现单页开发的方式
  0.通过hash记录跳转的路径（可以产生历史管理）
  1.浏览器自带的历史管理history (history.pushState())可能会导致404错误
  开发时使用hash 上线使用history
################################

~自定义指令 directive
<div v-color></div>
directives:{
     color(el,bindings){
       el.innerHTML = "directive";
       el.style.backgroundColor = '#f60'
     }
},
自定义了一个v-color的属性，el指当前的dom bindings是当前dom上的各种属性值
##########################################
~本地存储和获取   json格式的字符串化  序列化
localStorage.setItem('data',Json.stringify(this.todos));
Json.parse(localStorage.getItem('data'));
localStorage.removeItem(key);//删除某个
localStorage.clear();//全部删除

localStorage 和 sessionStrong区别
两者的区别sessionStrong存储的数据是暂时的，浏览器关掉后，存储下来的数据就会被清除。
localStorage存储的数据是长期的，浏览器关掉后，存储下来的数据还是会保存在浏览器中。

encodeURI 转化http地址  加密
decodeURI 反转地址  解密
###############################
~ $nextTick
 数据变化完成后 进行dom操作
 在Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中
 created(){
   this.$nextTick(() => {
        this.msg2 = this.$refs.msgDiv.innerHTML
    })
 }
##############################
~子组件给父组件传值
  父传子 用 props
  子传父 用 $emit 去触发 自定义的绑定事件

  思路：父亲绑定一些事件，儿子触发事件，将参数传递过去
  <div id=app>
    父亲:{{money}}
    <!--child.$on('child-msg',things) -->
    <child :m="money" @child-msg="things"/>
  </div>
  <script>
   let vm = new Vue({
      el:"app",
      data:{
        money:400
      },
      methods:{
        things(val){//on 
           alert(val);
           this.money = val;
        }
      },
      components:{
        child:{
          props:['m']
          template:'<div>儿子:{{m}} <button @click="getMoney()">多要点钱</button></div>',
          methods:{
             getMoney(){
                this.$emit('child-ms',800)//触发自己的自定义事件，让父亲的方法执行   方法是父亲的 属性是自己组件的
             }
          }
        }
      }
   })
  </script>

props的用法
props:{
      tits:{//在父组里  给子组件上绑定的名称
        type:[String],//规定传递的prop数据类型：String,Number....
        required:true,//是否必须传值
        isValid:function(val){
            return val>10
        },//自定义验证方法 return true或false
        default:"默认"//默认传递的数据
      }
  },
################################################
EventBus 可以传递几个不同子组件之间的信息  原理是发布订阅模式
let EventBus = new vue();  new一个第三方独立的 来发布和订阅各个组件的信息
borther1:
borther1:{
        template:'<div>{{color}} <button @click="trans1">变绿</button></div>',
        created(){
          console.log(EventBus.$on)
          EventBus.$on('changeColor',(val)=>{ //在EventBus上$on声明一个名changColor，触发它会调用第二个回调函数 
            this.color = val;
          })
        },
        methods:{
          trans1(){
            EventBus.$emit('changeColor2',this.old)//在EventBus上$emit触发 第一个是要触发的名称  第二个是传递的参数
          }
        },....
borther2:
borther2:{
        template:'<div>{{color}} <button @click="trans2">变红</button></div>',
        created(){
          EventBus.$on('changeColor2',(val)=>{
            console.log(val)
            this.color = val;
          })
        },
        methods:{
          trans2(){
            EventBus.$emit('changeColor',this.old)
          }
        },.......
这样就实现了borther1和borther2之间的信息传递。

大的项目  还是用vuex  更方便管理
################################################
～ slot 插槽  slot作用定制模板
  <div id="app">
    <modal m="1">//1数据都是父级的，只有属性名m属于子组件
      <p slot="content">亲，你确定删除么</p>
      <h3 slot="title" @click="fn">是否删除</h3>//这里绑定的方法fn属于父级模板
    </modal>
  </div>
  <template id="modal">//模版中只有一个根元素
    <div>
       <slot name="title">默认标题</slot>//slot中可以放置一些默认信息，如果传递了内容则替换掉
       <slot name="content">默认内容</slot>  如果不设置名字name 则默认放到default中
    </div>
  </template>

  slot-scope="props"  通过字组件的 <slot :data="data"></slot> 绑定数据  父组件 可以用props.data 拿到子组件的数据
  data;
################################################

～this.$parent  子组件的上一级，可以获得父一级的数据信息。
～this.$refs.xx  指定xx名称的dom结构或者子组件   可以通过ref 来获取子组件里的信息。
#################################### 钩子函数 #######################################
一共4对 状态  贯穿vue 从实例创建 到 实例销毁的 过程；

beforeCreate(){}//创建实例前执行  --这时候读取不到data里的数据；

created(){}//创建完成实例后立即执行  --这时可以操作data里的数据，一般在这里提前提交ajax来更新data里数据

beforeMount(){}//将编译完成的html挂载到虚拟dom上，此时页面上没有显示。

mounted(){}//编译完的html挂载页面完成后执行 把虚拟dom挂到页面上了  mounted 整个实例中只执行一次

beforeUpdate(){}//数据更新之前   缺点：无法知道时具体哪个数据更新了，可以用 watch监控 替代

updated(){}//数据更新之后

beforDestroy(){}//实例销毁之前

destroyed(){}//实例销毁完成
_____________________________________________
理解：功能类似于原生的
document.body.onload=function(){}
document.body.reload=function(){}....

在具体的代码里 只有这四对钩子函数和数据data是key:function(){}简写key(){} 形式 例如created(){}, 

其他都是对象key:{}例如：
methods:{},computed:{},components:{},watch:{}......
###################################  mixin ########################################
混入，可以把部分代码写到一个文件里 用对象导出   在模板里引入这个对象  然后用mixin方法可以把这些数据
混入到当前模板里，如果有相同的数据，则混入的数据会被模板里的数据替换，混入数据里执行函数用到这个数据也会
是混入替换后的数据。（类似css的后面覆盖前面）
例如：
导出一个数据（vue格式的对象）
export default{
    data(){
        return {
            loading:false,
            num:1
        }
    },
    mounted(){
        console.log(this.loading);
    }
}
在template模板里 引入
import mix from '../Mixin/m.js'
使用：
export default {
  mixins:[mix],
  ...
这样就把数据混入到模板里了，可以方便的把以前大段的代码拆分成若干数据，然后根据需求混入到模板里；
##################################### keep-alive ##################################
缓存 被包裹的代码
<keep-alive>
  <router-view></router-view>
</keep-alive>
这个路由里的都会被缓存
#################################### transition ##################################
过度动画
<transition name="fadeIn"><router-view></router-view></transition>
有三个状态的样式  ： 进入前 .fadeIn-enter{opacity: 0;}
                  进入后 .fadeIn-enter-active{transition:all .3s linear;}
                  离开后 .fadeIn-leave-active{transition:all .3s linear;opacity: 0;}
这样就加入了一个过渡动画
########## 需要加强的知识 ################
vue-router,vuex,mock.js,axios跨域
#################################### mock.js ######################################
npm install mockjs --save-dev
我在src目录下创建了一个mock文件，创建了一个mock.js文件。在mock.js文件中引入mock.js模块
import Mock from 'mockjs';
然后就开始编造数据了
import Mock from 'mockjs';

Mock.mock('http://www.test.com','get',{
    data:[1,2,3,4]
})

然后在main.js 文件里面引入我们写好的mock/index.js文件 用于拦截请求
import '../Mockjs/index.js'
——————————————————————————————————————————————————
调用
.......
import axios from 'axios'
axios.get('http://www.test.com'....

#################################### vuex #########################################
理解：存储数据用的，整个vue框架任何模板都可以简单的读取到信息，修改信息后 全部模板都会有反应；
解决：父子组件之间prop，$emit 兄弟组件之间的eventBus 等方式 传递数据的繁琐；
~使用例子
——————————————————————————————————————
import Vue from 'vue';
import vuex from 'vuex';
Vue.use(vuex);

let store = new vuex.Store({
    state:{
      num:0,
    },//保存的简单数据 例如：字符串，数字，object,array
    getters:{
      setNum(state){
        return state.num + '条'
      }
    },//计算 更改过滤state里的数据
    mutations:{
       change(state,snum=1){
         state.num += snum
       },
    },//通过事件更改state数据的方法写这里
    ations:{
       changAction(content){
          setTimeout(()=>{
             content.commit('change')
          })
       }
    },//异步出发mutations里的方法
});
export default store
—————————————vuex里核心都是围绕state里存的数据，其他改变的方法都是为了改变这个数据服务的。————————
～模板内使用
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
...
created(){
  ...mapState({
     'htmldata':'storedata'
  }),//等价于 this.htmldata = this.$store.state.storedata
  ...
},
methodes:{
  ...mapMutations({
     'htmlmut':'storemut'
  })//等价于 htmlmut(){ this.$store.commit('storemut')}
  ...mapActions({
     'htmlaction':'storeaction'
  })//等价于 htmlaction(){ this.$store.dispatch('storeaction')}
}
______________________________________
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  namespaced: true,//为了解决不同模块命名冲突的问题，将不同模块的namespaced:true
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
使用模块中的mutations、getters、actions时候，要加上模块名，例如使用commit执行mutations时
格式：模块名/模块中的mutations(xxx/setUserInfo)
this.$store.commit("userInfo/setUserInfo",userInfo)
获取属性时同样加上模块名
格式：store.state.模块名.模块属性
$store.state.userInfo.userName

vuex 数据有modules子数据 且子数据使用了独立的namespace命名空间  这时mapState获取
子数据的state 可以用回调函数的方式如下：
...mapState({
     handlerName:(state)=>state.userData.handlerName
}),

什么时候用 Vuex？
这个嘛，很简单。你觉得你的项目里，各组件之间传参什么的，相处的很和谐，那就无所谓用不用了。
当你的组件兄弟们有传参问题，有很多这个组件要用，那个组件要，其他好几个组件也要，要的你生不如死，你就可以考虑一下了
__________________________________________________________________________________________________
#################################### axios #########################################
axios.interceptors//请求拦截
axios.interceptors.request.use(
   config=>{

   },
   error=>{

   }
)(请求时拦截)
axios.interceptors.response.use(
   response =>{

   },
   error=>{

   }
)(请求返回状态码拦截) 

################################ vue-router ##################################
~vue-router:  
*安装：npm install vue-router
 *****************
 src 目录下 新建 router 目录，目录下新建 index.js
  import Vue from 'vue'
  import Router from 'vue-router'
  import index from '@/view/index'
  import video from '@/view/video.vue'

  Vue.use(Router)

  export default new Router({
    routes: [
      {
        path: '/',
        name: 'index',
        component: index
      },
      {
        path:'/video',
        name:'video',
        component: video
      }
    ]
  })
***************
 在 main.js中引入
  import router from './router'
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
**************使用******************* 
1.router-link   必须包含to属性
是一个组件，它默认会被渲染成一个带有链接的a标签，通过to属性指定链接地址。
注意：被选中的router-link将自动添加一个class属性值.router-link-active。
<router-link to="/">[text]</router-link>
路由跳转的方式
 <router-link to=' '></router-link>    和   this.$router.push({path:' '})

2.router-view 用于渲染匹配到的组件。
  例如：app.vue
  <template>
    <div id="app">
      <router-view><router-view>
    </div>
  </template> 

3.$router里(有r)都是存的方法(.push)    $route里(无r)是各种属性(params)
  绑定方法跳转页面时用 $router.push('/home')   绑定方法获取当前页面路径所带的参数用 $route.params.a

4.路由配置里：redirect  会把指定的path路径 强制转到 redirect指定的路径下 渲染;(404页面)
            alias    会给指定的path路径  起一个别名   用别名也能访问到path指定的路径;
            name     给当前路由起一个别名   带参跳转时只能用 别名  不能用path {name:'home',params:{a:1}}
            mode    可以切换 h5 和 history 模式

5.{path:'/home/:a',component:home,name:'home'}用冒号，这样可以带参数跳转  
  <router-link :to="{name:'home',params:{a:1}}"></router-link>  params对应的object的key对应冒号后的参数

6.keep-alive 要缓存谁就把谁包住。

7.路由守卫
在全局注册一个路由守卫  router.beforeEach
router.beforeEach((to,from,next)=>{//from 离开的路由  to 进入的路由  next 必须执行 不然路由不会跳转
  console.log(to.name)
  if(to.meta.requireAuth){//判断是否需要登陆操作
    if(true){//判断是否已经登陆
      next()//继续执行路由的跳转 到达新路由
    }else{
      next('/')//回到指定路径的路由，进入后会再次进行路由守卫的检测
    }
  }else{
    next();
  } 
})
也就是说beforeEach()必须调用next(),否则就会出现无限循环，next() 和 next('xxx') 是不一样的，
区别就是前者不会再次调用router.beforeEach()，后者会！！！
写错了会造成不停的路由跳转
################################### vue双向绑定原理 ##################################
每当被问到Vue数据双向绑定原理的时候，大家可能都会脱口而出：Vue内部通过Object.defineProperty方法属性拦截的方式，把data对象里每个数据的读写转化成getter/setter，当数据变化时通知视图更新。一句话把大概原理概括了
/****************** keep-alive 缓存*************************/
keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染。
用法也很简单：
<keep-alive>
  <component>
    <!-- 该组件将被缓存！ -->
  </component>
</keep-alive>
props
include - 字符串或正则表达，只有匹配的组件会被缓存
exclude - 字符串或正则表达式，任何匹配的组件都不会被缓存
<keep-alive include="a">
  <component>
    <!-- name 为 a 的组件将被缓存！ -->
  </component>
</keep-alive>可以保留它的状态或避免重新渲染
<keep-alive exclude="a">
  <component>
    <!-- 除了 name 为 a 的组件都将被缓存！ -->
  </component>
</keep-alive>可以保留它的状态或避免重新渲染
实际项目中
router-view 也是一个组件，如果直接被包在 keep-alive 里面，所有路径匹配到的视图组件都会被缓存：
<keep-alive>
    <router-view>
        <!-- 所有路径匹配到的视图组件都会被缓存！ -->
    </router-view>
</keep-alive>
如果只想 router-view 里面某个组件被缓存，怎么办？
增加 router.meta 属性
// routes 配置
export default [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      keepAlive: true // 需要被缓存
    }
  }, {
    path: '/:id',
    name: 'edit',
    component: Edit,
    meta: {
      keepAlive: false // 不需要被缓存
    }
  }
]
<keep-alive>
    <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件，比如 Home！ -->
    </router-view>
</keep-alive>
/**************************************************/
以下方法调用不会改变原始数组
filter(), concat(), slice() 他们返回的是一个新数组，使用这些方法时，可以用新数组来替换原始数组


以下方法调用会改变原始数组
push(), pop(), shift(), unshift(), splice(), sort(), reverse()
直接修改数组元素是无法触发视图更新的，如

this.array[0] = {
    name: 'meng',
    age: 22
}
修改array的length也无法触发视图更新，如

this.array.length = 2;
触发视图更新的方法有如下几种

1. Vue.set
可以设置对象或数组的值，通过key或数组索引，可以触发视图更新
2. Vue.delete

删除对象或数组中元素，通过key或数组索引，可以触发视图更新
3. 数组对象直接修改属性，可以触发视图更新
3. 数组对象直接修改属性，可以触发视图更新

this.array[0].show = true;
this.array.forEach(function(item){
    item.show = true;
});
4. splice方法修改数组，可以触发视图更新

this.array.splice(indexOfItem, 1, newElement)
5. 数组整体修改，可以触发视图更新

var tempArray = this.array;
tempArray[0].show = true;
this.array = tempArray;
6. 用Object.assign或lodash.assign可以为对象添加响应式属性，可以触发视图更新

复制代码
//Object.assign的单层的覆盖前面的属性，不会递归的合并属性
this.obj = Object.assign({},this.obj,{a:1, b:2})

//assign与Object.assign一样
this.obj = _.assign({},this.obj,{a:1, b:2})

//merge会递归的合并属性
this.obj = _.merge({},this.obj,{a:1, b:2})
复制代码
7.Vue提供了如下的数组的变异方法，可以触发视图更新

复制代码
push()
pop()
shift()
unshift()
splice()  
sort()
reverse()

/**********************  vuex 总结  **********************/
一.引入vuex 
   1.npm install vuex 安装vuex包
   2.在src开发目录下新建 vuex文件夹  新建index.js 写vuex数据；
   import Vue from 'vue'
   import Vuex from 'vuex'
   Vue.use(Vuex)
   export default new Vuex.Store({
                       state:{
                          num:1
                        },
                        getters:{//编辑state
                          cnum(state){
                            return state.num + '个'
                           }
                        },
                        mutations:{//处理同步
                           add(state){
                             state.num += 1
                           },
                           frink(state){
                              state.num -= 1
                           }
                        },
                        actions:{//处理异步
                          actNum({commit}){
                             setTimeout(()=>{
                                commit('frink')
                             },1000)
                          }
                        }
                  
                   })
    3.在入口main.js文件里引用
      import store from './vuex'
      new Vue({
        el:"#app",
        router,
        store,
        components: { App },
        template: '<App/>'
      })
这样就可以在项目里使用vuex了
   4.项目页面使用
   template //建议template里使用的命名和vuex里state,getters,mutations,actions里用的一样，方便使用map方法
     <div class="hello" >
      <div>{{num}}</div>
      <div @click="addNum">add</div>
      <div @click="actNum">frink</div>
     </div>
   js:
     import {mapState,mapGetters,mapMutations,mapActions} from 'vuex' //引用map方法
     
     computed:{
      //state mapState 2种使用
       1. ...mapState(['num']) //数组
       2. ...mapState({ //json
                        num : 'num'
                      })
      state直接普通引用
      return this.$store.getters.changeNum
     },

   methods:{
    //mapMutations和mapActions只接收数组
    //返回的是一个object {} 对象，所以需要用展开... 混入多个
    ...mapMutations(['addNum']),
    ...mapActions(['actNum']),

    普通引用
      addNum(){ 
         this.$store.commit('addNum')  //同步用commit 提交触发
       },
      actNum(){
         this.$store.dispatch('actNum')  //异步用dispatch触发
      }
/********************* vue-router **************************/
vue路由实现的基本原理：  SPA —— 单页应用
1.hash模式：
  http://www.xxx.com/#/login
  这种 #。后面 hash 值的变化，不会向后端提交请求，同时还会触发hashchange 这个事件，利用这样的特性，就是实现改变路径页面不刷新
  然后js监听到后 改造页面dom。
  缺点是路径上有一个#号

2.h5的history模式：
  因为HTML5标准发布。多了两个 API，pushState 和 replaceState，通过这两个 API 可以改变 url 地址且不会发送请求。同时还有popstate 事件。通过这些就能用另一种方式来实现前端路由了，但原理都是跟 hash 实现相同的。用了 HTML5 的实现，单页路由的 url 就不会多出一个#，变得更加美观。但因为没有 # 号，所以当用户刷新页面之类的操作时，浏览器还是会给服务器发送请求。为了避免出现这种情况，所以这个实现需要服务器的支持，需要把所有路由都重定向到根页面。

/****************** axios **********************/
Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。
从浏览器中创建 XMLHttpRequests
从 node.js 创建 http 请求
支持 Promise API
拦截请求和响应
转换请求数据和响应数据
取消请求
自动转换 JSON 数据
客户端支持防御 XSRF

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
/*********************** mvvm 框架 ***************************/
vm层（视图模型层）通过接口从后台m层（model层）请求数据，vm层继而和v（view层）实现数据的双向绑定。
mvc和mvvm的关系？
改进版
数据分离
视图模型层
c（控制层）被换成了vm（viewmodel）层
MVVM是Model-View-ViewModel的简写。它本质上就是MVC 的改进版。
mvvm层实现了前后端更好的分离（前端需要的数据只需要请求后端的接口即可）

数据监听： ng用的是 脏检查  事件时 watcher会对比整个树的结构来判断是否需要重绘dom  缺点性能损耗
         vue用的是 Object.defineProperty() 添加setter getter来劫持，通过发布订阅模式 来监听数据的变化

路由懒加载  路由钩子  less与scss区别  是否可以if写样式

/************ vue-cli 初始化***************/
npm install -g vue-cli
查看vue版本号
vue -V    //注：V是大写字母V
cmd利用cd指令进入到保存项目的文件夹下，然后输入命令
vue init webpack

