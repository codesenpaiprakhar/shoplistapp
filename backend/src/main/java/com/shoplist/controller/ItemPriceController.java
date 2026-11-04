package com.shoplist.controller;

import com.shoplist.model.ItemPrice;
import com.shoplist.service.ItemPriceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prices")
public class ItemPriceController {

    private final ItemPriceService priceService;

    public ItemPriceController(ItemPriceService priceService) {
        this.priceService = priceService;
    }

    @GetMapping
    public List<ItemPrice> getAllPrices(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String search) {
        return priceService.getAllPrices(categoryId, search);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemPrice> getPriceById(@PathVariable Long id) {
        return priceService.getPriceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ItemPrice> createPrice(@RequestBody ItemPrice price) {
        return new ResponseEntity<>(priceService.savePrice(price), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemPrice> updatePrice(@PathVariable Long id, @RequestBody ItemPrice price) {
        return ResponseEntity.ok(priceService.updatePrice(id, price));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrice(@PathVariable Long id) {
        priceService.deletePrice(id);
        return ResponseEntity.noContent().build();
    }
}
