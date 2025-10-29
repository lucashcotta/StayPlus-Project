package com.stayplus.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.stayplus.model.ServicoExtra;
import com.stayplus.repository.ServicoRepository;

@RestController
@RequestMapping("/api/servicos")
public class ServicoController {

    @Autowired
    private ServicoRepository servicoRepository;

    @GetMapping("/propriedade/{idPropriedade}")
    public ResponseEntity<List<ServicoExtra>> listarPorPropriedade(@PathVariable Long idPropriedade) {
        List<ServicoExtra> servicos = servicoRepository.findByPropriedadeId(idPropriedade);
        return ResponseEntity.ok(servicos);
    }
}
