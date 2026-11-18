
package com.operations.enterprise_system.entity;

import com.operations.enterprise_system.entity.enums.OperationalStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "units",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_unit_code_per_site",
                        columnNames = {"site_id", "unit_code"}
                )
        },
        indexes = {
                @Index(name = "idx_unit_site_id", columnList = "site_id"),
                @Index(name = "idx_unit_status", columnList = "status")
        }
)
@Getter
@Setter
@NoArgsConstructor
public class Unit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "unit_name", nullable = false, length = 150)
    private String unitName;

    @Column(name = "unit_code", nullable = false, length = 50)
    private String unitCode;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "site_id", nullable = false)
    private Site site;

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
