
package com.operations.enterprise_system.service;

import com.operations.enterprise_system.dto.unit.UnitRequest;
import com.operations.enterprise_system.dto.unit.UnitResponse;
import com.operations.enterprise_system.entity.Site;
import com.operations.enterprise_system.entity.Unit;
import com.operations.enterprise_system.entity.enums.OperationalStatus;
import com.operations.enterprise_system.repository.SiteRepository;
import com.operations.enterprise_system.repository.UnitRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Locale;

@Service
@Transactional
public class UnitService {

    private final UnitRepository unitRepository;
    private final SiteRepository siteRepository;

    public UnitService(
            UnitRepository unitRepository,
            SiteRepository siteRepository) {
        this.unitRepository = unitRepository;
        this.siteRepository = siteRepository;
    }

    // Create new unit
    public UnitResponse createUnit(UnitRequest request) {

        Site site = getValidSite(request.siteId());

        String unitCode = normalizeUnitCode(request.unitCode());

        if (unitRepository.existsBySiteIdAndUnitCode(
                site.getId(), unitCode)) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Unit code already exists in this site"
            );
        }

        Unit unit = new Unit();

        unit.setUnitName(request.unitName().trim());
        unit.setUnitCode(unitCode);
        unit.setSite(site);
        unit.setStatus(request.status());

        Unit savedUnit = unitRepository.save(unit);

        return mapToResponse(savedUnit);
    }

    // Get all units
    @Transactional(readOnly = true)
    public List<UnitResponse> getAllUnits() {

        return unitRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // Get unit by ID
    @Transactional(readOnly = true)
    public UnitResponse getUnitById(Long id) {

        return mapToResponse(findUnit(id));
    }

    // Get units by site ID
    @Transactional(readOnly = true)
    public List<UnitResponse> getUnitsBySiteId(Long siteId) {

        getValidSite(siteId);

        return unitRepository.findBySiteId(siteId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // Get units by site ID and status
    @Transactional(readOnly = true)
    public List<UnitResponse> getUnitsBySiteIdAndStatus(
            Long siteId,
            OperationalStatus status) {

        getValidSite(siteId);

        if (status == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Operational status is required"
            );
        }

        return unitRepository.findBySiteIdAndStatus(siteId, status)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // Update unit
    public UnitResponse updateUnit(Long id, UnitRequest request) {

        Unit unit = findUnit(id);

        Site site = getValidSite(request.siteId());

        String unitCode = normalizeUnitCode(request.unitCode());

        if (unitRepository.existsBySiteIdAndUnitCodeAndIdNot(
                site.getId(), unitCode, id)) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Unit code already exists in this site"
            );
        }

        unit.setUnitName(request.unitName().trim());
        unit.setUnitCode(unitCode);
        unit.setSite(site);
        unit.setStatus(request.status());

        Unit updatedUnit = unitRepository.save(unit);

        return mapToResponse(updatedUnit);
    }

    // Activate or deactivate unit
    public UnitResponse updateUnitStatus(
            Long id,
            OperationalStatus status) {

        if (status == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Operational status is required"
            );
        }

        Unit unit = findUnit(id);

        unit.setStatus(status);

        return mapToResponse(unitRepository.save(unit));
    }

    // Delete unit
    public void deleteUnit(Long id) {

        Unit unit = findUnit(id);

        unitRepository.delete(unit);
    }

    // Find unit by ID
    private Unit findUnit(Long id) {

        if (id == null || id <= 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Unit ID must be positive"
            );
        }

        return unitRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Unit not found with ID: " + id
                ));
    }

    // Validate site
    private Site getValidSite(Long siteId) {

        if (siteId == null || siteId <= 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Site ID must be positive"
            );
        }

        return siteRepository.findById(siteId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Site not found with ID: " + siteId
                ));
    }

    // Normalize unit code
    private String normalizeUnitCode(String unitCode) {

        if (unitCode == null || unitCode.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Unit code is required"
            );
        }

        return unitCode.trim().toUpperCase(Locale.ROOT);
    }

    // Convert Entity to Response DTO
    private UnitResponse mapToResponse(Unit unit) {

        return new UnitResponse(
                unit.getId(),
                unit.getUnitName(),
                unit.getUnitCode(),
                unit.getSite().getId(),
                unit.getSite().getSiteName(),
                unit.getSite().getSiteCode(),
                unit.getStatus(),
                unit.getCreatedAt()
        );
    }
}
