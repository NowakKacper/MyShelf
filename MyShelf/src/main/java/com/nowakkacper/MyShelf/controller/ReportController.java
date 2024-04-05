package com.nowakkacper.MyShelf.controller;

import com.nowakkacper.MyShelf.entity.Book;
import com.nowakkacper.MyShelf.entity.CategoryEnum;
import com.nowakkacper.MyShelf.entity.Report;
import com.nowakkacper.MyShelf.model.ReportResponse;
import com.nowakkacper.MyShelf.service.BookService;
import com.nowakkacper.MyShelf.service.ReportService;
import com.nowakkacper.MyShelf.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;
    private final UserService userService;
    private final BookService bookService;

    @GetMapping
    public List<ReportResponse> getAllReports(){
        return reportService.getAllReports();
    }

    @GetMapping("/{id}")
    public void acceptReport(@PathVariable int id){
        Report report = reportService.getReport(id);
        Book book = bookService.getBook(report.getBookId());
        if(!book.getTitle().equals(report.getSuggestedTitle()) ||
                !book.getAuthor().equals(report.getSuggestedAuthor()) ||
                !book.getCategory().equals(report.getSuggestedCategory())){
            book.setTitle(report.getSuggestedTitle());
            book.setAuthor(report.getSuggestedAuthor());
            book.setCategory(report.getSuggestedCategory());
        }
        bookService.save(book);
        reportService.deleteReport(report.getId());
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> reportBook(
            @PathVariable int id,
            @RequestParam("description") String description,
            @RequestParam("title") String title,
            @RequestParam("author") String author,
            @RequestParam("category") String category,
            @RequestParam("user_id") int user_id){
        CategoryEnum categoryEnum = Enum.valueOf(CategoryEnum.class, category);
        String username = userService.getUser(user_id).getUsername();
        return reportService.saveReport(id, description, title, author, categoryEnum, username);
    }

    @DeleteMapping("/{id}")
    public void deleteReport(@PathVariable int id){
        reportService.deleteReport(id);
    }
}
