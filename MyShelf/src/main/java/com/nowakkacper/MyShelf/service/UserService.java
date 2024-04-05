package com.nowakkacper.MyShelf.service;

import com.nowakkacper.MyShelf.entity.User;
import com.nowakkacper.MyShelf.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public boolean isUserExist(int id) {
        return userRepository.existsById(id);
    }

    public User getUser(int id){
        return userRepository.getUserById(id);
    }
}
