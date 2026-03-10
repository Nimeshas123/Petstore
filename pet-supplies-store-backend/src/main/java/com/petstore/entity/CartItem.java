package com.petstore.entity;

import jakarta.persistence.*;

@Entity
public class CartItem {

 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;

 private Long productId;
 private int quantity;
}