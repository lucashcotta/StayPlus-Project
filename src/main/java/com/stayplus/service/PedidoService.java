package com.stayplus.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stayplus.model.ItemPedido;
import com.stayplus.model.Pedido;
import com.stayplus.model.Propriedade;
import com.stayplus.model.ServicoExtra;
import com.stayplus.model.Usuario;
import com.stayplus.repository.PedidoRepository;
import com.stayplus.repository.PropriedadeRepository;
import com.stayplus.repository.ServicoRepository;
import com.stayplus.repository.UsuarioRepository;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PropriedadeRepository propriedadeRepository;

    @Autowired
    private ServicoRepository servicoRepository;


    public Pedido salvarPedido(Pedido pedido) {

        // Garantir que usuario existe
        Usuario usuario = usuarioRepository.findById(
                pedido.getUsuario().getId()
        ).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        pedido.setUsuario(usuario);

        // Garantir que a propriedade existe
        Propriedade propriedade = propriedadeRepository.findById(
                pedido.getPropriedade().getId()
        ).orElseThrow(() -> new RuntimeException("Propriedade não encontrada"));

        pedido.setPropriedade(propriedade);

        // Ligar cada item ao pedido
        for (ItemPedido item : pedido.getItens()) {

            // Garantir que o serviço existe
            ServicoExtra servico = servicoRepository.findById(
                    item.getServico().getId()
            ).orElseThrow(() -> new RuntimeException("Serviço não encontrado"));

            item.setServico(servico);

            // MUITO IMPORTANTE → ligar item ao pedido
            item.setPedido(pedido);
        }

        return pedidoRepository.save(pedido); // salva pedido + itens
    }
}

