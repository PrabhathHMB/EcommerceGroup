package com.example.backend.modal;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "cartItems")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {
	
	@Id
	private String id;
	
	@JsonIgnore
	@DBRef
	private Cart cart;
	
	@DBRef
	private Product product;
	
	private String size;
	
	private int quantity;
	
	private Integer price;
	
	private Integer discountedPrice;
	
	private String userId;

}
