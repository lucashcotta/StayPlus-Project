package com.stayplus.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.stayplus.model.Propriedade;
import com.stayplus.repository.PropriedadeRepository;

@RestController
@RequestMapping("/api/propriedades")
public class PropriedadeController {

    @Autowired
    private PropriedadeRepository propriedadeRepository;

    // lista propriedades do proprietário logado
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<Propriedade>> listarPorUsuario(@PathVariable Long idUsuario) {
        List<Propriedade> propriedades = propriedadeRepository.findByProprietarioId(idUsuario);
        return ResponseEntity.ok(propriedades);
    }
}

