# loveproject

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## 项目目录介绍

- bulid webpack 编辑打包配置目录
- config 项目配置
- dist 项目打包后的文件
- node_modules npm 包
- src 开发需要的目录

  - api 后端接口地址
    - module api 接口模块文件
      - educationHelpModule.js(帮扶模块接口)
      - indexModule.js (互助模块接口)
      - register.js(注册登录支付银行卡身份证接口)
      - transparentModule.js (透明监督模块接口)
      - welfareModule.js (公益模块接口)
    - axios.js axios 配置文件
    - index.js 导出所有接口地址
  - assets 资源目录
  - components 组件目录
  - config 配置
  - mixins 通用方法及属性
  - router vue 路由配置文件
  - store vuex 文件
  - styles less 样式文件
  - views 页面
    -helpProgram 教育帮扶模块
        - buyer 团体帮扶的支付页面
        - groupBuyerSuccess 团体帮扶支付成功页面
        - groupResets 团体帮扶申请页面
        - personalApplication 个人帮扶申请页面
        - personProgramDetails 个人帮扶详情页面
        - programDetails 团体帮扶详情页面
        — realName 实名认证页面
        - selectObject 选择我要帮助的贫困的学生对对象
        -index.vue 教育帮扶的入口页面
    -index 项目的主页的入口文件
        - buyer 教育互助支付页面
        - buyerSuccess 教育互助支付成功页面
        - productDetails 教育互助的详情
            -index 互助教育详情
            -universityList 查看每个省份的匹配大学
        - promiseBook 申请加入的承诺书（通用）
        - recipientsInfo 填写受助人信息
        - rewardDetails 奖励金的划分规则
        - index.vue 主页的入口页面
    -Love public welfare 公益项目模块
        - welfare_details列表项的详细资料
        - welfare_reply 捐款成功返回页面
        - index.vue 公益项目的列表
    -personalCenter(我的模块)
        - abount 关于我们
        - applyReward 申请奖励金
           - applyInfo 申请信息
           - stepApply 申请步骤
           - index 申请列表
        - helpGoods 善因产品
        - loveValue 查看爱心值
          - index 入口
          - readValue 分值解读
        - myHelp 我的帮扶
          - myHelpList 团体帮扶个人列表
          - index 入口
          - personalInfo 个人信息
        - myLaunch 我的发起
        - mySuports 我的互助
          - personalInfo 我的互助详情
          - index 我的互助入口
        - personalData 个人资料
          - updatePhone 更换手机号码
          - index 入口
        - publicRecord 公益记录
      -transparent 透明监督模块
  - App.vue 根组件
  - main.js 项目启动文件（入口）
- static 静态资源目录
- .babelrc babel 配置文件
- .eslint eslint 配置文件
- .postcssrc webpack 处理 css 插件配置
- .package npm 配置信息



For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


##知识点汇总
vue-router传递参数分为两大类
-编程式的导航 router.push
-声明式的导航 <router-link>

变成式导航
命名路由传递参数需要使用params来传递，这里一定要注意使用params不是query。目标页面接收传递参数时使用params
特别注意：命名路由这种方式传递的参数，如果在目标页面刷新是会丢失传递的数据

使用方法如下：

this.$router.push({ name: 'news', params: { userId: 123 }})

询参数其实就是在路由地址后面带上参数和传统的url参数一致的，传递参数使用query而且必须配合path来传递参数而不能用name，目标页面接收传递的参数使用query。
注意：和name配对的是params，和path配对的是query
使用方法如下：
this.$router.push({ path: '/news', query: { userId: 123 }});

声明式的导航

命名路由
<router-link :to="{ name: 'news', params: { userId: 1111}}">click to news page</router-link>


查询参数
<router-link :to="{ path: '/news', query: { userId: 1111}}">click to news page</router-link>

最后总结：路由传递参数和传统传递参数是一样的，命名路由类似表单提交而查询就是url传递，在vue项目中基本上掌握了这两种传递参数就能应付大部分应用了，最后总结为以下两点：
1.命名路由搭配params，刷新页面参数会丢失
2.查询参数搭配query，刷新页面数据不会丢失
3.接受参数使用this.$route后面就是搭配路由的名称就能获取到参数的值

//获取某个Id元素的子节点

    var oDiv = document.getElementById("infoObject").childNodes;
