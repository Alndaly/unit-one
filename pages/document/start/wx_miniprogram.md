# 微信小程序注册

## 登录公众平台

注册登录[微信公众平台](https://mp.weixin.qq.com)

## 找到小程序AppId（小程序Id）和AppSecret（小程序密钥）

左侧菜单 开发=>开发管理

顶部tab选择开发设置

![](https://oss.kinda.info/image/Screenshot%202023-11-04%20at%2010.34.11.png)

记下AppId和AppSecret，AppSecret重置后只会出现一次，需要记录下来

## 建立接口调用白名单

还是上面的目录下，在IP白名单中添加unit-one服务IP地址：`43.153.44.199`