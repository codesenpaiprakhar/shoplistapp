package com.shoplist.controller;

import com.shoplist.model.ShoppingList;
import com.shoplist.model.ShoppingListItem;
import com.shoplist.service.ShoppingListService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/shopping-lists")
public class ShoppingListController {

    private final ShoppingListService shoppingListService;

    public ShoppingListController(ShoppingListService shoppingListService) {
        this.shoppingListService = shoppingListService;
    }

    @GetMapping("/active")
    public ShoppingList getActiveList() {
        return shoppingListService.getOrCreateActiveList();
    }

    @GetMapping("/{listId}/items")
    public List<ShoppingListItem> getListItems(
            @PathVariable Long listId,
            @RequestParam(required = false) Long categoryId) {
        return shoppingListService.getListItems(listId, categoryId);
    }

    @PostMapping("/{listId}/items")
    public ResponseEntity<ShoppingListItem> addItem(
            @PathVariable Long listId,
            @RequestBody ShoppingListItem item) {
        return new ResponseEntity<>(shoppingListService.addItemToList(listId, item), HttpStatus.CREATED);
    }

    @PatchMapping("/items/{itemId}/status")
    public ResponseEntity<ShoppingListItem> updateStatus(
            @PathVariable Long itemId,
            @RequestBody Map<String, Object> payload) {
        String status = (String) payload.get("status");
        Double receivedQuantity = payload.containsKey("receivedQuantity") && payload.get("receivedQuantity") != null
                ? Double.valueOf(payload.get("receivedQuantity").toString())
                : null;
        return ResponseEntity.ok(shoppingListService.updateItemStatus(itemId, status, receivedQuantity));
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<ShoppingListItem> updateItem(
            @PathVariable Long itemId,
            @RequestBody ShoppingListItem item) {
        return ResponseEntity.ok(shoppingListService.updateItem(itemId, item));
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long itemId) {
        shoppingListService.deleteItem(itemId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{listId}/clear-purchased")
    public ResponseEntity<Void> clearPurchased(@PathVariable Long listId) {
        shoppingListService.clearPurchasedItems(listId);
        return ResponseEntity.noContent().build();
    }
}
