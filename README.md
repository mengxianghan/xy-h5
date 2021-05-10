# h5-模板

## 预览
[测试地址](http://****.com)

## 运行
### 安装依赖

```text
npm install
or
npm install --registry https://registry.npm.taobao.org
```

### 本地运行

```shell
npm run serve
```

## 打包
### 开发环境

```shell
npm run build:dev
```

### 测试环境

```shell
npm run build:test
```

### 预生产环境

```shell
npm run build:pre
```

### 生产环境

```shell
npm run build:prod
```

### 性能分析

```shell
npm run build:report
```

## 发布

- 安装依赖
- 代码打包（针对要发布的环境进行打包，打包后的文件存放在 dist 目录下）
- 复制 dist 目录下代码进行发布

### nginx 配置

```
location /api/ {
    rewrite /api/(.*?)$ /$1 break;
    proxy_pass https://****.com;
}
```