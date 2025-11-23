package com.stayplus.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
// @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Propriedade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String endereco;
    private String descricao;
    // @Column(unique = true)
    // private String codigo;

    @Column(unique = true)
    private String codigo;  // Código usado pelo hóspede para acessar os serviços

    @ManyToOne
    @JoinColumn(name = "proprietario_id")
    @JsonBackReference
    private Usuario proprietario;

    @OneToMany(mappedBy = "propriedade", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ServicoExtra> servicos = new ArrayList<>();


    @PrePersist
    public void gerarCodigo() {
        if (this.codigo == null || this.codigo.isEmpty()) {
            this.codigo = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        }
    }
}
