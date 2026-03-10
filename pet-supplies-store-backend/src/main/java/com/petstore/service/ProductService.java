package com.petstore.service;

import com.petstore.entity.Product;
import com.petstore.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

 private final ProductRepository repo;

 public ProductService(ProductRepository repo){
  this.repo = repo;
 }

 public List<Product> getAllProducts(){
  return repo.findAll();
 }

 public Product save(Product product){
  return repo.save(product);
 }

 public void delete(Long id){
  repo.deleteById(id);
 }
 
 public Product getProductById(Long id) {
	    return repo.findById(id).orElse(null);
	}

	public Product saveProduct(Product product) {
	    return repo.save(product);
	}
}