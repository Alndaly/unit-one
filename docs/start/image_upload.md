# 图片上传

:::info
目前我提供的小程序源码仅支持上传到阿里云OSS，如需使用其他云服务，请自行修改源码。
:::

## 配置Bucket跨域访问

客户端进行表单直传到OSS时，会从浏览器向OSS发送带有Origin头的请求消息。OSS对带有Origin头的请求消息会进行跨域规则（CORS）的验证。因此需要为Bucket设置跨域规则以支持Post方法。

1. 登录OSS管理控制台。
2. 单击Bucket 列表，然后单击目标Bucket名称。
3. 在左侧导航栏，选择数据安全 > 跨域设置。
4. 在跨域设置页面，单击创建规则，配置如下图所示。
:::warning
为了您的数据安全，实际使用时建议将来源填写为实际允许访问的域名。更多信息。请参见设置跨域访问。
:::tip 
微信小程序Referer `https://servicewechat.com/*`
:::
![](https://oss.kinda.info/image/Screenshot%202023-11-03%20at%2022.26.36.png)
5. 单击确定。

## 微信小程序配置域名白名单

您可以为微信小程序配置域名白名单，以实现微信小程序和OSS Bucket之间的正常通信。

1. 登录OSS管理控制台。
2. 单击Bucket 列表，然后单击目标Bucket名称。
3. 在存储空间概览页面的访问端口区域，查看Bucket域名。
4. 登录微信小程序平台，将上传和下载的合法域名填写为Bucket的外网访问域名。

:::tip
实际业务中，建议您将OSS提供的外网域名和您自己的域名进行绑定，以便使用自定义域名访问OSS存储空间中的文件。配置步骤，请参见绑定自定义域名。
:::

## 获取签名

为了您的数据安全，建议使用签名方式上传文件。

使用服务端签名时，您需要先搭建一个签名服务，然后由客户端调用签名服务生成签名。

服务端签名源码`uploadOssHelper.js`代码如下：


```js
const crypto = require("crypto-js");

class MpUploadOssHelper {
  constructor(options) {
    this.accessKeyId = options.accessKeyId;
    this.accessKeySecret = options.accessKeySecret;
    // 限制参数的生效时间，单位为小时，默认值为1。
    this.timeout = options.timeout || 1; 
    // 限制上传文件的大小，单位为MB，默认值为10。
    this.maxSize = options.maxSize || 10;
  }

  createUploadParams() {
    const policy = this.getPolicyBase64();
    const signature = this.signature(policy);
    return {
      OSSAccessKeyId: this.accessKeyId,
      policy: policy,
      signature: signature,
    };
  }

  getPolicyBase64() {
    let date = new Date();
    // 设置policy过期时间。
    date.setHours(date.getHours() + this.timeout);
    let srcT = date.toISOString();
    const policyText = {
      expiration: srcT,
      conditions: [
        // 限制上传文件大小。
        ["content-length-range", 0, this.maxSize * 1024 * 1024],
      ],
    };
    const buffer = Buffer.from(JSON.stringify(policyText));
    return buffer.toString("base64");
  }

  signature(policy) {
    return crypto.enc.Base64.stringify(
      crypto.HmacSHA1(policy, this.accessKeySecret)
    );
  }
}

module.exports = MpUploadOssHelper;
```

服务端接口示例
以Express为例，接口代码如下：

```js
const express = require("express");
const app = express();
const MpUploadOssHelper = require("./uploadOssHelper.js");

app.get("/getPostObjectParams", (req, res) => {
  const mpHelper = new MpUploadOssHelper({
    // 从环境变量中获取访问凭证。运行本代码示例之前，请确保已设置环境变量OSS_ACCESS_KEY_ID和OSS_ACCESS_KEY_SECRET。
    accessKeyId: process.env.OSS_ACCESS_KEY_ID,
    accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
    // 限制参数的生效时间，单位为小时，默认值为1。
    timeout: 1,
    // 限制上传文件大小，单位为MB，默认值为10。
    maxSize: 10,
  });

  // 生成参数。
  const params = mpHelper.createUploadParams();

  res.json(params);
});
```

:::tip
这部分服务我亦已经打包开源，你只需要修改`process.env.OSS_ACCESS_KEY_ID`和`process.env.OSS_ACCESS_KEY_SECRET`即可。
:::

## 使用微信小程序上传

使用`uploadFile`接口上传文件，示例代码如下：

:::tip
实际开源的代码中这部分功能我已经封装完成，你只需要调用即可。
:::

```js
const host = '<host>';
const signature = '<signatureString>';
const ossAccessKeyId = '<accessKey>';
const policy = '<policyBase64Str>';
const key = '<object name>';
const securityToken = '<x-oss-security-token>'; 
const filePath = '<filePath>'; // 待上传文件的文件路径。
wx.uploadFile({
  url: host,
  filePath: filePath,
  name: 'file', // 必须填file。
  formData: {
    key,
    policy,
    OSSAccessKeyId: ossAccessKeyId,
    signature,
    // 'x-oss-security-token': securityToken // 使用STS签名时必传。
  },
  success: (res) => {
    if (res.statusCode === 204) {
      console.log('上传成功');
    }
  },
  fail: err => {
    console.log(err);
  }
});
```