package com.example.brickfactory.repository;

import com.example.brickfactory.entity.Brick;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrickRepository extends JpaRepository<Brick, Long> {
}