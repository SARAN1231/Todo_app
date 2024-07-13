package com.example.TODO_Server.Services;

import com.example.TODO_Server.Models.Todos;
import com.example.TODO_Server.Models.Users;
import com.example.TODO_Server.Repo.TodoRepo;
import com.example.TODO_Server.Repo.UserRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {
    private final TodoRepo todoRepo;
    private final UserRepo userRepo;

    public TodoService(TodoRepo todoRepo, UserRepo userRepo) {
        this.todoRepo = todoRepo;
        this.userRepo = userRepo;
    }

    public ResponseEntity<String> Addtodo(Todos todo,Long id) {
        try {
            Optional<Users> usersOptional = userRepo.findById(id);
            if (usersOptional.isPresent()) {
                todo.setUsers(usersOptional.get());
                todoRepo.save(todo);
                return new ResponseEntity<>("Successfully added Todos", HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }
        }
        catch (Exception e) {
            return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    public ResponseEntity<List<Todos>> getAllTodos(Long id) {
        try {
            List<Todos> todos = todoRepo.findAllByuserid(id);
            return new ResponseEntity<>(todos, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public ResponseEntity<Todos> UpdateTodo(Todos todos, Long todoid) {
        try {
            Optional<Todos> todosOptional = todoRepo.findById(todoid);
            if (todosOptional.isPresent()) {
                Todos existingTodo = todosOptional.get();
                existingTodo.setTodo(todos.getTodo());
                todoRepo.save(existingTodo);
                return new ResponseEntity<>(existingTodo, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public ResponseEntity<String> DeleteTodo(Long todoid) {
        try {
            if(todoRepo.existsById(todoid)) {
                todoRepo.deleteById(todoid);
                return new ResponseEntity<>("Todo  deleted Successfully", HttpStatus.OK);
            }else {
                return new ResponseEntity<>("Todo not found", HttpStatus.NOT_FOUND);
            }

        }
        catch (Exception e) {
            return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
