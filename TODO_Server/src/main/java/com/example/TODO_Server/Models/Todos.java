package com.example.TODO_Server.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Todos {
    @Id
    @GeneratedValue
    private long id;
    private String todo;
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private Users users;
}
