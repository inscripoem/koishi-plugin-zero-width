# koishi-plugin-zero-width

[![npm](https://img.shields.io/npm/v/koishi-plugin-zero-width?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-zero-width)

一个用于处理零宽字符的 Koishi 插件。

*本指南使用 GPT 编写，如有错误请联系作者。*

## 💡 介绍

零宽字符（Zero Width Characters）是一类在显示时不占用宽度的 Unicode 字符。本插件提供了一系列处理零宽字符的实用工具，可以用于文本隐写、规避文本检测等场景。

## 📦 安装

```bash
npm install koishi-plugin-zero-width
```

或者使用 Koishi 插件市场进行安装。

## 🎮 使用方法

插件提供以下命令：

1. 将隐藏文本以零宽字符的形式嵌入到可见文本中。

```
zero embed <可见文本> <隐藏文本>
```

你也可以通过回复一条消息来快速处理，被回复的消息将作为可见文本。

2. 从文本中提取隐藏的零宽字符并解码。

```
zero extract <文本>
```

你可以直接回复一条包含零宽字符的消息来提取其中的隐藏内容。

3. 使用零宽字符分隔文本，可用于规避文本检测。

```
zero escape <文本>
```

同样支持通过回复消息来快速处理文本。

## 📝 示例

1. 嵌入隐藏文本：
```
> zero embed 你好 世界
嵌入结果：你好[包含隐藏文本]
```

2. 提取隐藏文本：
```
> zero extract 你好[包含隐藏文本]
可见文本：你好
隐藏文本：世界
```

## 📄 许可证

MIT License © 2024
