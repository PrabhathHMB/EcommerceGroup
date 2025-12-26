package com.example.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.backend.modal.Review;

public interface ReviewRepository extends MongoRepository<Review, String> {

	@Query("{ 'product.$id' : ?0 }")
	public List<Review> getAllProductsReview(String productId);
}
