package com.nowakkacper.MyShelf.model;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class BookRateModel {

    @Min(1)
    @Max(10)
    private int rate;

    private int bookId;

    private int userId;
}
