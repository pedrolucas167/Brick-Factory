package com.example.brickfactory.controller;

import com.example.brickfactory.entity.Brick;
import com.example.brickfactory.service.BrickService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

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
        return brickService.findById(id);
    }

    @PutMapping("/{id}/status")
    public Brick updateStatus(@PathVariable Long id, @RequestBody String newStatus) {
        return brickService.updateStatus(id, newStatus);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        brickService.delete(id);
    }
}