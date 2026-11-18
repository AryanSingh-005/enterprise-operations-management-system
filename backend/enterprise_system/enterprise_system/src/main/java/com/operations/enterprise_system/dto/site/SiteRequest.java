
package com.operations.enterprise_system.dto.site;

import com.operations.enterprise_system.entity.enums.OperationalStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record SiteRequest(

        @NotBlank(message = "Site name is required")
        @Size(min = 2, max = 150,
                message = "Site name must be between 2 and 150 characters")
        String siteName,

        @NotBlank(message = "Site code is required")
        @Size(min = 2, max = 50,
                message = "Site code must be between 2 and 50 characters")
        String siteCode,

        @NotBlank(message = "Location is required")
        @Size(min = 2, max = 255,
                message = "Location must be between 2 and 255 characters")
        String location,

        @NotNull(message = "Site manager ID is required")
        Long siteManagerId,

        @NotNull(message = "Operational status is required")
        OperationalStatus status

) {}
