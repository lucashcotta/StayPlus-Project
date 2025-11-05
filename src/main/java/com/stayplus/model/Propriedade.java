package com.stayplus.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
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
    @JsonIgnore
    private Usuario proprietario;

    @OneToMany(mappedBy = "propriedade", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ServicoExtra> servicos = new ArrayList<>();
}
