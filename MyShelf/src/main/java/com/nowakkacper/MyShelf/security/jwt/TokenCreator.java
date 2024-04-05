package com.nowakkacper.MyShelf.security.jwt;

import com.nowakkacper.MyShelf.security.userDetails.UserDetailsImpl;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class TokenCreator {

    private final SecretKey jwtSecretKey;

    @Value("${token.expiration.time}")
    private Long expTime;

    public String createToken(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("roles", userDetails.getAuthorities())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expTime))
                .signWith(SignatureAlgorithm.HS512, jwtSecretKey.getEncoded())
                .compact();
    }
}
