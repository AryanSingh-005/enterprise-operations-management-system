
package com.operations.enterprise_system.entity;

import com.operations.enterprise_system.entity.enums.OperationalStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "sites",
        indexes = {
                @Index(name = "idx_site_name", columnList = "site_name"),
                @Index(name = "idx_site_location", columnList = "location"),
                @Index(name = "idx_site_status", columnList = "status"),
                @Index(name = "idx_site_manager", columnList = "manager_id")
        }
)
@Getter
@Setter
@NoArgsConstructor
public class Site {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "site_name", nullable = false, length = 150)
    private String siteName;

    @Column(name = "site_code", nullable = false, unique = true, length = 50)
    private String siteCode;

    @Column(nullable = false, length = 255)
    private String location;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "manager_id", nullable = false)
    private User siteManager;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private OperationalStatus status = OperationalStatus.ACTIVE;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
