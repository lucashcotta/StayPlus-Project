package com.stayplus.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stayplus.model.Propriedade;
import com.stayplus.repository.PropriedadeRepository;

@Service
public class PropriedadeService {

    @Autowired
    private PropriedadeRepository propriedadeRepository;

    public List<Propriedade> listarPorUsuario(Long idUsuario) {
        return propriedadeRepository.findByProprietarioId(idUsuario);
    }

    public Propriedade salvar(Propriedade propriedade) {
        return propriedadeRepository.save(propriedade);
    }
}
