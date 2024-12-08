package com.Ketan.Config;

import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.IOException;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtTokenValidator extends OncePerRequestFilter{
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwt = request.getHeader(JwtConstant.JWT_HEADER);
        if (request.getRequestURI().equals("/auth/signup") && (jwt == null || jwt.isEmpty())) {
            try{
                filterChain.doFilter(request, response);
            } catch (Exception e){
                throw new BadCredentialsException("Invalid request");
            
            }// Allow the request to proceed without authentication
            return;
        }
        if (request.getRequestURI().equals("/auth/signin")) {
            try{
                filterChain.doFilter(request, response);
            } catch (Exception e){
                throw new BadCredentialsException("Invalid request");
            }// Allow the request to proceed without authentication
            return;
        }
        if (jwt != null){
            jwt = jwt.substring(7);
            try {
                SecretKey secretKey = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes()); // This line is used to create a secret key.
                Claims claims = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(jwt)
                    .getBody(); // This line is used to parse the JWT and get the claims.
                String email = String.valueOf(claims.get("email"));
                String authorities=String.valueOf(claims.get("authorities"));
                List<GrantedAuthority> authorityList = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);
                Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, authorityList);
                SecurityContextHolder.getContext().setAuthentication(authentication); // This line is used to set the authentication in the security context. //oh then this authentication is used in the controller to get the user details.
                filterChain.doFilter(request, response); // is this required? // Yes, this line is used to allow the request to proceed. but authentication is already set in the security context. //then also we need to call this line? // Yes, this line is used to allow the request to proceed.
            } catch (Exception e){
                throw new BadCredentialsException("Invalid token");
            }
        }
        else{
            throw new BadCredentialsException("Token not found");
        }
    }
}
