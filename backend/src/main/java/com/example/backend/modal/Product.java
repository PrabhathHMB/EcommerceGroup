package com.example.backend.modal;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.*;

@Document(collection = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {

	@Id
    private String id;

    private String title;

    private String description;

    private int price;

    private int discountedPrice;
    
    private int discountPersent;

    private int quantity;

    private String brand;

    private String color;

    private Set<size> sizes = new HashSet<>();

    private String imageUrl;

    @DBRef(lazy = true)
    private List<Rating> ratings = new ArrayList<>();
    
    @DBRef(lazy = true)
    private List<Review> reviews = new ArrayList<>();

    private int numRatings;
    

    @DBRef
    private Category category;
    
    private LocalDateTime createdAt;
    


   
}
