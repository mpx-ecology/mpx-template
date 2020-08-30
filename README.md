# mpx-template

![test-status](https://github.com/mpx-ecology/mpx-template/workflows/test/badge.svg)

@mpxjs/cli生成项目所使用的模板。

## 开发

nunjucks参考文档：https://nunjucks.bootcss.com/templating.html

开发完成后可通过此命令本地验证：

```bash
mpx init --offline {absoulte path to project} mpxdemo

# example
mpx init --offline /Users/xxxx/Desktop/opensource/mpx-template mpxtemplatedemo
```

模板总体可分为两种类型的，小程序业务项目开发 和 插件/云开发。

业务项目开发，整个项目就是一个业务项目，src下将是这个小程序的全部代码。

插件和云开发，src下则包含 小程序 和 插件/云函数 目录。插件模式下，小程序部分的代码只是个用于调试的辅助工具。云开发则两个文件夹都很重要。

## 测试

目前通过testfile里准备的伪造好的meta信息和/__test__文件夹里的脚本对项目进行基本的测试以保证基础的构建在各种条件下均稳定可靠。新增条件建议补充对应的测试case。

测试目前主要测构建是否能正常完成，构建完成后，对应目录是否有符合预期的文件，目前并未详细检查文件具体内容。

后续待探索如何结合小程序 Automator 进行运行时检查，及如何与mpxjs框架主仓库联动，在主框架代码变更时进行测试，相当于一个集成测试。
