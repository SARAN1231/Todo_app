package com.example.TODO_Server.Controllers;

import com.example.TODO_Server.Models.LoginDto;
import com.example.TODO_Server.Models.Users;
import com.example.TODO_Server.Services.UserService;
import jakarta.persistence.PostLoad;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("auth")
public class UserController {

    private UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("SignUp")
    public ResponseEntity<String> signup(@RequestBody    Users user) {
        return userService.Signup(user);
    }
    @PostMapping("Login")
    public ResponseEntity<Object> login(@RequestBody LoginDto user) {
        return  userService.Login(user);
    }
}
