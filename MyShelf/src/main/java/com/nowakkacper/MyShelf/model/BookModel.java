package com.nowakkacper.MyShelf.model;

import com.nowakkacper.MyShelf.entity.CategoryEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BookModel {

    private String title;

    private String author;

    private CategoryEnum category;

    private int user_id;
}
