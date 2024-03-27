package com.nowakkacper.MyShelf.service;

import com.nowakkacper.MyShelf.entity.Role;
import com.nowakkacper.MyShelf.entity.RoleEnum;
import com.nowakkacper.MyShelf.entity.User;
import com.nowakkacper.MyShelf.model.LoginModel;
import com.nowakkacper.MyShelf.model.RegisterModel;
import com.nowakkacper.MyShelf.repository.RoleRepository;
import com.nowakkacper.MyShelf.repository.UserRepository;
import com.nowakkacper.MyShelf.security.jwt.TokenCreator;
import com.nowakkacper.MyShelf.security.jwt.UserResponse;
import com.nowakkacper.MyShelf.security.userDetails.UserDetailsImpl;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Service
public class AuthorizationService {

    private final AuthenticationManager authenticationManager;

    private final TokenCreator tokenCreator;

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    public ResponseEntity<UserResponse> login(LoginModel loginModel) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginModel.getUsername(), loginModel.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = tokenCreator.createToken(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl)authentication.getPrincipal();

        List<String> roles = userDetails.getAuthorities().stream()
                .map(x -> x.getAuthority())
                .collect(Collectors.toList());


        return ResponseEntity.ok(
                new UserResponse(token,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    public ResponseEntity<?> register(RegisterModel registerModel){
        if(userRepository.existsByUsername(registerModel.getUsername())){
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }
        if(userRepository.existsByEmail(registerModel.getEmail())){
            return ResponseEntity.badRequest().body("Error: Email is already taken!");
        }
        User user = new User();
        user.setUsername(registerModel.getUsername());
        user.setEmail(registerModel.getEmail());
        user.setPassword(passwordEncoder.encode(registerModel.getPassword()));

        List<Role>roles = new ArrayList<>();
        Role role = roleRepository.findByName(RoleEnum.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        if(registerModel.getUsername().contains("ADMIN")){
            Role adminRole = roleRepository.findByName(RoleEnum.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(adminRole);
        }
        roles.add(role);
        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok("User are successfully registered");
    }
}
