package facades;

import dto.MovieDTO;
import entities.Movie;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;
import utils.EMF_Creator;

/**
 *
 * Rename Class to a relevant name Add add relevant facade methods
 */
public class MovieFacade {

    private static MovieFacade instance;
    private static EntityManagerFactory emf;

    //Private Constructor to ensure Singleton
    private MovieFacade() {
    }

    /**
     *
     * @param _emf
     * @return an instance of this facade class.
     */
    public static MovieFacade getFacadeExample(EntityManagerFactory _emf) {
        if (instance == null) {
            emf = _emf;
            instance = new MovieFacade();
        }
        return instance;
    }

    private EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    //TODO Remove/Change this before use
    public long getMovieCount() {
        EntityManager em = emf.createEntityManager();
        try {
            long movieCount = (long) em.createQuery("SELECT COUNT(m) FROM Movie m").getSingleResult();
            return movieCount;
        } finally {
            em.close();
        }

    }

    public Movie addMovie(int year, String title, String producer, String[] actors) {
        EntityManager em = emf.createEntityManager();
        Movie movie = new Movie(year, title, producer, actors);
        try {
            em.getTransaction().begin();
            em.persist(movie);
            em.getTransaction().commit();
            return movie;
        } finally {
            em.close();
        }
    }

    public List<MovieDTO> getAllMovies() {
        EntityManager em = emf.createEntityManager();
        try {
            TypedQuery<Movie> query = em.createQuery("SELECT m FROM Movie m", Movie.class);
            List<Movie> movies = query.getResultList();
            List<MovieDTO> listDTO = MovieDTO.toDTO(movies);
            return listDTO;
        } finally {
            em.close();
        }
    }

    public List<MovieDTO> getMoviesByTitle(String title) {
        EntityManager em = emf.createEntityManager();
        TypedQuery<Movie> query = em.createQuery("SELECT m FROM Movie m WHERE m.title LIKE :title", Movie.class);
        query.setParameter("title", "%" + title + "%");
        List<Movie> movies = query.getResultList();
        List<MovieDTO> movieDTOs = MovieDTO.toDTO(movies);

        return movieDTOs;
    }

    public MovieDTO getMovieById(long id) {
        EntityManager em = emf.createEntityManager();
        Movie m = em.find(Movie.class, id);
        return new MovieDTO(m);
    }

    public static void main(String[] args) {
        //Create emf pointing to the dev-database
        EntityManagerFactory emf = EMF_Creator.createEntityManagerFactory();

        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();
            em.createQuery("DELETE from Movie").executeUpdate();
            em.persist(new Movie(2002, "Harry Potter and the Chamber of Secrets", "J.K. Rowling", new String[]{"Daniel Radcliffe", "Emma Watson", "Alan Rickman", "Rupert Grint"}));
            em.persist(new Movie(2001, "Harry Potter and the Philosopher's Stone", "J.K. Rowling", new String[]{"Daniel Radcliffe", "Emma Watson", "Alan Rickman", "Rupert Grint"}));
            em.persist(new Movie(2019, "Once Upon a Time... in Hollywood", "J.K. Rowling", new String[]{"Leonardo DiCaprio", "Brad Pitt", "Margot Robbie"}));
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }

}
