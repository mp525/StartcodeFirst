package facades;

import dto.MovieDTO;
import utils.EMF_Creator;
import entities.Movie;
import static io.restassured.RestAssured.given;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import static org.hamcrest.Matchers.hasItems;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

//Uncomment the line below, to temporarily disable this test
//@Disabled
public class MovieFacadeTest {

    private static EntityManagerFactory emf;
    private static MovieFacade facade;

    private Movie m1;
    private Movie m2;
    private Movie m3;

    public MovieFacadeTest() {
    }

    @BeforeAll
    public static void setUpClass() {
        emf = EMF_Creator.createEntityManagerFactoryForTest();
        facade = MovieFacade.getFacadeExample(emf);
    }

    @AfterAll
    public static void tearDownClass() {
//        Clean up database after test is done or use a persistence unit with drop-and-create to start up clean on every test
    }

    // Setup the DataBase in a known state BEFORE EACH TEST
    //TODO -- Make sure to change the script below to use YOUR OWN entity class
    @BeforeEach
    public void setUp() {
        EntityManager em = emf.createEntityManager();
        m1 = new Movie(2001, "Harry Potter and the Philosopher's Stone", "J.K. Rowling", new String[]{"Daniel Radcliffe", "Emma Watson", "Alan Rickman", "Rupert Grint"});
        m2 = new Movie(2002, "Harry Potter and the Chamber of Secrets", "J.K. Rowling", new String[]{"Daniel Radcliffe", "Emma Watson", "Alan Rickman", "Rupert Grint"});
        m3 = new Movie(2019, "Once Upon a Time... in Hollywood", "J.K. Rowling", new String[]{"Leonardo DiCaprio", "Brad Pitt", "Margot Robbie"});
        try {
            em.getTransaction().begin();
            em.createQuery("DELETE from Movie").executeUpdate();
            em.persist(m1);
            em.persist(m2);
            em.persist(m3);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }

    @AfterEach
    public void tearDown() {
//        Remove any data after each test was run
    }

    // TODO: Delete or change this method 
    @Test
    public void testGetMovieCount() {
        assertEquals(3, facade.getMovieCount(), "Expects three rows in the database");
    }

    @Test
    public void testGetMovieByTitle() {
        List<MovieDTO> list = facade.getMoviesByTitle("Harry Potter");
        MovieDTO movie = null;
        for (MovieDTO movieDTO : list) {
            if (movieDTO.getTitle().equals("Harry Potter and the Philosopher's Stone")) {
                movie = movieDTO;
            }
        }
        assertEquals(movie.getTitle(), "Harry Potter and the Philosopher's Stone");
    }

    @Test
    public void testGetMovieByID() {
        MovieDTO movie = facade.getMovieById(m1.getId());
        String title = "Harry Potter and the Philosopher's Stone";
        assertEquals(title, movie.getTitle());
    }

    //@Test
    public void testGetAllMovies() {
        List<MovieDTO> list = facade.getAllMovies();
        
    }
}
