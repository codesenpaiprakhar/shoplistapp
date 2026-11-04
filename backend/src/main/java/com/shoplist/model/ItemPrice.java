package com.shoplist.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "item_prices")
public class ItemPrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "item_name", nullable = false)
    private String itemName;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private ShopCategory category;

    @Column(nullable = false)
    private Double price;

    private String unit = "kg";

    @Column(name = "shop_name")
    private String shopName;

    private String notes;

    @Column(name = "updated_at")
    private LocalDate updatedAt = LocalDate.now();

    public ItemPrice() {}

    public ItemPrice(Long id, String itemName, ShopCategory category, Double price, String unit, String shopName, String notes, LocalDate updatedAt) {
        this.id = id;
        this.itemName = itemName;
        this.category = category;
        this.price = price;
        this.unit = unit;
        this.shopName = shopName;
        this.notes = notes;
        this.updatedAt = updatedAt != null ? updatedAt : LocalDate.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public ShopCategory getCategory() {
        return category;
    }

    public void setCategory(ShopCategory category) {
        this.category = category;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }
}
