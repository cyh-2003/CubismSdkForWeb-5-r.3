仅将CubismSdkForWeb-5-r.3\Samples\TypeScript\Demo\src里的ts文件使用Deepseek翻译
仅自己造轮子使用

以下为官方翻译README.md原文件

[English](README.md) / [日本語](README.ja.md)

---

# Cubism Web 示例

这是一个展示由 Live2D Cubism Editor 输出的模型的应用程序示例。

它与 Cubism Web Framework 和 Live2D Cubism Core 一起使用。


## 许可证

在使用此 SDK 之前，请查看 [许可证](LICENSE.md)。


## 注意事项

在使用此 SDK 之前，请查看 [注意事项](NOTICE.md)。


## 与 Cubism 5 新功能及之前 Cubism SDK 版本的兼容性

此 SDK 与 Cubism 5 兼容。  
有关 Cubism 5 Editor 新功能的 SDK 兼容性，请参考 [此处](https://docs.live2d.com/en/cubism-sdk-manual/cubism-5-new-functions/)。  
有关与之前 Cubism SDK 版本的兼容性，请参考 [此处](https://docs.live2d.com/en/cubism-sdk-manual/compatibility-with-cubism-5/)。


## 目录结构



```
.
├─ .vscode          #  Visual Studio Code 的项目设置目录
├─ Core             # 包含 Live2D Cubism Core 的目录
├─ Framework        #  包含渲染和动画功能等源代码的目录
└─ Samples
   ├─ Resources     # 包含模型文件和图片等资源的目录
   └─ TypeScript    # 包含 TypeScript 示例项目的目录
```



## Live2D Cubism Core for Web

用于加载模型的库。

此仓库不管理 Cubism Core。
从 [此处](https://www.live2d.com/download/cubism-sdk/download-web/) 下载 Cubism SDK for Web 并复制 Core 目录中的文件。


## 开发环境搭建

1. 安装 [Node.js] 和 [Visual Studio Code]
1. 在 Visual Studio Code 中打开 **此 SDK 的顶层目录** 并安装推荐的扩展
    * 除了弹出通知外，您还可以通过从扩展选项卡输入 `@recommended` 来查看其他扩展

### 示例演示的操作检查

在命令面板 (*查看 > 命令面板...*) 中输入 `>Tasks: Run Task` 以显示任务列表。

1. 从任务列表中选择 `npm: install - Samples/TypeScript/Demo` 以下载依赖包
1. 从任务列表中选择 `npm: build - Samples/TypeScript/Demo` 以构建示例演示
1. 从任务列表中选择 `npm: serve - Samples/TypeScript/Demo` 以启动用于操作检查的简单服务器
1. 在浏览器的 URL 字段中输入 `http://localhost:5000` 以访问
1. 从命令面板输入 `>Tasks: Terminate Task` 并选择 `npm: serve` 以终止简单服务器

有关其他任务，请参阅示例项目的 [README.md](Samples/TypeScript/README.md)。

注意：调试设置描述在 `.vscode/tasks.json` 中。

### 项目调试

在 Visual Studio Code 中打开 **此 SDK 的顶层目录** 并按 *F5* 键以启动 Debugger for Chrome。

您可以在 Visual Studio Code 中放置断点以与 Chrome 浏览器一起进行调试。

注意：调试设置描述在 `.vscode/launch.json` 中。


## SDK 手册

[Cubism SDK 手册](https://docs.live2d.com/cubism-sdk-manual/top/)


## 变更日志

示例 : [CHANGELOG.md](CHANGELOG.md)

框架 : [CHANGELOG.md](Framework/CHANGELOG.md)

核心 : [CHANGELOG.md](Core/CHANGELOG.md)


## 开发环境

### Node.js

* 23.4.0
* 22.12.0


## 操作环境

| 平台 | 浏览器 | 版本 |
| --- | --- | --- |
| Android | Google Chrome | 133.0.6943.50 |
| Android | Microsoft Edge | 131.0.2903.87 |
| Android | Mozilla Firefox | 133.0.3 |
| iOS / iPadOS | Google Chrome | 131.0.6778.134 |
| iOS / iPadOS | Microsoft Edge | 131.0.2903.92 |
| iOS / iPadOS | Mozilla Firefox | 133.3 |
| iOS / iPadOS | Safari | 18.2 |
| macOS | Google Chrome | 131.0.6778.140 |
| macOS | Microsoft Edge | 131.0.2903.99 |
| macOS | Mozilla Firefox | 133.0.3 |
| macOS | Safari | 18.2 |
| Windows | Google Chrome | 131.0.6778.140 |
| Windows | Microsoft Edge | 133.0.3065.69 |
| Windows | Mozilla Firefox | 133.0.3 |

注意：您可以通过运行 `./Samples/TypeScript/Demo/package.json` 中的 `serve` 脚本来启动用于操作检查的服务器。


## 贡献

有许多方式可以为项目做出贡献：记录错误、在此 GitHub 上提交拉取请求，以及在 Live2D 社区中报告问题和提出建议。

### 分叉和拉取请求

我们非常欢迎您的拉取请求，无论是修复、改进还是新功能。但请注意，包装器设计为尽可能轻量级和浅层，因此应仅针对错误修复和内存/性能改进。为了保持主仓库的清洁，请根据需要创建个人分叉和功能分支。

### 错误

我们定期在 Live2D 社区检查问题报告和功能请求。在提交错误报告之前，请在 Live2D 社区中搜索以查看是否已发布问题报告或功能请求。如果您发现您的问题已存在，请添加相关评论和您的反应。

### 建议

我们也对您对 SDK 未来的反馈感兴趣。您可以在 Live2D 社区提交建议或功能请求。为了使此过程更有效，我们要求您包含更多信息以帮助更清楚地定义它们。


## 论坛

如果您想建议或询问有关如何在用户之间使用 Cubism SDK 的问题，请使用论坛。

- [Live2D 创作者论坛](https://community.live2d.com/)
- [Live2D 公式クリエイターズフォーラム (日语)](https://creatorsforum.live2d.com/)
