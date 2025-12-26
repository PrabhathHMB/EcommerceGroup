package com.example.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.backend.modal.Rating;

public interface RatingRepository extends MongoRepository<Rating, String> {

	@Query("{ 'product.$id' : ?0 }")
	public List<Rating> getAllProductsRating(String productId);

}
