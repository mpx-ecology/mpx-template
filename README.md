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

## 测试

目前通过testfile里准备的伪造好的meta信息和/__test__文件夹里的脚本对项目进行基本的测试以保证基础的构建在各种条件下均稳定可靠。新增条件建议补充对应的测试case
