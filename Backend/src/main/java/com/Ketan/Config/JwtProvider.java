package com.Ketan.Config;

import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.crypto.SecretKey;

import org.springframework.context.annotation.Bean;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtProvider {
    private SecretKey secretKey = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
    public String generateToken(Authentication auth){
        Collection<? extends GrantedAuthority> grantedAuthorities = auth.getAuthorities();
        String roles = populateAuthorities(grantedAuthorities);
        String jwt = Jwts.builder().setIssuedAt(new Date()).setExpiration(new Date(new Date().getTime() + 86400000)).claim("authorities", roles).claim("email",auth.getName()).signWith(secretKey).compact();
        return jwt;
    }
    public String GetEmailfromJwt(String jwt){
        jwt = jwt.substring(7);
        Claims claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(jwt).getBody();
        String email = String.valueOf(claims.get("email"));
        return email;
    }
    public String populateAuthorities(Collection<? extends GrantedAuthority> grantedAuthorities){
        Set<String> sb = new HashSet<>();
        for (GrantedAuthority grantedAuthority : grantedAuthorities){
            sb.add(grantedAuthority.getAuthority());
        }
        return String.join(",", sb);
    }
    //when do we put role of user in token?
    //ans when user logs in
}
