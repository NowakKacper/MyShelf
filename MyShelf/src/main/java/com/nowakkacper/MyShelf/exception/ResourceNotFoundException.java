package com.nowakkacper.MyShelf.exception;

import lombok.RequiredArgsConstructor;

import java.io.Serial;

@RequiredArgsConstructor
public class ResourceNotFoundException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;
}
