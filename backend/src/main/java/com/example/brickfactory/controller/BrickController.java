package com.example.brickfactory.controller;

import com.example.brickfactory.entity.Brick;
import com.example.brickfactory.service.BrickService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/bricks")
public class BrickController {
    @Autowired
    private BrickService brickService;

    @GetMapping
    public Page<Brick> listAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return brickService.findAll(pageable);
    }

    @PostMapping
    public Brick create(@Valid @RequestBody Brick brick) {
        return brickService.create(brick);
    }

    @PostMapping("/random")
    public Brick createRandom() {
        return brickService.createRandom();
    }

    @GetMapping("/{id}")
    public Brick findById(@PathVariable Long id) {
        return brickService.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tijolo não encontrado"));
    }

    @PutMapping("/{id}/status")
    public Brick updateStatus(@PathVariable Long id, @RequestBody Map<String, String> statusMap) {
        String newStatus = statusMap.get("status");
        if (!("APROVADO".equals(newStatus) || "REPROVADO".equals(newStatus))) {
            throw new IllegalArgumentException("Status inválido! Use APROVADO ou REPROVADO.");
        }
        return brickService.updateStatus(id, newStatus);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Brick brick = brickService.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tijolo não encontrado"));
        if (!brick.isDefective()) {
            throw new IllegalStateException("Somente tijolos defeituosos podem ser deletados!");
        }
        brickService.delete(id);
        return ResponseEntity.noContent().build();
    }
}