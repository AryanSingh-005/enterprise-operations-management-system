
package com.operations.enterprise_system.dto.unit;

import com.operations.enterprise_system.entity.enums.OperationalStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record UnitRequest(

        @NotBlank(message = "Unit name is required")
        @Size(min = 2, max = 150,
                message = "Unit name must be between 2 and 150 characters")
        String unitName,

        @NotBlank(message = "Unit code is required")
        @Size(min = 2, max = 50,
                message = "Unit code must be between 2 and 50 characters")
        String unitCode,

        @NotNull(message = "Site ID is required")
        @Positive(message = "Site ID must be positive")
        Long siteId,

        @NotNull(message = "Operational status is required")
        OperationalStatus status

) {}
