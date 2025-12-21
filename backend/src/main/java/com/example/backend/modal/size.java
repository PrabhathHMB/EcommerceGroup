package com.example.backend.modal;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class size {

	private String name;
	private int quantity;

}
