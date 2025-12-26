package com.example.backend.modal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.example.backend.user.domain.OrderStatus;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Document(collection = "orders")
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    private String id;

    private String orderId;
  
    @DBRef
    private User user;

    @DBRef
    private List<OrderItem> orderItems = new ArrayList<>();

    private LocalDate orderDate = LocalDate.now();

    private LocalDate deliveryDate;

    @DBRef
    private Address shippingAddress;

    private PaymentDetails paymentDetails = new PaymentDetails();

    private double totalPrice;
    
    private Integer totalDiscountedPrice;
    
    private Integer discount;

    private OrderStatus orderStatus;
    
    private int totalItem;
    
    private LocalDateTime createdAt;


}
