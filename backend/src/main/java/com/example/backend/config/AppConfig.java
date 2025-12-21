package com.example.backend.config;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
public class AppConfig {
	
	
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

    http
        // 1. Session Management (Updated for Spring Boot 3.1+)
        .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        
        // 2. Authorization (Updated to Lambda DSL)
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/**").authenticated()
            .anyRequest().permitAll()
        )
        
        // 3. Add Custom Filter
        .addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class)
        
        // 4. Disable CSRF (Updated)
        .csrf(csrf -> csrf.disable())
        
        // 5. CORS Configuration (Updated)
        .cors(cors -> cors.configurationSource(new CorsConfigurationSource() {
            @Override
            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                CorsConfiguration cfg = new CorsConfiguration();
                cfg.setAllowedOrigins(Arrays.asList(
                        "http://localhost:3000", 
                        "http://localhost:4000",
                        "http://localhost:4200",
                        "https://shopwithzosh.vercel.app",
                        "https://ecommerce-angular-blue.vercel.app/"
                ));
                cfg.setAllowedMethods(Collections.singletonList("*"));
                cfg.setAllowCredentials(true);
                cfg.setAllowedHeaders(Collections.singletonList("*"));
                cfg.setExposedHeaders(Arrays.asList("Authorization"));
                cfg.setMaxAge(3600L);
                return cfg;
            }
        }))
        
        // 6. Form Login & Basic Auth (Updated)
        .httpBasic(basic -> {})
        .formLogin(login -> {});

    return http.build();
}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
