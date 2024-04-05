package com.nowakkacper.MyShelf.controller;

import com.nowakkacper.MyShelf.model.LoginModel;
import com.nowakkacper.MyShelf.model.RegisterModel;
import com.nowakkacper.MyShelf.security.jwt.UserResponse;
import com.nowakkacper.MyShelf.service.AuthorizationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/auth")
public class AuthorizationController {

    private final AuthorizationService authorizationService;

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@Valid @RequestBody LoginModel loginModel){
        return authorizationService.login(loginModel);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterModel registerModel){
        return authorizationService.register(registerModel);
    }
}
