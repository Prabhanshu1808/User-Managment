package com.userMangment.services;

import com.userMangment.entity.UserEntity;
import com.userMangment.model.User;
import com.userMangment.repository.UserRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepo userRepo;

    public UserServiceImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public User saveUser(User user) {
        UserEntity userEntity = new UserEntity();
        BeanUtils.copyProperties(user , userEntity);
        userRepo.save(userEntity);
        return user;
    }

    @Override
    public List<User> getAllUser() {
        List<UserEntity> userEntities = userRepo.findAll();

        List<User> users = userEntities
                .stream()
                .map(emp -> new User(
                        emp.getId(),
                        emp.getFirstName(),
                        emp.getLastName(),
                        emp.getEmailId()))
                .collect(Collectors.toList());
        return users;
    }

    @Override
    public User getUserById(Long id) {
        UserEntity userEntity = userRepo.findById(id).get();
        User user = new User();
        BeanUtils.copyProperties(userEntity , user);
        return user;
    }

    @Override
    public boolean deleteUser(Long id) {
        UserEntity user = userRepo.findById(id).get();
        userRepo.delete(user);
        return true;
    }

    @Override
    public User updateUser(Long id, User user) {
        UserEntity userEntity = userRepo.findById(id).get();

        userEntity.setEmailId(user.getEmailId());
        userEntity.setFirstName(user.getFirstName());
        userEntity.setLastName(user.getLastName());
        userRepo.save(userEntity);
        return user;
    }
}
