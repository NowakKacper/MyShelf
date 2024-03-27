package com.nowakkacper.MyShelf.service;

import com.nowakkacper.MyShelf.entity.Book;
import com.nowakkacper.MyShelf.entity.Rating;
import com.nowakkacper.MyShelf.entity.User;
import com.nowakkacper.MyShelf.exception.ResourceNotFoundException;
import com.nowakkacper.MyShelf.model.BookModel;
import com.nowakkacper.MyShelf.model.BookResponse;
import com.nowakkacper.MyShelf.repository.BookRepository;
import com.nowakkacper.MyShelf.repository.RatingRepository;
import com.nowakkacper.MyShelf.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class BookService {
    BookRepository bookRepository;
    UserRepository userRepository;
    RatingService rateService;
    BookAuthenticationService bookAuthenticationService;
    RatingRepository ratingRepository;

    public BookService(BookRepository bookRepository, UserRepository userRepository, RatingService rateService, RatingRepository ratingRepository) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
        this.rateService = rateService;
        this.ratingRepository = ratingRepository;
    }

    @Autowired
    public void setBookAuthenticationService(BookAuthenticationService bookAuthenticationService) {
        this.bookAuthenticationService = bookAuthenticationService;
    }

    public List<BookResponse> getAcceptedBooks(){
        return getBookResponse(bookRepository.getAcceptedBooks());
    }


    public List<BookResponse> getBookResponse(List<Book> books){
        Authentication authentication = bookAuthenticationService.getAuthentication();
        if(bookAuthenticationService.isInstanceUserDetailsImpl(authentication)) {
            int currentUserId = bookAuthenticationService.getUserId(authentication);

            return mapBookToBookResponse(books, currentUserId);
        }
        return new ArrayList<>();
    }

    private List<BookResponse> mapBookToBookResponse(List<Book> books, int currentUserId) {
        return books.stream()
                .map(book -> BookResponse.builder()
                        .id(book.getId())
                        .title(book.getTitle())
                        .author(book.getAuthor())
                        .category(book.getCategory().name())
                        .avg_rate(rateService.getAverageRate(book))
                        .user_rate(getUserRate(book,currentUserId))
                        .userName(book.getUser().getUsername())
                        .amountOfRatings(ratingRepository.countByBook_Id(book.getId()))
                        .build()
                )
                .collect(Collectors.toList());
    }
    private int getUserRate(Book book, int currentUserId){
        return book.getRatings()
                .stream()
                .filter(rate -> rate.getUser().getId() == currentUserId)
                .map(Rating::getRating)
                .findFirst()
                .orElse(-1);
    }

    public BookResponse getBookResponse(int id){
        Book book = bookRepository.findById(id)
                .orElseThrow(ResourceNotFoundException::new);
        return getBookResponse(Collections.singletonList(book)).stream().findFirst()
                .orElseThrow(ResourceNotFoundException::new);
    }

    public Book getBook(int id){
        return bookRepository.findById(id)
                .orElseThrow(ResourceNotFoundException::new);
    }

    public void save(BookModel bookModel){
        User user = userRepository.findById(bookModel.getUser_id())
                .orElseThrow(ResourceNotFoundException::new);

        Book book = new Book();
        book.setTitle(bookModel.getTitle());
        book.setAuthor(bookModel.getAuthor());
        book.setCategory(bookModel.getCategory());
        book.setUser(user);

        book.setAccepted(isAdmin(bookModel.getUser_id()));

        bookRepository.save(book);
    }

    public void save(Book book){
        bookRepository.save(book);
    }

    public void updateBook(int id, BookModel updatedBook) {
        Book book = bookRepository.findById(id).orElseThrow(ResourceNotFoundException::new
        );
        book.setTitle(updatedBook.getTitle());
        book.setAuthor(updatedBook.getAuthor());
        book.setCategory(updatedBook.getCategory());


        bookRepository.save(book);
    }

    public void deleteBook(int id) {
        Book book = bookRepository.findById(id).orElseThrow(ResourceNotFoundException::new
        );
        List<Rating> bookRatings = rateService.findByBook_Id(id);
        bookRatings.forEach(rate ->{
            rateService.deleteById(rate.getId());
        });

        bookRepository.delete(book);
    }

    public List<BookResponse> getBooksToAccept(){
        return getBookResponse(bookRepository.getBooksNotAccepted());
    }

    public boolean isAdmin(int id){
        User user = userRepository.getUserById(id);
        return user.getRoles().stream()
                .anyMatch(role -> role.getName().name().equals("ROLE_ADMIN"));
    }


    public List<BookResponse> getUserBooks(int id) {
        List<Book> userBooks = bookRepository.findByUser_Id(id);
        if(userBooks.isEmpty()) return new ArrayList<>();
        else{
            return getBookResponse(userBooks);
        }
    }
}
