package com.stayplus.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.stayplus.model.Propriedade;
import com.stayplus.model.Usuario;
import com.stayplus.repository.PropriedadeRepository;
import com.stayplus.repository.UsuarioRepository;

@RestController
@RequestMapping("/api/propriedades")
@CrossOrigin(origins = "*")
public class PropriedadeController {

    @Autowired
    private PropriedadeRepository propriedadeRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // // Buscar propriedades de um usuário
    // @GetMapping("/usuario/{idUsuario}")
    // public ResponseEntity<List<Propriedade>> listarPorUsuario(@PathVariable Long idUsuario) {
    //     List<Propriedade> propriedades = propriedadeRepository.findByProprietarioId(idUsuario);
    //     return ResponseEntity.ok(propriedades);
    // }


    @GetMapping("/usuario/{usuarioId}")
    public List<Propriedade> listarPorUsuario(@PathVariable Long usuarioId) {
        return propriedadeRepository.findByProprietarioId(usuarioId);
    }

    // Cadastrar nova propriedade
    @PostMapping
    public ResponseEntity<Propriedade> cadastrarPropriedade(@RequestBody Propriedade propriedade) {
        if (propriedade.getProprietario() == null || propriedade.getProprietario().getId() == null) {
            return ResponseEntity.badRequest().build();
        }

        Usuario usuario = usuarioRepository.findById(propriedade.getProprietario().getId())
                .orElse(null);

        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }

        propriedade.setProprietario(usuario);
        Propriedade novaPropriedade = propriedadeRepository.save(propriedade);
        return ResponseEntity.ok(novaPropriedade);
    }
}
