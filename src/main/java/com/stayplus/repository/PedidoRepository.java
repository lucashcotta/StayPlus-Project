package com.stayplus.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stayplus.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {}
