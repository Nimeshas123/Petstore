package com.petstore.controller;

import com.petstore.entity.CartItem;
import com.petstore.repository.CartRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin("*")
public class CartController {

 private final CartRepository repo;

 public CartController(CartRepository repo){
  this.repo = repo;
 }

 @GetMapping
 public List<CartItem> getCart(){
  return repo.findAll();
 }

 @PostMapping
 public CartItem addToCart(@RequestBody CartItem item){
  return repo.save(item);
 }

 @DeleteMapping("/{id}")
 public void remove(@PathVariable Long id){
  repo.deleteById(id);
 }
}