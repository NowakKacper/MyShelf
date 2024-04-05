package com.nowakkacper.MyShelf.model;

import com.nowakkacper.MyShelf.entity.CategoryEnum;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReportResponse {

    private int id;

    private String description;

    private String suggestedTitle;

    private String suggestedAuthor;

    @Enumerated(EnumType.STRING)
    private CategoryEnum suggestedCategory;

    private String username;

    private String bookTitle;

    private String bookAuthor;

    @Enumerated(EnumType.STRING)
    private CategoryEnum bookCategory;
}
