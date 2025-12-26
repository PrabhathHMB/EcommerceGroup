package com.example.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.backend.modal.Category;

public interface CategoryRepository extends MongoRepository<Category, String> {

	public Category findByName(String name);

	@Query("{ 'name' : ?0, 'parentCategory.name' : ?1 }")
	public Category findByNameAndParant(String name, String parentCategoryName);
}
