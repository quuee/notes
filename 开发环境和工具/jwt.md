## JWT

jwt框架很多，使用这个比较简单已用的nimbus-jose-jwt

### maven安装

```xml
        <dependency>
            <groupId>com.nimbusds</groupId>
            <artifactId>nimbus-jose-jwt</artifactId>
            <version>${jwt.version}</version>
        </dependency>
```

### JWTUtil

```java
package com.xxx.xcx01_server.common.utils;


import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jose.shaded.gson.internal.LinkedTreeMap;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.xxx.xcx01_server.common.exception.ErrorCode;
import com.xxx.xcx01_server.common.exception.ServerException;
import com.xxx.xcx01_server.entity.PayloadDTO;

import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;


public class JWTUtil {

    public static String secret = "xcx1234567890xcx0987654321xcxxcx1234567890xcx0987654321xcxxcx1234567890xcx0987654321xcxxcx1234567890xcx0987654321xcxxcx1234567890xcx0987654321xcxxcx1234567890xcx0987654321xcx";

    /**
     * 生成
     *
     * @param payloadDTO
     * @return
     */
    public static String generateToken(PayloadDTO payloadDTO) throws JOSEException {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, 60);
        //创建HMAC签名器
        JWSSigner jwsSigner = new MACSigner(secret);
        //创建JWS头，设置签名算法和类型
        JWSHeader jwsHeader = new JWSHeader.Builder(JWSAlgorithm.HS256).type(JOSEObjectType.JWT).build();

        JWTClaimsSet jwtUser = new JWTClaimsSet.Builder()
                .jwtID(UUID.randomUUID().toString().replace("-", ""))
                .claim("jwtUser", payloadDTO)
                .expirationTime(calendar.getTime())
                .build();
        //创建JWS对象
        SignedJWT signedJWT = new SignedJWT(jwsHeader, jwtUser);

        signedJWT.sign(jwsSigner);

        return signedJWT.serialize();
    }

    public static LinkedTreeMap<String,Object> verify(String token) throws ParseException, JOSEException {
        //从token中解析JWS对象
        SignedJWT signedJWT = SignedJWT.parse(token);
        //创建HMAC验证器
        JWSVerifier jwsVerifier = new MACVerifier(secret);

        //验证token是否正确
        boolean verify = signedJWT.verify(jwsVerifier);
        //验证是否过期
        boolean before = new Date().before(signedJWT.getJWTClaimsSet().getExpirationTime());
        if (!verify || !before) {
            throw new ServerException(ErrorCode.TOKENEXPIRED);
        }

        LinkedTreeMap<String,Object> jwtUser = (LinkedTreeMap<String,Object>) signedJWT.getJWTClaimsSet().getClaim("jwtUser");
        return jwtUser;
    }
}
```
