
package com.operations.enterprise_system.controller;

import com.operations.enterprise_system.dto.site.SiteRequest;
import com.operations.enterprise_system.dto.site.SiteResponse;
import com.operations.enterprise_system.entity.enums.OperationalStatus;
import com.operations.enterprise_system.service.SiteService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping("/api/admin/sites")
public class SiteController {

    private final SiteService siteService;

    public SiteController(SiteService siteService) {
        this.siteService = siteService;
    }

    // Create site
    @PostMapping
    public ResponseEntity<SiteResponse> createSite(
            @Valid @RequestBody SiteRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(siteService.createSite(request));
    }

    // Get all sites
    @GetMapping
    public ResponseEntity<List<SiteResponse>> getAllSites() {

        return ResponseEntity.ok(siteService.getAllSites());
    }

    // Get site by ID
    @GetMapping("/{id}")
    public ResponseEntity<SiteResponse> getSiteById(
            @PathVariable @Positive(message = "Site ID must be positive") Long id) {

        return ResponseEntity.ok(siteService.getSiteById(id));
    }

    // Search and filter sites
    @GetMapping("/search")
    public ResponseEntity<List<SiteResponse>> searchSites(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) OperationalStatus status) {

        return ResponseEntity.ok(
                siteService.searchSites(name, location, status));
    }

    // Update site
    @PutMapping("/{id}")
    public ResponseEntity<SiteResponse> updateSite(
            @PathVariable @Positive(message = "Site ID must be positive") Long id,
            @Valid @RequestBody SiteRequest request) {

        return ResponseEntity.ok(siteService.updateSite(id, request));
    }

    // Activate or deactivate site
    @PatchMapping("/{id}/status")
    public ResponseEntity<SiteResponse> updateSiteStatus(
            @PathVariable @Positive(message = "Site ID must be positive") Long id,
            @RequestParam OperationalStatus status) {

        return ResponseEntity.ok(
                siteService.updateSiteStatus(id, status));
    }

    // Delete site
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSite(
            @PathVariable @Positive(message = "Site ID must be positive") Long id) {

        siteService.deleteSite(id);

        return ResponseEntity.noContent().build();
    }
}
