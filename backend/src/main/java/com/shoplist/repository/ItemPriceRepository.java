package com.shoplist.repository;

import com.shoplist.model.ItemPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ItemPriceRepository extends JpaRepository<ItemPrice, Long> {
    List<ItemPrice> findByCategoryId(Long categoryId);
    List<ItemPrice> findByItemNameContainingIgnoreCase(String itemName);
}
