package com.example.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.backend.modal.Cart;
import com.example.backend.modal.CartItem;
import com.example.backend.modal.Product;

public interface CartItemRepository extends MongoRepository<CartItem, String> {

	public CartItem findByCart_IdAndProduct_IdAndSizeAndUserId(String cartId, String productId, String size, String userId);

}
