package com.example.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.backend.modal.Product;
import com.example.backend.user.domain.ProductSubCategory;

public interface ProductRepository extends MongoRepository<Product, String> {

	@Query("{ 'category.name' : { $regex: ?0, $options: 'i' } }")
	public List<Product> findByCategory(String category);

	@Query("{ $or: [ " +
			"{ 'title' : { $regex: ?0, $options: 'i' } }, " +
			"{ 'description' : { $regex: ?0, $options: 'i' } }, " +
			"{ 'brand' : { $regex: ?0, $options: 'i' } }, " +
			"{ 'category.name' : { $regex: ?0, $options: 'i' } } " +
			"] }")
	public List<Product> searchProduct(String query);

	// Note: Complex filtering with null checks is better handled in service layer
	// This method returns all products, filtering will be done in service
	List<Product> findAllByOrderByCreatedAtDesc();

	public List<Product> findTop10ByOrderByCreatedAtDesc();
}
