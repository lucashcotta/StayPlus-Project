package com.stayplus.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.stayplus.model.Propriedade;

public interface PropriedadeRepository extends JpaRepository<Propriedade, Long> {
    List<Propriedade> findByProprietarioId(Long idProprietario);
}
