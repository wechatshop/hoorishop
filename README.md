# hoorishop
hoorishop是一个基于go语言编写的后台的电商类微信小程序，系统只需安装nginx和mysql就可运行，无需其它插件。前端代码完全开源。前端基于开源程序
[`fire-shop-lite`](https://github.com/thundersword/fire-shop-lite)修改而来，同时提供对应的后端程序。我们提供尽可能详细的操作手册，即使不是开发人员，只要按照手册傻瓜式操作，也能快速搭建一套属于自己的电商小程序。帮助您以最低的成本试水微信电商。
# 后台演示地址(支持多账号、一个后台支持多个小程序)
   
[`https://www.tinywsn.com`](https://www.tinywsn.com)

[`https://www.tinywsn.com/#/user/reg`](https://www.tinywsn.com/#/user/reg)　注册地址(仅演示)  

后台和数数据库全部安装到您自己服务器上，后台使用费用`198元/年` ，`498元/终身`授权(提供带砍价拼团前端模板)  ，加VIP技术交流群　　

**后台布署自己的服务器上，数据完全自己掌握，使用不会有任何限制！**   

**其它项目使用后台已正常运营一年多，付费会员会程序会持续更新升级，BUG优先处理**

同时我们也提供[线下零售小程序](https://www.fecretail.com/)，基于SaaS的服务。  


# 安装说明
1、安装环境要求　　
服务器要求: Linux服务器 推荐CentOS 7_x64位　　　

数据库    : Mysql数据库UTF8编码　　

WEB服务器 : nginx　　

图片存储  : 七牛云对象存储或者阿里云OSS 都需要配置加速域名　

nginx需要安装HTTPS证书，配置nginx反向代理，安装包中提供示例可参考　　


2、如何安装?　　
1) 、上传安装到服务器上，并解压，创建mysql数据库，使用UTF8编码，同时执行安装包中的hoorishop.sql　　

2) 、程序需要加上可执行权限: chmod +x HOORISHOP_LINUX_X64　　

3) 、配置config，主要配置数据库IP、数据库的用户名和密码　　

4)、 上传授权文件lisence.dat到目录下面　　

5)、 执行程序: `./HOORISHOP_LINUX_X64`

   如果后台执行则执行命令: `nohup ./HOORISHOP_LINUX_X64  >/dev/null 2>&1 &`　
    
6)、执行上面程序会自动创建用户名:18012345678 密码:123456 的账号，可通过以上账号登陆,　　

　　用户名可直接要数据库中修改。同时系统也提供用户注册的功能，但需要开始阿里云的短信验证码的功能。　　
  
7)、系统配置参数设置　　

　修改[系统参数]=>[微信设置]=>[小程序配置]，修改APPID和AppSecre　　
  
  修改[系统参数]=>[微信设置]=>[修改微信支付商户信息]，修改支付API和密钥，上传支付证书(退款需要支付证书)　
    
  修改[系统参数]=>[系统配置]=>[账号设置]=>[个性域名]，同一系统中不能重复　　
    
　修改[系统参数]=>[系统配置]=>[文件存储配置]=>配置七牛云对象存储或者阿里云OSS参数，如果没有配置，不能上传图片　　
	
　其它的配置如快递接口、同城接口，根据需求自行配置即可。　　
	
8) 、小程序端配置　　

    配置config.js文件中的url字段: https://www.yourdomain.com/api/　　
    
    配置参数subDomain字段       : yourdomain (自己在后台设置的参数)　　
    
　　同时系统支付模板消息，根据参数配置即可。　　
	
	
# 功能特色
1.使用自定义导航组件，首页导航栏渐隐渐现　　

2.签到积分，支持自定义连续签到送积分规则　　

3.积分兑换礼券　　

4.首页自定义广告位　　

5.新人专享领券　　

……　　


技术交流QQ群 287063499　　加群请备注:github



