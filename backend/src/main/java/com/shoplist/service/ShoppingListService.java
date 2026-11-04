package com.shoplist.service;

import com.shoplist.model.ShopCategory;
import com.shoplist.model.ShoppingList;
import com.shoplist.model.ShoppingListItem;
import com.shoplist.repository.ShopCategoryRepository;
import com.shoplist.repository.ShoppingListItemRepository;
import com.shoplist.repository.ShoppingListRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ShoppingListService {

    private final ShoppingListRepository listRepository;
    private final ShoppingListItemRepository itemRepository;
    private final ShopCategoryRepository categoryRepository;

    public ShoppingListService(ShoppingListRepository listRepository,
                               ShoppingListItemRepository itemRepository,
                               ShopCategoryRepository categoryRepository) {
        this.listRepository = listRepository;
        this.itemRepository = itemRepository;
        this.categoryRepository = categoryRepository;
    }

    public ShoppingList getOrCreateActiveList() {
        return listRepository.findFirstByStatusOrderByCreatedAtDesc("ACTIVE")
                .orElseGet(() -> {
                    ShoppingList newList = new ShoppingList();
                    newList.setName("Current Shopping List");
                    newList.setStatus("ACTIVE");
                    newList.setCreatedAt(LocalDateTime.now());
                    return listRepository.save(newList);
                });
    }

    public List<ShoppingListItem> getListItems(Long listId, Long categoryId) {
        if (categoryId != null && categoryId > 0) {
            return itemRepository.findByShoppingListIdAndCategoryId(listId, categoryId);
        }
        return itemRepository.findByShoppingListId(listId);
    }

    @Transactional
    public ShoppingListItem addItemToList(Long listId, ShoppingListItem item) {
        ShoppingList list = listRepository.findById(listId)
                .orElseThrow(() -> new IllegalArgumentException("List not found with id: " + listId));
        
        item.setShoppingList(list);

        if (item.getCategory() != null && item.getCategory().getId() != null) {
            ShopCategory cat = categoryRepository.findById(item.getCategory().getId())
                    .orElse(null);
            item.setCategory(cat);
        }

        if (item.getStatus() == null) {
            item.setStatus("PENDING");
        }

        return itemRepository.save(item);
    }

    @Transactional
    public ShoppingListItem updateItemStatus(Long itemId, String status, Double receivedQuantity) {
        ShoppingListItem item = itemRepository.findById(itemId)
                .orElseThrow(() -> new IllegalArgumentException("Item not found with id: " + itemId));
        
        item.setStatus(status);
        if (receivedQuantity != null) {
            item.setReceivedQuantity(receivedQuantity);
        } else if ("PURCHASED".equalsIgnoreCase(status) && item.getReceivedQuantity() == null) {
            item.setReceivedQuantity(item.getPlannedQuantity());
        }
        return itemRepository.save(item);
    }

    @Transactional
    public ShoppingListItem updateItem(Long itemId, ShoppingListItem updated) {
        ShoppingListItem existing = itemRepository.findById(itemId)
                .orElseThrow(() -> new IllegalArgumentException("Item not found with id: " + itemId));
        
        if (updated.getItemName() != null) existing.setItemName(updated.getItemName());
        if (updated.getPlannedQuantity() != null) existing.setPlannedQuantity(updated.getPlannedQuantity());
        if (updated.getUnit() != null) existing.setUnit(updated.getUnit());
        if (updated.getEstimatedPrice() != null) existing.setEstimatedPrice(updated.getEstimatedPrice());
        if (updated.getNotes() != null) existing.setNotes(updated.getNotes());
        if (updated.getStatus() != null) existing.setStatus(updated.getStatus());

        if (updated.getCategory() != null && updated.getCategory().getId() != null) {
            categoryRepository.findById(updated.getCategory().getId()).ifPresent(existing::setCategory);
        }

        return itemRepository.save(existing);
    }

    @Transactional
    public void deleteItem(Long itemId) {
        itemRepository.deleteById(itemId);
    }

    @Transactional
    public void clearPurchasedItems(Long listId) {
        List<ShoppingListItem> items = itemRepository.findByShoppingListId(listId);
        for (ShoppingListItem item : items) {
            if ("PURCHASED".equalsIgnoreCase(item.getStatus())) {
                itemRepository.delete(item);
            }
        }
    }
}
