package com.nowakkacper.MyShelf.service;

import com.nowakkacper.MyShelf.entity.CategoryEnum;
import com.nowakkacper.MyShelf.entity.Report;
import com.nowakkacper.MyShelf.exception.ResourceNotFoundException;
import com.nowakkacper.MyShelf.model.ReportResponse;
import com.nowakkacper.MyShelf.repository.ReportRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportService {

    private final ReportRepository reportRepository;
    private final BookService bookService;

    public ReportService(ReportRepository reportRepository, BookService bookService) {
        this.reportRepository = reportRepository;
        this.bookService = bookService;
    }

    public ResponseEntity<?> saveReport(int id, String description, String title, String author, CategoryEnum categoryEnum, String username) {
        Report report = new Report();
        report.setDescription(description);
        report.setSuggestedTitle(title);
        report.setSuggestedAuthor(author);
        report.setSuggestedCategory(categoryEnum);
        report.setUsername(username);
        report.setBookId(id);

        reportRepository.save(report);
        return ResponseEntity.ok("The report has been successfully reported and will be handled by the administrator soon");
    }

    public List<ReportResponse> getAllReports() {
        return getReportResponse(reportRepository.findAll());
    }

    public void deleteReport(int id) {
        reportRepository.deleteById(id);
    }

    public Report getReport(int id) {
        return reportRepository.findById(id)
                .orElseThrow(ResourceNotFoundException::new);
    }

    public List<ReportResponse> getReportResponse(List<Report> reports){
        return reports.stream()
                .map(report -> ReportResponse.builder()
                        .id(report.getId())
                        .description(report.getDescription())
                        .suggestedTitle(report.getSuggestedTitle())
                        .suggestedAuthor(report.getSuggestedAuthor())
                        .suggestedCategory(report.getSuggestedCategory())
                        .username(report.getUsername())
                        .bookTitle(bookService.getBook(report.getBookId()).getTitle())
                        .bookAuthor(bookService.getBook(report.getBookId()).getAuthor())
                        .bookCategory(bookService.getBook(report.getBookId()).getCategory())
                        .build()
                )
                .collect(Collectors.toList());
    }
}
