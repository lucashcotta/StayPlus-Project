package com.stayplus.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.stayplus.model.Propriedade;

public interface PropriedadeRepository extends JpaRepository<Propriedade, Long> {
    // Optional<Propriedade> findByCodigo(String codigo);
        Propriedade findByCodigo(String codigo);
    List<Propriedade> findByProprietarioId(Long idUsuario);
}


