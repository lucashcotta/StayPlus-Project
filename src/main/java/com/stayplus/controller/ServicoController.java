package com.stayplus.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.stayplus.model.Propriedade;
import com.stayplus.model.ServicoExtra;
import com.stayplus.repository.PropriedadeRepository;
import com.stayplus.repository.ServicoRepository;

@RestController
@RequestMapping("/api/servicos")
@CrossOrigin(origins = "*")
public class ServicoController {

    @Autowired
    private ServicoRepository servicoRepository;

    @Autowired
    private PropriedadeRepository propriedadeRepository;

    // Listar serviços de uma propriedade
    @GetMapping("/propriedade/{propriedadeId}")
    public List<ServicoExtra> listarPorPropriedade(@PathVariable Long propriedadeId) {
        return servicoRepository.findByPropriedadeId(propriedadeId);
    }

    // Cadastrar novo serviço vinculado à propriedade
    @PostMapping
    public ResponseEntity<ServicoExtra> cadastrarServico(@RequestBody ServicoExtra servico) {
        if (servico.getPropriedade() == null || servico.getPropriedade().getId() == null) {
            return ResponseEntity.badRequest().build();
        }

        Propriedade propriedade = propriedadeRepository.findById(servico.getPropriedade().getId()).orElse(null);
        if (propriedade == null) {
            return ResponseEntity.notFound().build();
        }

        servico.setPropriedade(propriedade);
        ServicoExtra novo = servicoRepository.save(servico);
        return ResponseEntity.ok(novo);
    }

    @GetMapping("/codigo/{codigo}")
    public ResponseEntity<List<ServicoExtra>> listarServicosPorCodigoPropriedade(@PathVariable String codigo) {
        Propriedade propriedade = propriedadeRepository.findByCodigo(codigo);

        if (propriedade == null) {
            return ResponseEntity.notFound().build();
        }

        List<ServicoExtra> servicos = servicoRepository.findByPropriedadeId(propriedade.getId());
        return ResponseEntity.ok(servicos);
    }
}

