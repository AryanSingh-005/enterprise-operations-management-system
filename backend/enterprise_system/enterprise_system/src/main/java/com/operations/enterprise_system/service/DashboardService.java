
package com.operations.enterprise_system.service;

import com.operations.enterprise_system.dto.dashboard.DashboardResponse;
import com.operations.enterprise_system.entity.enums.OperationalStatus;
import com.operations.enterprise_system.entity.enums.Role;
import com.operations.enterprise_system.repository.SiteRepository;
import com.operations.enterprise_system.repository.UnitRepository;
import com.operations.enterprise_system.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class DashboardService {

    private final UserRepository userRepository;
    private final SiteRepository siteRepository;
    private final UnitRepository unitRepository;

    public DashboardService(
            UserRepository userRepository,
            SiteRepository siteRepository,
            UnitRepository unitRepository) {

        this.userRepository = userRepository;
        this.siteRepository = siteRepository;
        this.unitRepository = unitRepository;
    }

    // Get complete dashboard statistics
    public DashboardResponse getDashboardStatistics() {

        // User statistics
        long totalUsers = userRepository.count();

        long totalSuperAdmins =
                userRepository.countByRole(Role.SUPER_ADMIN);

        long totalAdmins =
                userRepository.countByRole(Role.ADMIN);

        long totalSiteManagers =
                userRepository.countByRole(Role.SITE_MANAGER);

        long totalEmployees =
                userRepository.countByRole(Role.EMPLOYEE);

        // Site statistics
        long totalSites = siteRepository.count();

        long activeSites =
                siteRepository.countByStatus(OperationalStatus.ACTIVE);

        long inactiveSites =
                siteRepository.countByStatus(OperationalStatus.INACTIVE);

        // Unit statistics
        long totalUnits = unitRepository.count();

        long activeUnits =
                unitRepository.countByStatus(OperationalStatus.ACTIVE);

        long inactiveUnits =
                unitRepository.countByStatus(OperationalStatus.INACTIVE);

        return new DashboardResponse(
                totalUsers,
                totalSuperAdmins,
                totalAdmins,
                totalSiteManagers,
                totalEmployees,
                totalSites,
                activeSites,
                inactiveSites,
                totalUnits,
                activeUnits,
                inactiveUnits
        );
    }
}
