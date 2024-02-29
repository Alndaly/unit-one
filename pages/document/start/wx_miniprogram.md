# 微信小程序注册

1. 登录公众平台

注册登录[微信公众平台](https://mp.weixin.qq.com)

2. 获取小程序相关密钥信息
   1. 左侧菜单 开发=>开发管理
   2. 顶部tab选择开发设置

![](https://oss.kinda.info/image/Screenshot%202023-11-04%20at%2010.34.11.png)

记下AppId和AppSecret，AppSecret重置后只会出现一次，需要记录下来

3. 建立接口调用白名单

还是上面的目录下，在IP白名单中添加unit-one服务IP地址：`43.153.44.199`