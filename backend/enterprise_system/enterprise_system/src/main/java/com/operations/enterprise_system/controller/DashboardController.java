
package com.operations.enterprise_system.controller;

import com.operations.enterprise_system.dto.dashboard.DashboardResponse;
import com.operations.enterprise_system.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    // Get dashboard statistics
    @GetMapping("/statistics")
    public ResponseEntity<DashboardResponse> getDashboardStatistics() {

        return ResponseEntity.ok(
                dashboardService.getDashboardStatistics()
        );
    }
}
