package com.nocountry.meetcore.controller;

import com.nocountry.meetcore.dto.LoginRequest;
import com.nocountry.meetcore.dto.RegisterRequest;
import com.nocountry.meetcore.model.User;
import com.nocountry.meetcore.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") 
public class AuthController {

    private final UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<User> login(@Valid @RequestBody LoginRequest request) {
        return userRepository.findByEmail(request.getEmail())
                .filter(user -> user.getPassword().equals(request.getPassword()))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }

        User newUser = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(request.getPassword()) 
                .role("participant") 
                .build();

        User savedUser = userRepository.save(newUser);
        return ResponseEntity.ok(savedUser);
    }
}
