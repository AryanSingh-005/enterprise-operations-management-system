package com.operations.enterprise_system.dto.site;

import com.operations.enterprise_system.entity.enums.OperationalStatus;

import java.time.LocalDateTime;

    public record SiteResponse(
            Long id,
            String siteName,
            String siteCode,
            String location,
            Long siteManagerId,
            String siteManagerName,
            String siteManagerEmail,
            OperationalStatus status,
            LocalDateTime createdAt
    ) {}
