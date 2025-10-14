package com.stayplus.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Propriedade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String endereco;
    private String descricao;

    @Column(unique = true)
    private String codigoAcesso;  // Código usado pelo hóspede para acessar os serviços

    @ManyToOne
    @JoinColumn(name = "proprietario_id")
    private Usuario proprietario;

    @OneToMany(mappedBy = "propriedade", cascade = CascadeType.ALL)
    private List<ServicoExtra> servicos = new ArrayList<>();
}
