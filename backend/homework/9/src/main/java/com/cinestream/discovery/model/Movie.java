package com.cinestream.discovery.model;
import java.util.ArrayList;
import java.util.List;


public class Movie {

    private String id;
    private String title;
    private String genre;
    private String directorId;
    private List<Review> reviews = new ArrayList<>();


    public Movie(String id, String title, String genre, String directorId) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.directorId = directorId;
    }

    public String getId() {
        return id;
    }
    public List<Review> getReviews() {
        return reviews;
    }
    public void addReview(Review review) {
        this.reviews.add(review);
    }


    public String getTitle() {
        return title;
    }

    public String getGenre() {
        return genre;
    }

    public String getDirectorId() {
        return directorId;
    }
}
