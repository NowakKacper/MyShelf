package com.nowakkacper.MyShelf.service;

import com.nowakkacper.MyShelf.security.userDetails.UserDetailsImpl;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


@Service
public class BookAuthenticationService {
    public int getUserId(Authentication authentication) {
        UserDetailsImpl principal = (UserDetailsImpl) authentication.getPrincipal();
        return principal.getId();
    }

    public boolean isInstanceUserDetailsImpl(Authentication authentication) {
        return authentication.getPrincipal() instanceof UserDetailsImpl;
    }

    Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }
}
