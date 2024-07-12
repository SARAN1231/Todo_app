package com.example.TODO_Server.Repo;

import com.example.TODO_Server.Models.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<Users, Long> {

    Users findByEmail(String email);
}
