package com.nowakkacper.MyShelf.controller;

import com.nowakkacper.MyShelf.model.BookRateModel;
import com.nowakkacper.MyShelf.service.RatingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/rates")
public class RatingController {

    private final RatingService ratingService;

    @PostMapping
    public ResponseEntity<?> createOrUpdateRating(@Valid @RequestBody BookRateModel bookRateModel){
        ratingService.createOrUpdateRating(bookRateModel);
        return ResponseEntity.ok().build();
    }
}