// 1 获取元素节点
    // 通过id的方式( 通过id查找元素，大小写敏感，如果有多个id只找到第一个)
    document.getElementById('div1');

    // 通过类名查找元素，多个类名用空格分隔,得到一个HTMLCollection(一个元素集合，有length属性，可以通过索引号访问里面的某一个元素)
    var cls = document.getElementsByClassName('a b');
    console.log(cls);

    // 通过标签名查找元素 返回一个HTMLCollection
    document.getElementsByTagName('div');

    // 通过name属性查找，返回一个NodeList(一个节点集合，有length属性，可以通过索引号访问)
   var nm =  document.getElementsByName('c');
    console.log(nm);

    // 获取所有form标签(得到一个HTMLCollection集合）
    var form = document.forms;

  // html5新加标签（ie8+）
    document.querySelector(); //  返回单个node，如果有多个匹配元素就返回第一个
    document.querySelectorAll(); // 返回一个nodeList集合


    // 创建元素，只是创建出来并未添加到html中，需要与appendChild 配合使用
    var elem = document.createElement('p');
    elem.id = 'test';
    elem.style = 'color: red';
    elem.innerHTML = '我是新创建的节点';
    document.body.appendChild(elem);

    // 创建文本节点 createTextNode
    var txt = document.createTextNode('我是文本节点');
    document.body.appendChild(txt);

    // 克隆节点（需要接受一个参数来表示是否复制元素）
    var form =  document.getElementById('test');
    var clone = form.cloneNode(true);
    clone.id = 'test2';
    document.body.appendChild(clone);


    // 3 节点修改API
    //节点修改APi有两个特点
    // 1 不论新增还是替换节点，如果原本就在页面上，就会被替换
    // 2 修改之后节点本身绑定的事件不会小时

    // 1 appendChild ()
    // 用法是： parent.appendChild(child)
    // 会将child节点添加到parent里的最后面，如果子节点原本就存在，会移除原节点，添加新节点
    // 到最后，但是事件会保留

    // 2 insertBefore()
    // 用法是 parent.insertBefore(newNode,refNode);
    // refNode 是必须传的 不传会报错
    // 如果 refNode 是undefined 和null 就会将新节点传入到parent节点的最后

    // 3 removeChild()
    // 用法是：parent.removeChild(child)
    // 如果删除的不是父元素的子节点会报错
    // var deleted = parent.removeChild(child)
    // deleted 可以继续引用节点 ，被删除节点依然存在与内存中

    // 4 replaceChild()
    // 用法是：parent.replaceChild(newChild, oldChild);


    / 4 节点的关系APi
    // 1 父关系API
       //  parentNode 父节点
       //  parentElement父元素

    // 2 子关系API
        // children 子元素
        // childNodes 子节点
        // firstElementChild 第一个子元素
        // firstChild 第一个子节点
        // lastElementChild 最后一个子元素
        // lastChild 最后一个子节点

    // 3 兄弟关系的API
        // previousSibling 节点的上一个兄弟节点
        // previousElementSibling  节点的上一个兄弟元素（ie9以下不支持）
        // nextSibling  节点的下一个兄弟节点
        // nextElementSibling 节点的下一个兄弟元素（ie9以下不支持）


        // 5 节点属性API
        // setAttribute(name,value) 给元素设置属性
        // getAttribute(name)   获取元素属性

        // 6 直接修改元素的样式
        elem.style.color = 'red';
        elem.style.setProperty('font-size', '16px');
        elem.style.removeProperty('color');

        // 7 动态添加样式
        var style = document.createElement('style');
        style.innerHTML = 'body{color:red} #top:hover{background-color: red;color: white;}';
        document.head.appendChild(style);

        // 8 window.getComputedStyle

        // 用法是：var style = window.getComputedStyle(element[, pseudoElt]);
        // element:目标元素的DOM对象
        // pseudoElt:指明要匹配的伪元素,对于普通元素必须指定为null(或省略)(or not specified翻译



        //this.$router.push() 这个会向history栈堆加一天新的记录！点击返回时会返回到上一级
        //this.$router.replace 这个不会像history栈堆加新的记录！点击返回时会返回到上上级



        this.$nextTick 和 this.$set 的作用（数据驱动和数据更新）

 
      <!-- 微信图片上传 -->
        // handleChooseImage() {
    //   wx.chooseImage({
    //     count: 9,
    //     sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
    //     sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
    //     success: res => {
    //       console.log(res);
    //       let localIds = res.localIds;
    //       this.imgs = localIds;
    //       // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
    //       // 判断 ios
    //       // if (window.__wxjs_is_wkwebview) {
    //       //   this.handleLocalImgData(localIds);
    //       // } else {
    //       //   localIds.forEach(element => {
    //       //     this.imagesList.push(element);
    //       //   });
    //       // }
    //       this.handleUploadImage(localIds);
    //     },
    //     fail: res => {
    //       alert("失败");
    //     }
    //   });
    // },

    // handleUploadImage(localIds) {
    //   let i = 0;
    //   let length = localIds.length;
    //   let upload = () => {
    //     let loacId = localIds[i];

    //     // if (window.__wxjs_is_wkwebview) {
    //     //   if (loacId.indexOf("wxlocalresource") != -1) {
    //     //     loacId = loacId.replace("wxlocalresource", "wxLocalResource");
    //     //   }
    //     // }
    //     wx.uploadImage({
    //       localId: loacId, // 需要上传的图片的本地ID，由chooseImage接口获得
    //       isShowProgressTips: 1, // 默认为1，显示进度提示
    //       success: res => {
    //         console.log(res);
    //         let serverId = res.serverId; // 返回图片的服务器端ID
    //         this.serverId.push(serverId);
    //         i++;
    //         i < length && upload();
    //         console.log(this.serverId);
    //       },
    //       fail: res => {
    //         alert("失败");
    //       }
    //     });
    //   };
    //   upload();
    // },





