## 文件解释 ##
-router  路由模块中，只存放客户端的请求与处理函数之间的映射关系
    --user.js 作为用户的路由模块
    --userInfo.js 作为用户信息处理的路由模块
    --city.js 作为城市的路由模块
    --views.js 作为景点的路由模块
    --interpreter.js 作为讲解器的路由模块
    --operate.js 作为购买、录制讲解器的路由模块
    
-router_handler  路由处理函数模块中，专门负责存放每个路由对应的处理函数
    --user.js 作为用户的路由模块
    --userInfo.js 作为用户信息处理的路由模块
    --city.js 作为城市的路由模块
    --views.js 作为景点的路由模块
    --interpreter.js 作为讲解器的路由模块
    --interpreterInfo.js 作为购买、录制讲解器的路由模块
-schema 数据库数据规则
    --config.js 全局配置
    --user.js 用户注册登录 表单规则
    --city.js 城市 表单规则
    --views.js 景点 表单规则
    --interpreter.js 讲解器 表单规则
-db 连接数据库
app.js  整个项目的入口文件


### 项目启动 ###
nodemon app.js
地址：http://127.0.0.1:3007/

### 连接数据库 ###

### 用户权限 ###
1：平台管理员
2：发布音频者（可以提现，登录网页版录制音频）
3：用户（登录APP）
