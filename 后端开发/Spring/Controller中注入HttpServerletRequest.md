## Controller注入HttpServletRequest

*线程是安全的*

## 自带

    @RestController
    public class TestController {
    
        @Autowired
        private HttpServletRequest request;
    }

## lombok

    @RestController
    @RequiredArgsConstructor()
    public class TestController{
    
        private final HttpServletRequest request;
    
    }
