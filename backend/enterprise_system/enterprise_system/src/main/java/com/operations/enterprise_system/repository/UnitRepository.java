
package com.operations.enterprise_system.repository;

import com.operations.enterprise_system.entity.Unit;
import com.operations.enterprise_system.entity.enums.OperationalStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UnitRepository extends JpaRepository<Unit, Long> {

    // Get all units belonging to a particular site
    List<Unit> findBySiteId(Long siteId);

    // Get units by site and operational status
    List<Unit> findBySiteIdAndStatus(
            Long siteId,
            OperationalStatus status
    );

    // Get all units in latest-created-first order
    List<Unit> findAllByOrderByCreatedAtDesc();

    // Check duplicate unit code within a site
    boolean existsBySiteIdAndUnitCode(
            Long siteId,
            String unitCode
    );

    // Check duplicate unit code during update
    boolean existsBySiteIdAndUnitCodeAndIdNot(
            Long siteId,
            String unitCode,
            Long id
    );

    // Check whether a site contains any units
    boolean existsBySiteId(Long siteId);

    // Count units according to operational status
    long countByStatus(OperationalStatus status);
}
