package com.petstore.controller;

import com.petstore.entity.Product;
import com.petstore.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService service;

    // Constructor Injection
    public ProductController(ProductService service) {
        this.service = service;
    }

    // Get all products
    @GetMapping
    public List<Product> getProducts() {
        return service.getAllProducts();
    }
    
 // Get single product by ID
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return service.getProductById(id); // make sure your service handles this
    }

    // Add new product
    @PostMapping  
    public Product addProduct(@RequestBody Product product) {
        return service.save(product);
    }

    // Delete product by ID
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        service.delete(id); // make sure service.delete handles Long
    }

    // Update product price
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        Product existingProduct = service.getProductById(id);
        if (existingProduct != null) {
            existingProduct.setPrice(updatedProduct.getPrice());
            return service.save(existingProduct);
        } else {
            throw new RuntimeException("Product not found with id " + id);
        }
    }
}