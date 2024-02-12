```java

@Configuration
public class JacksonConfig {

//     @Bean
//     @Order(Ordered.HIGHEST_PRECEDENCE)
//     public Jackson2ObjectMapperBuilderCustomizer customJackson() {
//         return builder -> {
//             builder.serializerByType(LocalDateTime.class,
//                     new LocalDateTimeSerializer(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
//             builder.serializerByType(LocalDate.class,
//                     new LocalDateSerializer(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
//             builder.serializerByType(LocalTime.class,
//                     new LocalTimeSerializer(DateTimeFormatter.ofPattern("HH:mm:ss")));
//             builder.deserializerByType(LocalDateTime.class,
//                     new LocalDateTimeDeserializer(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
//             builder.deserializerByType(LocalDate.class,
//                     new LocalDateDeserializer(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
//             builder.deserializerByType(LocalTime.class,
//                     new LocalTimeDeserializer(DateTimeFormatter.ofPattern("HH:mm:ss")));
//             builder.serializationInclusion(JsonInclude.Include.NON_NULL);
//             builder.failOnUnknownProperties(false);
//             builder.featuresToDisable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
//         };
//     }


    private static final String DEFAULT_DATETIME_PATTERN = "yyyy-MM-dd HH:mm:ss";

    private static final String DEFAULT_DATE_FORMAT = "yyyy-MM-dd";

    private static final String DEFAULT_TIME_FORMAT = "HH:mm:ss";

    @Bean
    @Order(Ordered.HIGHEST_PRECEDENCE)
    public Jackson2ObjectMapperBuilderCustomizer jackson2ObjectMapperBuilderCustomizer() {
        return builder -> {
            // 这一部分也可以在 yaml 中配置
            builder
                    // 序列化时，对象为 null，是否抛异常
                    .failOnEmptyBeans(false)
                    // 反序列化时，json 中包含 pojo 不存在属性时，是否抛异常
                    .failOnUnknownProperties(false)
                    // 禁止将 java.util.Date, Calendar 序列化为数字(时间戳)
                    .featuresToDisable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
                    // 设置 java.util.Date, Calendar 序列化、反序列化的格式
                    .dateFormat(new SimpleDateFormat(DEFAULT_DATETIME_PATTERN))
                    // 设置 java.util.Date、Calendar 序列化、反序列化的时区
                    .timeZone(TimeZone.getTimeZone("GMT+8"))
            ;
            
            // Jackson 序列化 long类型为String，解决后端返回的Long类型在前端精度丢失的问题
            builder.serializerByType(BigInteger.class, ToStringSerializer.instance);
            builder.serializerByType(Long.class, ToStringSerializer.instance);
            builder.serializerByType(Long.TYPE, ToStringSerializer.instance);

            // 配置 Jackson 反序列化 LocalDateTime、LocalDate、LocalTime 时使用的格式
            builder.deserializerByType(LocalDateTime.class, new LocalDateTimeDeserializer(DateTimeFormatter.ofPattern(DEFAULT_DATETIME_PATTERN)));
            builder.deserializerByType(LocalDate.class, new LocalDateDeserializer(DateTimeFormatter.ofPattern(DEFAULT_DATE_FORMAT)));
            builder.deserializerByType(LocalTime.class, new LocalTimeDeserializer(DateTimeFormatter.ofPattern(DEFAULT_TIME_FORMAT)));

            // 配置 Jackson 序列化 LocalDateTime、LocalDate、LocalTime 时使用的格式
            builder.serializers(new LocalDateTimeSerializer(DateTimeFormatter.ofPattern(DEFAULT_DATETIME_PATTERN)));
            builder.serializers(new LocalDateSerializer(DateTimeFormatter.ofPattern(DEFAULT_DATE_FORMAT)));
            builder.serializers(new LocalTimeSerializer(DateTimeFormatter.ofPattern(DEFAULT_TIME_FORMAT)));

        };
    }


}
```