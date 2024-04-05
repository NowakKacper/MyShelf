package com.nowakkacper.MyShelf.security.jwt;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class UserResponse {

    private String token;

    private final String type = "Bearer";

    private int id;

    private String username;

    private String email;

    private List<String> roles;
}
