package com.nowakkacper.MyShelf.controller;

import com.nowakkacper.MyShelf.entity.CategoryEnum;
import com.nowakkacper.MyShelf.model.BookModel;
import com.nowakkacper.MyShelf.model.BookResponse;
import com.nowakkacper.MyShelf.service.BookService;
import com.nowakkacper.MyShelf.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    @GetMapping
    public List<BookResponse> getBooks(){
        return bookService.getAcceptedBooks();
    }

    @GetMapping("/{id}")
    public BookResponse getBook(@PathVariable int id){
        return bookService.getBookResponse(id);
    }

    @GetMapping("/user/{id}")
    public List<BookResponse> getUserBooks(@PathVariable int id){
        return bookService.getUserBooks(id);
    }

    @GetMapping("/filter/{searchValue}")
    public List<BookResponse> getMatchingBooks(@PathVariable String searchValue){
        return bookService.getMatchingBooks(searchValue);
    }

    @PostMapping
    public ResponseEntity<?> addBook(
            @RequestParam("title") String title,
            @RequestParam("author") String author,
            @RequestParam("category") String category,
            @RequestParam("user_id") int user_id){
        CategoryEnum categoryEnum = Enum.valueOf(CategoryEnum.class, category);
        return bookService.save(new BookModel(title, author, categoryEnum, user_id));
    }

    @PostMapping("/{id}")
    public void updateBook(
            @PathVariable int id,
            @RequestParam("title") String title,
            @RequestParam("author") String author,
            @RequestParam("category") String category,
            @RequestParam("user_id") int user_id){
        CategoryEnum categoryEnum = Enum.valueOf(CategoryEnum.class, category);
        bookService.updateBook(id, new BookModel(title,author,categoryEnum,user_id));
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable int id){
        bookService.deleteBook(id);
    }
}
