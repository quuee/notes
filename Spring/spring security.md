### 认证过程

AbstractAuthenticationProcessingFilter  ->  获取请求参数，生成一个未认证的AuthenticationToken  ->  AuthenticationManager （根据AuthenticationToken分配provider） -> AuthenticationProvider -> UserDetails （查询数据库） -> 通过后生成已认证的AuthenticationToken -> 存放到SecurityContextHolder

### 鉴权过程

```java
public class AffirmativeBased extends AbstractAccessDecisionManager {
    
}
```

### 权限注解

(使用spring权限注解要写正确的el表达式)

#### 自定义权限检验
