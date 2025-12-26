package com.example.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.backend.modal.Order;
import com.example.backend.user.domain.OrderStatus;

public interface OrderRepository extends MongoRepository<Order, String> {

	@Query("{ 'user.$id' : ?0, 'orderStatus' : { $in: [ 'PLACED', 'CONFIRMED', 'SHIPPED', 'DELIVERED' ] } }")
	public List<Order> getUsersOrders(String userId);

	List<Order> findAllByOrderByCreatedAtDesc();
}
