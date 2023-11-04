# 开源后端

:::warning
开源后端分为多个服务，请注意区分。
:::

:::tip
目前项目仍在测试阶段，等正式发布后会统一整合docker发布，方便你的部署。
:::

**项目开源地址**

- JAVA后端服务（小程序核心服务） https://github.com/Alndaly/pub-backend-unit-one
- NODEJS后端服务（图片上传服务） https://github.com/Alndaly/pub-upload-unit-one

## 下载源码

```shell
git clone git@github.com:Alndaly/pub-backend-unit-one.git
git clone git@github.com:Alndaly/pub-upload-unit-one.git
```

## 启动服务

```shell
cd pub-backend-unit-one
mvn package
java -jar target/pub-backend-unit-one-0.0.1.jar # 此处应使用实际打包生成的版本号
```

```shell
cd pub-upload-unit-one
node app.js
```

## 二次开发

可以根据你的偏好任意选择ide，JAVA我使用的是IDEA，Node我使用的是Visual Studio Code。