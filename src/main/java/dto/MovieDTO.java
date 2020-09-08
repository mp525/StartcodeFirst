/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package dto;
import entities.Movie;
import java.util.ArrayList;
import java.util.List;
/**
 *
 * @author Mathias
 */
public class MovieDTO {
    private long id;
    private int year;
    private String title;
    private String producer;

    public MovieDTO(Movie movie) {
        this.year = movie.getYear();
        this.title = movie.getTitle();
        this.producer = movie.getProducer();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
    
    

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getProducer() {
        return producer;
    }

    public void setProducer(String producer) {
        this.producer = producer;
    }
    
    public static List<MovieDTO> toDTO(List<Movie> movieList){
        List<MovieDTO> listDTO = new ArrayList();
        for (Movie movie : movieList) {
                listDTO.add(new MovieDTO(movie));
        } //Måske lambda expression?
        return listDTO;
    }
    
    
}
