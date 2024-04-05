    package com.nowakkacper.MyShelf.security.jwt;

    import com.nowakkacper.MyShelf.repository.UserRepository;
    import com.nowakkacper.MyShelf.security.userDetails.UserDetailsServiceImpl;
    import io.jsonwebtoken.*;
    import jakarta.servlet.FilterChain;
    import jakarta.servlet.ServletException;
    import jakarta.servlet.http.HttpServletRequest;
    import jakarta.servlet.http.HttpServletResponse;
    import lombok.RequiredArgsConstructor;
    import org.slf4j.Logger;
    import org.slf4j.LoggerFactory;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
    import org.springframework.security.core.context.SecurityContextHolder;
    import org.springframework.security.core.userdetails.UserDetails;
    import org.springframework.stereotype.Component;
    import org.springframework.util.StringUtils;
    import org.springframework.web.filter.OncePerRequestFilter;

    import javax.crypto.SecretKey;
    import java.io.IOException;

    @Component
    @RequiredArgsConstructor
    public class TokenFilter extends OncePerRequestFilter {

        private final SecretKey jwtSecretKey;

        //@Autowired
        private final UserDetailsServiceImpl userDetailsService;

        @Autowired
        UserRepository userRepository;
    
        private static final Logger logger = LoggerFactory.getLogger(TokenFilter.class);
    
        @Override
        protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
            try{
                String token = parseJwt(request);
                if(token != null && validateJwtToken(token)){
                    String userName = getUsernameFromToken(token);
                    UserDetails userDetails = userDetailsService.loadUserByUsername(userName);
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(userDetails,null, userDetails.getAuthorities());

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            } catch (Exception e) {
                logger.error("Cannot set user authentication: {}", e);
            }
            chain.doFilter(request, response);
        }
    
        private String parseJwt(HttpServletRequest request){
            String header = request.getHeader("Authorization");
            if (StringUtils.hasText(header) && header.startsWith("Bearer ")) {
                return header.substring(7);
            }
            return null;
        }
    
        private String getUsernameFromToken(String token){
            return Jwts.parserBuilder().setSigningKey(jwtSecretKey).build().parseClaimsJws(token).getBody().getSubject();
        }
    
        public boolean validateJwtToken(String authToken) {
            try {
                Jwts.parserBuilder().setSigningKey(jwtSecretKey).build().parseClaimsJws(authToken);
                return true;
            } catch (SignatureException e) {
                logger.error("Invalid JWT signature: {}", e.getMessage());
            } catch (MalformedJwtException e) {
                logger.error("Invalid JWT token: {}", e.getMessage());
            } catch (ExpiredJwtException e) {
                logger.error("JWT token is expired: {}", e.getMessage());
            } catch (UnsupportedJwtException e) {
                logger.error("JWT token is unsupported: {}", e.getMessage());
            } catch (IllegalArgumentException e) {
                logger.error("JWT claims string is empty: {}", e.getMessage());
            }
    
            return false;
        }
    
    }
