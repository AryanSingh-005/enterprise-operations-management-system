
package com.operations.enterprise_system.controller;

import com.operations.enterprise_system.dto.unit.UnitRequest;
import com.operations.enterprise_system.dto.unit.UnitResponse;
import com.operations.enterprise_system.entity.enums.OperationalStatus;
import com.operations.enterprise_system.service.UnitService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping("/api/admin/units")
public class UnitController {

    private final UnitService unitService;

    public UnitController(UnitService unitService) {
        this.unitService = unitService;
    }

    // Create unit
    @PostMapping
    public ResponseEntity<UnitResponse> createUnit(
            @Valid @RequestBody UnitRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(unitService.createUnit(request));
    }

    // Get all units
    @GetMapping
    public ResponseEntity<List<UnitResponse>> getAllUnits() {

        return ResponseEntity.ok(unitService.getAllUnits());
    }

    // Get unit by ID
    @GetMapping("/{id}")
    public ResponseEntity<UnitResponse> getUnitById(
            @PathVariable
            @Positive(message = "Unit ID must be positive") Long id) {

        return ResponseEntity.ok(unitService.getUnitById(id));
    }

    // Get units by site ID
    @GetMapping("/site/{siteId}")
    public ResponseEntity<List<UnitResponse>> getUnitsBySiteId(
            @PathVariable
            @Positive(message = "Site ID must be positive") Long siteId) {

        return ResponseEntity.ok(
                unitService.getUnitsBySiteId(siteId));
    }

    // Get units by site ID and status
    @GetMapping("/site/{siteId}/status")
    public ResponseEntity<List<UnitResponse>> getUnitsBySiteIdAndStatus(
            @PathVariable
            @Positive(message = "Site ID must be positive") Long siteId,
            @RequestParam OperationalStatus status) {

        return ResponseEntity.ok(
                unitService.getUnitsBySiteIdAndStatus(siteId, status));
    }

    // Update unit
    @PutMapping("/{id}")
    public ResponseEntity<UnitResponse> updateUnit(
            @PathVariable
            @Positive(message = "Unit ID must be positive") Long id,
            @Valid @RequestBody UnitRequest request) {

        return ResponseEntity.ok(
                unitService.updateUnit(id, request));
    }

    // Activate or deactivate unit
    @PatchMapping("/{id}/status")
    public ResponseEntity<UnitResponse> updateUnitStatus(
            @PathVariable
            @Positive(message = "Unit ID must be positive") Long id,
            @RequestParam OperationalStatus status) {

        return ResponseEntity.ok(
                unitService.updateUnitStatus(id, status));
    }

    // Delete unit
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUnit(
            @PathVariable
            @Positive(message = "Unit ID must be positive") Long id) {

        unitService.deleteUnit(id);

        return ResponseEntity.noContent().build();
    }
}
