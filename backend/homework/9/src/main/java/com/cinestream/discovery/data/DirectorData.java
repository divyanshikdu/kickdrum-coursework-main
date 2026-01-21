package com.cinestream.discovery.data;

import com.cinestream.discovery.model.Director;
import java.util.List;

public class DirectorData {

    public static List<Director> directors = List.of(
            new Director("101", "Christopher Nolan", 34),
            new Director("102", "Steven Spielberg", 50)
    );
}
