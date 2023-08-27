认证过程

AbstractAuthenticationProcessingFilter  ->  获取请求参数，生成一个未认证的AuthenticationToken  ->  AuthenticationManager （根据AuthenticationToken分配provider） -> AuthenticationProvider -> UserDetails （查询数据库） -> 通过后生成已认证的AuthenticationToken -> 存放到SecurityContextHolder
