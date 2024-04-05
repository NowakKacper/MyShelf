package com.nowakkacper.MyShelf.repository;

import com.nowakkacper.MyShelf.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {


    @Query(value = "SELECT * from book where is_accepted=FALSE", nativeQuery = true)
    List<Book> getBooksNotAccepted();

    @Query(value = "SELECT * from book where is_accepted=True", nativeQuery = true)
    List<Book> getAcceptedBooks();
    List<Book> findByUser_Id(int id);

    @Query(value = "SELECT * FROM book WHERE (title LIKE %:searchValue% OR author LIKE %:searchValue%)", nativeQuery = true)
    List<Book> findByTitleOrAuthorContaining(String searchValue);

}
