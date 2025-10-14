package com.stayplus.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stayplus.model.Usuario;
import com.stayplus.repository.UsuarioRepository;

import lombok.Getter;
@Getter
@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario validarLogin(String email, String senha) {
        return usuarioRepository.findByEmail(email)
                .filter(u -> u.getSenha().equals(senha)) // Simples (sem criptografia ainda)
                .orElse(null);
    }
}
