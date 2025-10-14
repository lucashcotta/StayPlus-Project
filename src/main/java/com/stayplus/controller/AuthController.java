package com.stayplus.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stayplus.model.Usuario;
import com.stayplus.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // permite chamadas do seu front
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario loginRequest) {
        Usuario usuario = authService.validarLogin(loginRequest.getEmail(), loginRequest.getSenha());

        if (usuario != null) {
            usuario.setSenha(null); // não enviar senha de volta
            return ResponseEntity.ok(usuario);
        }
        return ResponseEntity.status(401).body("Credenciais inválidas");
    }
}
