package com.shoplist.service;

import com.shoplist.model.ShopCategory;
import com.shoplist.repository.ShopCategoryRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ShopCategoryService {

    private final ShopCategoryRepository categoryRepository;

    public ShopCategoryService(ShopCategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<ShopCategory> getAllCategories() {
        return categoryRepository.findAllByOrderByDisplayOrderAsc();
    }

    public Optional<ShopCategory> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    public ShopCategory createCategory(ShopCategory category) {
        return categoryRepository.save(category);
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}
