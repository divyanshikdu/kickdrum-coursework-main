package com.cinestream.discovery.data;

import com.cinestream.discovery.model.Movie;
import java.util.List;

public class MovieData {

    public static List<Movie> movies = List.of(
            new Movie("1", "Inception", "Sci-Fi", "101"),
            new Movie("2", "Interstellar", "Sci-Fi", "101"),
            new Movie("3", "Dunkirk", "War", "101")
    );
}
