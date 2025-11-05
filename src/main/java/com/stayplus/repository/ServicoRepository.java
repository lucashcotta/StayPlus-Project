package com.stayplus.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.stayplus.model.ServicoExtra;

public interface ServicoRepository extends JpaRepository<ServicoExtra, Long> {
    List<ServicoExtra> findByPropriedadeId(Long propriedadeId);
}

