package com.example.brickfactory.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Entity
public class Brick {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Pattern(regexp = "branco|preto", message = "Cor deve ser 'branco' ou 'preto'")
    private String color;

    @NotNull
    @Pattern(regexp = "[1-8]", message = "Furos devem ser de 1 a 8")
    private String holes;

    @NotNull
    @Pattern(regexp = "EM_INSPECAO|APROVADO|REPROVADO", message = "Status inválido")
    private String status;

    private boolean defective;

    // Getters e setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    public String getHoles() { return holes; }
    public void setHoles(String holes) { this.holes = holes; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public boolean isDefective() { return defective; }
    public void setDefective(boolean defective) { this.defective = defective; }
}