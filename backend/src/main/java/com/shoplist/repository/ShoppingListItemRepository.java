package com.shoplist.repository;

import com.shoplist.model.ShoppingListItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ShoppingListItemRepository extends JpaRepository<ShoppingListItem, Long> {
    List<ShoppingListItem> findByShoppingListId(Long listId);
    List<ShoppingListItem> findByShoppingListIdAndCategoryId(Long listId, Long categoryId);
}
