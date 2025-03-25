## meilisearch document

### 安装

轻量全文检索工具 meilisearch 支持中文（结巴分词），mongodb mysql 全文检索好像用的少，es太重。
[Meilisearch Documentation](https://www.meilisearch.com/docs/learn/getting_started/installation)

[Meilisearch Documentation Api](https://www.meilisearch.com/docs/reference/api/overview)

```shell
docker run -d \
    -p 7700:7700 \
    -e MEILI_MASTER_KEY='123456'\
    -v $(pwd)/meili_data:/meili_data \
    getmeili/meilisearch:v1.3
```

自带一个web界面 http://ip:7700

### 使用

maven添加依赖

```xml
<dependency>
    <groupId>com.meilisearch.sdk</groupId>
    <artifactId>meilisearch-java</artifactId>
    <version>${meilisearch.version}</version>
</dependency>
```

#### 索引操作

##### 创建

```java
@Configuration
public class MeiliSearchConfig {

    @Bean
    public Index index() throws MeilisearchExceptio {
        // 创建索引
        Client client = new Client(new Config("http://192.168.2.13:7700", "123456"));
        // 指定索引名：goods 和主键字段：id
        String indexUid = client.createIndex("goods","id").getIndexUid();
        Index index = client.index(indexUid);
        return index;
    }
}
```

##### 列出索引

##### 更新索引

##### 删除索引

#### 文档操作

##### 创建文档

```url
curl \
-X POST 'http://localhost:7700/indexes/test/documents' \
--data '[{
    "id": 1,
    "title": "aaa",
    "author": "xxx"
}]'
```

```java
String s = objectMapper.writeValueAsString(list);
index.addDocuments(s);
```

##### 更新文档

##### 删除文档

##### 删除索引下全部文档

#### 查询操作

```url
curl \
-X POST 'http://localhost:7700/indexes/test/search'
  -H 'Authorization: Bearer MASTER_KEY' \
  -H 'Content-Type: application/jsonh' \
--data '{ "q": "xxx", "offset":0,"limit":100 }'" }'
```

```java
SearchRequest searchRequest = SearchRequest.builder().offset(pageNo).limit(pageSize).q(searchWord).build();
List<HashMap<String, Object>> hits = index.search(searchRequest).getHits();
```
