package com.example.TODO_Server.Repo;

import com.example.TODO_Server.Models.Todos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TodoRepo extends JpaRepository<Todos, Long> {

    @Query(value = "SELECT * FROM todos WHERE user_id = :id", nativeQuery = true)
    List<Todos> findAllByuserid(long id);
}
