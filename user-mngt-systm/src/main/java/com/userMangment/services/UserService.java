package com.userMangment.services;

import com.userMangment.model.User;
import org.springframework.stereotype.Service;

import java.util.List;


public interface UserService {
    User saveUser(User user);

    List<User> getAllUser();

    User getUserById(Long id);

    boolean deleteUser(Long id);

    User updateUser(Long id, User user);
}
