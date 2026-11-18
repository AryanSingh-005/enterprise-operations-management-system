
package com.operations.enterprise_system.service;

import com.operations.enterprise_system.dto.site.SiteRequest;
import com.operations.enterprise_system.dto.site.SiteResponse;
import com.operations.enterprise_system.entity.Site;
import com.operations.enterprise_system.entity.User;
import com.operations.enterprise_system.entity.enums.OperationalStatus;
import com.operations.enterprise_system.entity.enums.Role;
import com.operations.enterprise_system.repository.SiteRepository;
import com.operations.enterprise_system.repository.UnitRepository;
import com.operations.enterprise_system.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Locale;

@Service
public class SiteService {

    private final SiteRepository siteRepository;
    private final UserRepository userRepository;
    private final UnitRepository unitRepository;

    public SiteService(
            SiteRepository siteRepository,
            UserRepository userRepository,
            UnitRepository unitRepository) {
        this.siteRepository = siteRepository;
        this.userRepository = userRepository;
        this.unitRepository = unitRepository;
    }

    // Create Site
    @Transactional
    public SiteResponse createSite(SiteRequest request) {

        String siteCode = normalizeSiteCode(request.siteCode());

        if (siteRepository.existsBySiteCode(siteCode)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Site code already exists"
            );
        }

        User manager = getValidManager(request.siteManagerId());

        Site site = new Site();
        site.setSiteName(request.siteName().trim());
        site.setSiteCode(siteCode);
        site.setLocation(request.location().trim());
        site.setSiteManager(manager);
        site.setStatus(request.status());

        return mapToResponse(siteRepository.save(site));
    }

    // Get All Sites
    @Transactional(readOnly = true)
    public List<SiteResponse> getAllSites() {

        return siteRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // Get Site By ID
    @Transactional(readOnly = true)
    public SiteResponse getSiteById(Long id) {

        return mapToResponse(findSite(id));
    }

    // Search and Filter Sites
    @Transactional(readOnly = true)
    public List<SiteResponse> searchSites(
            String name,
            String location,
            OperationalStatus status) {

        return siteRepository.searchSites(
                        normalizeFilter(name),
                        normalizeFilter(location),
                        status)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // Update Site
    @Transactional
    public SiteResponse updateSite(Long id, SiteRequest request) {

        Site site = findSite(id);
        String siteCode = normalizeSiteCode(request.siteCode());

        if (siteRepository.existsBySiteCodeAndIdNot(siteCode, id)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Site code already exists"
            );
        }

        User manager = getValidManager(request.siteManagerId());

        site.setSiteName(request.siteName().trim());
        site.setSiteCode(siteCode);
        site.setLocation(request.location().trim());
        site.setSiteManager(manager);
        site.setStatus(request.status());

        return mapToResponse(siteRepository.save(site));
    }

    // Activate or Deactivate Site
    @Transactional
    public SiteResponse updateSiteStatus(
            Long id,
            OperationalStatus status) {

        if (status == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Site status is required"
            );
        }

        Site site = findSite(id);
        site.setStatus(status);

        return mapToResponse(siteRepository.save(site));
    }

    // Delete Site
    @Transactional
    public void deleteSite(Long id) {

        Site site = findSite(id);

        if (unitRepository.existsBySiteId(id)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Cannot delete site because operational units are associated with it"
            );
        }

        siteRepository.delete(site);
    }

    // Find Site
    private Site findSite(Long id) {

        if (id == null || id <= 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Site ID must be a positive number"
            );
        }

        return siteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Site not found with ID: " + id
                ));
    }

    // Validate Site Manager
    private User getValidManager(Long managerId) {

        if (managerId == null || managerId <= 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Valid Site Manager ID is required"
            );
        }

        User manager = userRepository.findById(managerId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Site Manager not found"
                ));

        if (!manager.isActive()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Site Manager account is inactive"
            );
        }

        if (manager.getRole() != Role.SITE_MANAGER) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Selected user must have SITE_MANAGER role"
            );
        }

        return manager;
    }

    // Normalize Site Code
    private String normalizeSiteCode(String siteCode) {

        if (siteCode == null || siteCode.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Site code is required"
            );
        }

        return siteCode.trim().toUpperCase(Locale.ROOT);
    }

    // Normalize Search Filters
    private String normalizeFilter(String value) {

        if (value == null || value.isBlank()) {
            return null;
        }

        return value.trim();
    }

    // Convert Entity to Response DTO
    private SiteResponse mapToResponse(Site site) {

        User manager = site.getSiteManager();

        return new SiteResponse(
                site.getId(),
                site.getSiteName(),
                site.getSiteCode(),
                site.getLocation(),
                manager != null ? manager.getId() : null,
                manager != null ? manager.getName() : null,
                manager != null ? manager.getEmail() : null,
                site.getStatus(),
                site.getCreatedAt()
        );
    }
}
