package com.taskmanager.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record TaskRequest(

        @NotBlank(message = "title é obrigatório")
        @Size(max = 150, message = "title deve ter no máximo 150 caracteres")
        String title,

        @Size(max = 1000, message = "description deve ter no máximo 1000 caracteres")
        String description,

        Boolean completed,

        LocalDate dueDate
) {
}
