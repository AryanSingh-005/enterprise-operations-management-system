
package com.operations.enterprise_system.repository;

import com.operations.enterprise_system.entity.Site;
import com.operations.enterprise_system.entity.enums.OperationalStatus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SiteRepository extends JpaRepository<Site, Long> {

    // Check duplicate site code during creation
    boolean existsBySiteCode(String siteCode);

    // Check duplicate site code during update
    boolean existsBySiteCodeAndIdNot(String siteCode, Long id);

    // Search and filter sites
    @Query("""
        SELECT s FROM Site s
        WHERE (:name IS NULL OR
               LOWER(s.siteName) LIKE LOWER(CONCAT('%', :name, '%')))
        AND (:location IS NULL OR
             LOWER(s.location) LIKE LOWER(CONCAT('%', :location, '%')))
        AND (:status IS NULL OR s.status = :status)
        ORDER BY s.createdAt DESC
        """)
    List<Site> searchSites(
            @Param("name") String name,
            @Param("location") String location,
            @Param("status") OperationalStatus status
    );

    // Get all sites, newest first
    List<Site> findAllByOrderByCreatedAtDesc();

    // Count sites according to operational status
    long countByStatus(OperationalStatus status);
}
