package com.kickdrum.smarthome.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "houses")
public class House extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String address;

    @ManyToOne
    @JoinColumn(name = "admin_user_id", nullable = false)
    private User admin;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }

    public User getAdmin() {
        return admin;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setAdmin(User admin) {
        this.admin = admin;
    }
}
