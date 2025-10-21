package com.stayplus.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.stayplus.model.Usuario;
import com.stayplus.service.AuthService;

import java.util.Map;

@RestController
@RequestMapping("/api") // <-- ESSENCIAL para bater em /api/login
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login") // <-- ESSENCIAL
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String senha = body.get("senha");

        Usuario user = authService.validarLogin(email, senha);

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401).body("Credenciais inválidas!");
        }
    }
}
