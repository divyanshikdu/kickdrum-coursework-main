package com.cinestream.discovery.model;

public class Review {

    private String movieId;
    private String comment;
    private int rating;

    public Review(String movieId, String comment, int rating) {
        this.movieId = movieId;
        this.comment = comment;
        this.rating = rating;
    }

    public String getMovieId() {
        return movieId;
    }

    public String getComment() {
        return comment;
    }

    public int getRating() {
        return rating;
    }
}
