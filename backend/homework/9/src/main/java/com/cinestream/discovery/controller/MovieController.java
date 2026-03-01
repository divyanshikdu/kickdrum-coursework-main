package com.cinestream.discovery.controller;

import com.cinestream.discovery.data.MovieData;
import com.cinestream.discovery.model.Movie;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import com.cinestream.discovery.data.DirectorData;
import com.cinestream.discovery.model.Director;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import com.cinestream.discovery.data.ReviewData;
import com.cinestream.discovery.model.Review;
import org.springframework.graphql.data.method.annotation.MutationMapping;



@Controller
public class MovieController {

    @QueryMapping
    public Movie findMovieById(@Argument String id) {
        return MovieData.movies.stream()
                .filter(m -> m.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
    @SchemaMapping(typeName = "Movie", field = "director")
    public Director getDirector(Movie movie) {
        return DirectorData.directors.stream()
                .filter(d -> d.getId().equals(movie.getDirectorId()))
                .findFirst()
                .orElse(null);
    }
    @MutationMapping
    public Movie addReview(@Argument String movieId,
                           @Argument String comment,
                           @Argument int rating) {

        Review review = new Review(movieId, comment, rating);
        ReviewData.reviews.add(review);

        return MovieData.movies.stream()
                .filter(m -> m.getId().equals(movieId))
                .findFirst()
                .map(m -> {
                    m.addReview(review);
                    return m;
                })
                .orElse(null);
    }


}
