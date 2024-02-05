### @liaoqizhun/icon-cli

iconfont 下载到项目相关文件目录

### 安装

```
npm i @liaoqizhun/icon-cli -D
pnpm add @liaoqizhun/icon-cli -D
```

### 指令

```
icon-cli update

```

### \*config 配置

项目根目录创建 icon-local.json 文件， ⚠️ .gitignore 文件忽略 icon-local.json

| 属性       | 说明                             | 默认值                                                              |
| ---------- | -------------------------------- | ------------------------------------------------------------------- |
| userName   | iconfont 账号名                  | -                                                                   |
| password   | iconfont 密码                    | -                                                                   |
| projectId  | iconfont 对应仓库的 id           | -                                                                   |
| targetPath | iconfont 项目目录 eg：src/styles | 默认根目录创建 \_temp_font 文件储存                                 |
| fileList   | iconfont 需要 copy 的文件        | ['iconfont.css', 'iconfont.ttf', 'iconfont.woff', 'iconfont.woff2'] |
