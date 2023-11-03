# 开放接口

这部分仅提供接口API，可供团队开发使用。

:::warning
默认的开源代码后端中涉及用户操作和这部分接口强绑定，如果不使用这部分接口，用户逻辑请自行实现。

**强烈建议使用本套用户体系，否则控制台中的数据看板和管理无法正常使用！！！**
:::

:::info
`API-KEY`就是[获取应用临时Token](#获取应用临时token)时返回的`access_token`。

对于需要API-KEY的请求默认请在请求的请求头中增加如下字段：
```
A-API-KEY: your access_token
```
:::

## 获取应用临时Token

### API

`https://api.unit-one.top/app/token`

### 传参

| 参数名  | 参数含义 | 参数示例 |
| ------- | -------- | -------- |
| app_id  | 应用id   | 1243     |
| app_key | 应用密钥 | adasdasd |

### 返回范例

```json
{
	"code": 20000,
	"msg": "success",
	"data": {
	    "access_token": "daskdnaskdadass",
      	"refresh_token": "dasdniuqwhiohqwins",
	    "expire": 3600
    }
}
```

## 用户注册

> 此接口需要传API-KEY

### API 

`https://api.unit-one.top/user/create?type=wx-mini`

### 请求方式

`POST`

### 传参

| 参数名 | 参数含义     | 参数示例    |
| ------ | ------------ | ----------- |
| code   | 微信登陆code | dajisjdoias |

### 返回范例

```json
{
	"code": 20000,
	"msg": "success",
  	"data": {
      	"id": 123
    }
}
```

## 用户信息更新

> 此接口需要传API-KEY

### API 

`https://api.unit-one.top/user/update`

### 请求方式

`POST`

### 传参

| 参数名    | 参数含义 | 参数示例 |
| --------- | -------- | -------- |
| id        | 用户id   | 132      |
| nickname  | 昵称     |          |
| gender    | 性别     |          |
| age       | 年龄     |          |
| signature | 个性签名 |          |
| is_online | 是否在线 |          |

### 返回范例

```json
{
    "code": 20000,
    "msg": "success",
  	"data": {
      	"id": 123
    }
}
```

## 用户注销

> 此接口需要传API-KEY

### API 

`https://api.unit-one.top/user/delete`

### 请求方式

`POST`

### 传参

| 参数名 | 参数含义 | 参数示例 |
| ------ | -------- | -------- |
| id     | 用户id   | 132      |

### 返回范例

```json
{
	  "code": 20000,
	  "msg": "success"
}
```

## 获取平台能力清单

:::tip
此部分是收费项目，基础小程序初步规划仅提供日常交流和沟通。具体的小程序内嵌能力配置详情可见控制台内小程序配置页面。
:::

> 此接口需要传API-KEY

### API 

 `https://api.unit-one.top/app/ability`

### 请求方式

`POST`

### 传参

此接口不需要额外传参

### 返回范例

```json
{
    "code": 20000,
    "msg": "success",
    "data": {
        "ability": [
          	{
                "id": 1,
                "name": "树洞",
                "image_url": "https://test.com/1.png",
                "create_time": "2020-1-1",
                "update_time": "2020-1-1"
            }
        ]
    }
}
```