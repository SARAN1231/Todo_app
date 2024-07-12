package com.example.TODO_Server.Services;

import com.example.TODO_Server.Models.LoginDto;
import com.example.TODO_Server.Models.Users;
import com.example.TODO_Server.Repo.UserRepo;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserRepo userRepo;

    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }
    public ResponseEntity<String> Signup(Users user) {
        try {
            Users users = userRepo.findByEmail(user.getEmail());
            if (users == null) {
                String hpass  = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
                user.setPassword(hpass);
                userRepo.save(user);
                return new ResponseEntity<>("User Created Successfully", HttpStatus.CREATED);
            }
            else {
                return new ResponseEntity<>("User Already Exists", HttpStatus.CONFLICT);
            }

        }
        catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }


    }

    public ResponseEntity<Object> Login(LoginDto user) {
        try {
            Users users = userRepo.findByEmail(user.email());
            if(BCrypt.checkpw(user.password(),users.getPassword())){
                users.setPassword(null);
                return new ResponseEntity<>(users, HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>("Incorrect Credentials", HttpStatus.CONFLICT);
            }
        }
        catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
