package com.example.brickfactory.service;

import com.example.brickfactory.entity.Brick;
import com.example.brickfactory.repository.BrickRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Random;

@Service
public class BrickService {
    @Autowired
    private BrickRepository brickRepository;

    public List<Brick> findAll() {
        return brickRepository.findAll();
    }

    public Page<Brick> findAll(Pageable pageable) {
        return brickRepository.findAll(pageable);
    }

    public Brick create(Brick brick) {
        if (!brick.getStatus().equals("EM_INSPECAO")) {
            throw new IllegalArgumentException("Novo tijolo deve ter status EM_INSPECAO");
        }
        return brickRepository.save(brick);
    }

    public Brick createRandom() {
        Random random = new Random();
        Brick brick = new Brick();
        brick.setColor(random.nextBoolean() ? "branco" : "preto");
        brick.setHoles(String.valueOf(random.nextInt(8) + 1)); // 1 a 8 como String
        brick.setStatus("EM_INSPECAO");
        brick.setDefective(false);
        return brickRepository.save(brick);
    }

    public Brick findById(Long id) {
        return brickRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Tijolo não encontrado"));
    }

    public Brick updateStatus(Long id, String newStatus) {
        Brick brick = findById(id);
        if (!brick.getStatus().equals("EM_INSPECAO")) {
            throw new IllegalArgumentException("Status não pode ser alterado após APROVADO ou REPROVADO");
        }
        if (!newStatus.equals("APROVADO") && !newStatus.equals("REPROVADO")) {
            throw new IllegalArgumentException("Status inválido");
        }
        brick.setStatus(newStatus);
        if (newStatus.equals("APROVADO")) {
            brick.setDefective(Math.random() < 0.333); // 1/3 de chance de defeito
        }
        return brickRepository.save(brick);
    }

    public void delete(Long id) {
        Brick brick = findById(id);
        if (!brick.isDefective()) {
            throw new IllegalArgumentException("Apenas tijolos defeituosos podem ser deletados");
        }
        brickRepository.deleteById(id);
    }
}