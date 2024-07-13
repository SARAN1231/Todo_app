package com.example.TODO_Server.Controllers;

import com.example.TODO_Server.Models.Todos;
import com.example.TODO_Server.Repo.TodoRepo;
import com.example.TODO_Server.Services.TodoService;
import com.example.TODO_Server.Services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("todo")
public class TodoController {

    private final TodoService todoService;
    private final TodoRepo todoRepo;
    private final UserService userService;

    public TodoController(TodoService todoService, TodoRepo todoRepo, UserService userService) {
        this.todoService = todoService;
        this.todoRepo = todoRepo;
        this.userService = userService;
    }

    @PostMapping("/add/{id}")
    public ResponseEntity<String> addTodo(@PathVariable Long id, @RequestBody Todos todo) {
        return todoService.Addtodo(todo, id);
    }

    @GetMapping("get/{id}")
    public ResponseEntity<List<Todos>> getalltodos(@PathVariable Long id) {
        return todoService.getAllTodos(id);
    }

    @PutMapping("update/{todoid}")
    public ResponseEntity<Todos> updateTodo(@PathVariable Long todoid, @RequestBody Todos todo) {
        return todoService.UpdateTodo(todo, todoid);
    }
    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable Long id) {
    return todoService.DeleteTodo(id);
    }
}
