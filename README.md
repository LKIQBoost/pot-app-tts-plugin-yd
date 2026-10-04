# Pot-App 有道翻译 TTS 插件

为 [Pot](https://github.com/pot-app/pot-app) 提供的有道发音合成插件，使用 `pronounce/base` 接口。

## 功能

- 支持多种语言的单词/文本发音
- 支持英式 / 美式发音切换

## 使用方法

1. 下载 [Release](https://github.com/LKIQBoost/pot-app-tts-plugin-yd/releases) 中的 `plugin.com.LKIQBoost.youdao_tts.potext`
2. 在 Pot 中依次点击 `首选项` -> `服务` -> `语音合成` -> `添加外部插件`，选择下载的 `.potext` 文件
3. 将 `有道翻译` 加入语音合成服务即可使用

## 接口说明

请求地址：`https://dict.youdao.com/pronounce/base`

签名参数（`pointParam` 为参与签名的字段名，按字典序排列，末尾追加 `key`）：

```text
keyfrom = "webfanyi"
keyid   = "voiceFanyiWeb"
product = "webfanyi"
secret  = "qCG2vdP92hOXDcKa"

1. 合并默认参数（appVersion/client/mid/vendor/screen/model/imei/network/mysticTime/yduuid）
   与 le、word、type、rate、phonetic、id
2. 删除值为空字符串的字段
3. 按字段名升序排序，追加 key，令 key = secret
4. sign = md5(排序字段以 k=v 用 & 拼接的字符串)
5. pointParam = 排序字段名 join(",")
```

## 开发

```bash
zip plugin.com.LKIQBoost.youdao_tts.potext info.json youdao.svg main.js
```

或直接推送至 GitHub，由 Actions 自动打包。
