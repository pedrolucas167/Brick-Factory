package com.example.brickfactory.config;

import com.example.brickfactory.entity.Brick;
import com.example.brickfactory.repository.BrickRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.Random;

@Component
public class DataInitializer implements CommandLineRunner {
    @Autowired
    private BrickRepository brickRepository;

    @Override
    public void run(String... args) throws Exception {
        if (brickRepository.count() == 0) {
            Random random = new Random();
            for (int i = 0; i < 100; i++) {
                Brick brick = new Brick();
                brick.setColor(random.nextBoolean() ? "branco" : "preto");
                brick.setHoles(String.valueOf(random.nextInt(8) + 1)); // 1 a 8 como String
                brick.setStatus("EM_INSPECAO");
                brick.setDefective(false);
                brickRepository.save(brick);
            }
        }
    }
}