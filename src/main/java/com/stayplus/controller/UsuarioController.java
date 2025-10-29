package com.stayplus.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.stayplus.model.Usuario;
import com.stayplus.repository.UsuarioRepository;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody Usuario usuario) {
        try {
            // Verifica se o e-mail já existe
            if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body("E-mail já cadastrado!");
            }

            Usuario novo = usuarioRepository.save(usuario);
            return ResponseEntity.ok(novo);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao cadastrar usuário: " + e.getMessage());
        }
    }
}

