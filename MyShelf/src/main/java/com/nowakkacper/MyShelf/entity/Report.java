package com.nowakkacper.MyShelf.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Entity
@RequiredArgsConstructor
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String description;

    private String suggestedTitle;

    private String suggestedAuthor;

    @Enumerated(EnumType.STRING)
    private CategoryEnum suggestedCategory;

    private String username;

    private int bookId;
}
