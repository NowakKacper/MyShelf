package com.nowakkacper.MyShelf.controller;

import com.nowakkacper.MyShelf.entity.Book;
import com.nowakkacper.MyShelf.model.BookResponse;
import com.nowakkacper.MyShelf.service.BookService;
import lombok.Data;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Data
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin/books")
public class AdminController{
    private final BookService bookService;

    @GetMapping
    public List<BookResponse> getBooksToAccept() {
        return bookService.getBooksToAccept();
    }

    @GetMapping("/{id}")
    public void acceptBook(@PathVariable int id){
        Book book = bookService.getBook(id);
        book.setAccepted(true);
        bookService.save(book);
    }

    @DeleteMapping("/{id}")
    public void rejectBook(@PathVariable int id){
        bookService.deleteBook(id);
    }
}
