package com.dicap.ImageUploadApi;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ImageRepository extends JpaRepository<ImageEntity, Long> {
    List<ImageEntity> findByPhotographeId(Long photographe_id);
    List<ImageEntity> findByCategorieId(Long photographe_id);
}