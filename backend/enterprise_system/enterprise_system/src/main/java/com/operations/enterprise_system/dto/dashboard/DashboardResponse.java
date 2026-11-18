
package com.operations.enterprise_system.dto.dashboard;

public record DashboardResponse(

        // User statistics
        long totalUsers,
        long totalSuperAdmins,
        long totalAdmins,
        long totalSiteManagers,
        long totalEmployees,

        // Site statistics
        long totalSites,
        long activeSites,
        long inactiveSites,

        // Unit statistics
        long totalUnits,
        long activeUnits,
        long inactiveUnits

) {}
