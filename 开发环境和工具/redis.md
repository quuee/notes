## redis配置

```java
@Configuration
public class LettuceRedisConfig {

    @Bean
    public RedisTemplate<String, Serializable> redisTemplate(LettuceConnectionFactory connectionFactory){
        RedisTemplate<String, Serializable> redisTemplate = new RedisTemplate<String,Serializable>();

        GenericFastJsonRedisSerializer genericFastJsonRedisSerializer = new GenericFastJsonRedisSerializer();
        redisTemplate.setValueSerializer(genericFastJsonRedisSerializer);
        redisTemplate.setHashValueSerializer(genericFastJsonRedisSerializer);

        redisTemplate.setKeySerializer(genericFastJsonRedisSerializer);
        redisTemplate.setHashKeySerializer(genericFastJsonRedisSerializer);

        redisTemplate.setConnectionFactory(connectionFactory);

        redisTemplate.afterPropertiesSet();
        return redisTemplate;
    }

    /**
     * 配置监听容器
     * @param connectionFactory
     * @return
     */
    @Bean
    public RedisMessageListenerContainer container(RedisConnectionFactory connectionFactory) {
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        return container;
    }

}
```

### key过期监听

#### 继承KeyExpirationEventMessageListener

```java
@Component
public class RedisKeyExpirationListener extends KeyExpirationEventMessageListener {

    @Autowired
    private RedisMessageListenerContainer redisMessageListenerContainer;

    /**
     * 构造方法实例化时传入监听容器
     * @param redisMessageListenerContainer
     */
    public RedisKeyExpirationListener(RedisMessageListenerContainer redisMessageListenerContainer) {
        super(redisMessageListenerContainer);
    }

    /**
     *
     * @param message 失效的key
     * @param pattern 内容
     */
    @Override
    public void onMessage(Message message, byte[] pattern) {
        String format = MessageFormat.format("message:{0},pattern:{1}", message.toString(), pattern);
        System.out.println(format);
        super.onMessage(message, pattern);
    }
}
```
