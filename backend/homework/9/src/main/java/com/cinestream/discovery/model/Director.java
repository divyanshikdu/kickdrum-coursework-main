package com.cinestream.discovery.model;

public class Director {

    private String id;
    private String name;
    private int totalAwards;

    public Director(String id, String name, int totalAwards) {
        this.id = id;
        this.name = name;
        this.totalAwards = totalAwards;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getTotalAwards() {
        return totalAwards;
    }
}
