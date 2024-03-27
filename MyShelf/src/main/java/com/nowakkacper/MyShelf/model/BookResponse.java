package com.nowakkacper.MyShelf.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BookResponse {

    private int id;

    private String title;

    private String author;

    private String category;

    private double avg_rate;

    private int user_rate;

    private String userName;

    private int amountOfRatings;
}
