package com.shoplist.service;

import com.shoplist.model.ItemPrice;
import com.shoplist.repository.ItemPriceRepository;
import com.shoplist.repository.ShopCategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ItemPriceService {

    private final ItemPriceRepository priceRepository;
    private final ShopCategoryRepository categoryRepository;

    public ItemPriceService(ItemPriceRepository priceRepository, ShopCategoryRepository categoryRepository) {
        this.priceRepository = priceRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<ItemPrice> getAllPrices(Long categoryId, String search) {
        if (search != null && !search.trim().isEmpty()) {
            return priceRepository.findByItemNameContainingIgnoreCase(search.trim());
        }
        if (categoryId != null && categoryId > 0) {
            return priceRepository.findByCategoryId(categoryId);
        }
        return priceRepository.findAll();
    }

    public Optional<ItemPrice> getPriceById(Long id) {
        return priceRepository.findById(id);
    }

    @Transactional
    public ItemPrice savePrice(ItemPrice price) {
        if (price.getCategory() != null && price.getCategory().getId() != null) {
            categoryRepository.findById(price.getCategory().getId())
                    .ifPresent(price::setCategory);
        }
        if (price.getUpdatedAt() == null) {
            price.setUpdatedAt(LocalDate.now());
        }
        return priceRepository.save(price);
    }

    @Transactional
    public ItemPrice updatePrice(Long id, ItemPrice updated) {
        ItemPrice existing = priceRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Price record not found: " + id));

        if (updated.getItemName() != null) existing.setItemName(updated.getItemName());
        if (updated.getPrice() != null) existing.setPrice(updated.getPrice());
        if (updated.getUnit() != null) existing.setUnit(updated.getUnit());
        if (updated.getShopName() != null) existing.setShopName(updated.getShopName());
        if (updated.getNotes() != null) existing.setNotes(updated.getNotes());
        existing.setUpdatedAt(LocalDate.now());

        if (updated.getCategory() != null && updated.getCategory().getId() != null) {
            categoryRepository.findById(updated.getCategory().getId())
                    .ifPresent(existing::setCategory);
        }

        return priceRepository.save(existing);
    }

    @Transactional
    public void deletePrice(Long id) {
        priceRepository.deleteById(id);
    }
}
