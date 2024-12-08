package com.Ketan.Config;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
@EnableWebSecurity
public class AppConfig {
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    // http.sessionManagement(management->management.sessionCreationPolicy(SessionCreationPolicy.STATELESS)).authorizeHttpRequests(authorize->authorize.requestMatchers("/api/admin/**").hasAnyRole("ADMIN","RESTAURANT_OWNER").requestMatchers("/api/**").authenticated().anyRequest().permitAll()).csrf(csrf->csrf.disable());
    http
    .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
    .authorizeHttpRequests(authorize -> authorize
        .requestMatchers("/api/admin/**").hasAnyRole("ADMIN", "RESTAURANT_OWNER")
        .requestMatchers("/api/**").authenticated()
        .anyRequest().permitAll()
    )
    .addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class).csrf(csrf->csrf.disable()).cors(cors->cors.configurationSource(corsConfigurationSource()));
        return http.build();
    }
    private CorsConfigurationSource corsConfigurationSource() {
        return new CorsConfigurationSource(){
            @Override
            public CorsConfiguration getCorsConfiguration(HttpServletRequest request){
                CorsConfiguration cors = new CorsConfiguration();
                cors.setAllowedOrigins(Arrays.asList("http://localhost:8080","http://localhost:3000")); // which origins are allowed // * means all origins are allowed
                cors.setAllowedMethods(Collections.singletonList("*")); //
                cors.setAllowedHeaders(Collections.singletonList("*"));// which headers are allowed in the request // * means all headers are allowed like authorization, content-type etc
                cors.setExposedHeaders(Arrays.asList("Authorization")); // which headers are allowed in the response
                cors.setAllowCredentials(true); 
                cors.setMaxAge(3600L);
                return cors;
            }
        };
    }
//     @Bean
// public CorsConfigurationSource corsConfigurationSource() {
//     CorsConfiguration corsConfiguration = new CorsConfiguration();
//     corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:8080"));
//     corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
//     corsConfiguration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
//     corsConfiguration.setExposedHeaders(Arrays.asList("Authorization"));
//     corsConfiguration.setAllowCredentials(true);
//     corsConfiguration.setMaxAge(3600L);

//     UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//     source.registerCorsConfiguration("/**", corsConfiguration);
//     return source;
// }

    @Bean
    PasswordEncoder passwordEncoder(){ 
        return new BCryptPasswordEncoder(); //whenever we want to encode password we will use this object of BCryptPasswordEncoder
    }
}
// can i use this code for any project irrespective of the domain?
// so using same code will implement security for any project? no need to change as it does not depend on any entity or domain?
