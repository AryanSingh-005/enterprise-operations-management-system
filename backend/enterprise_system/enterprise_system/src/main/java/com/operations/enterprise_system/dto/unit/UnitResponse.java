
package com.operations.enterprise_system.dto.unit;

import com.operations.enterprise_system.entity.enums.OperationalStatus;

import java.time.LocalDateTime;

public record UnitResponse(

        Long id,

        String unitName,

        String unitCode,

        Long siteId,

        String siteName,

        String siteCode,

        OperationalStatus status,

        LocalDateTime createdAt

) {}
