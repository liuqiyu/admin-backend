# express-session

## 作用

用指定的参数创建一个session中间件，session数据不是保存在cookie中，仅仅sessionID保存到cookie中，session的数据保存在服务器。

## 相关参数

* `cookie`:  `session ID` 的cookie，默认是 `{ path: '/', httpOnly: true, secure: false, maxAge: null }. `
* `genid`: 产生一个新的 `sessionID` 的函数，一个返回值是 `String` 类型的函数会被作为 `sessionID`.这个函数的第一个参数是 `req`,所以如果你想要req中的参数产生sessionID还是很不错的 
    ```
    app.use(session({
              genid: function(req) {
                return genuuid() // use UUIDs for session IDs 
              },
              secret: 'keyboard cat'
            })
    ```
* `name`: 在 `response` 中 `sessionID`这个 `cookie` 的名称。也可以通过这个 `name`  获取，默认是 `connect.id`。
* `resave`: 强制 `session` 保存到 `session store` 中。即使请求中这个 `session` 没有被修改。
    默认是true,但是默认值已经过时，因此以后default可能会被修改。因此好好研究你的需求选择一个最适用的。大多数情况下你可能需要false。
    最好的知道你的store是否需要设置resave的方法是通过查看你的store是否实现了touch方法(删除那些空闲的session。同时这个方法也会通知session store指定的session 是活动态的)，
    如果实现了那么你可以用resave:false,如果没有实现touch方法，同时你的store对保存的session设置了一个过期的时间，那么建议你用resave:true 
* `rolling`: 强制在每一个response中都发送session标识符的cookie(如css文件的set-cookie响应头)。如果把expiration设置为一个过去的时间那么 
                       那么过期时间设置为默认的值。roling默认是false。如果把这个值设置为true但是saveUnitialized设置 
                       为false,那么cookie不会被包含在响应中( 没有初始化的session) 
* `saveUninitialized`: 强制没有“初始化”的session保存到storage中，没有初始化的session指的是：刚被创建没有被修改 
                     如果是要实现登陆的session那么最好设置为false(reducing server storage usage, or complying with laws that require permission before setting a cookie) 
                     而且设置为false还有一个好处，当客户端没有session的情况下并行发送多个请求时。默认是true,但是不建议使用默认值。 
* `secret`: 用于对sessionID的cookie进行签名，可以是一个string(一个secret)或者数组(多个secret)。如果指定了一个数组那么只会用 
                      第一个元素对sessionID的cookie进行签名，其他的用于验证请求中的签名。 
* `store`: 保存session的地方，默认是一个MemoryStore实例 
* `unset`: 对没有设置的req.session进行控制，通过delete或者设置为null。默认是keep,destory表示当回应结束后会销毁session，keep表示session会被保存 
           但是在请求中对session的修改会被忽略，也不会保存


## 相关方法

* `Session.regenerate()`: 产生一个session，调用这个方法那么一个新的SID和Session实例就会被创建，同时放置在req.session中 
* `session.destory()`:  销毁session，同时在req.session中被移除，但是在下一次请求的时候又会被创建 
    ```
     req.session.destroy(function(err) {
          // cannot access session here 
        })
    ```
* `session.reload()`: 重新装载session中的数据 
* `session.save()`:  把session中的数据重新保存到store中，用内存的内充去替换掉store中的内容。这个方法在HTTP的响应后自动被调用 
                       如果session中的数据被改变了（这个行为可以通过中间件的很多的配置来改变），正因为如此这个方法一般不用显示调用。 
                       但是在长连接的websocket中这个方法一般需要手动调用  
* `session.touch()`: 更新maxAge属性，一般不需要手动调用，因为session的中间件已经替你调用了 
