package com.shoplist.repository;

import com.shoplist.model.ShopCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ShopCategoryRepository extends JpaRepository<ShopCategory, Long> {
    List<ShopCategory> findAllByOrderByDisplayOrderAsc();
}
