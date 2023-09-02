## meilisearch document

### 安装

轻量全文检索工具 meilisearch 支持中文，mongodb mysql 全文检索好像用的少，es太重。
[Meilisearch Documentation](https://www.meilisearch.com/docs/learn/getting_started/installation)

```shell
docker run -d \
    -p 7700:7700 \
    -e MEILI_MASTER_KEY='123456'\
    -v $(pwd)/meili_data:/meili_data \
    getmeili/meilisearch:v1.3
```

自带一个web界面 http://ip:7700

### 使用

#### 添加索引

#### 添加文档
