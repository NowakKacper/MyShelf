package com.nowakkacper.MyShelf.repository;

import com.nowakkacper.MyShelf.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Integer> {

    List<Rating> findByBook_Id(int id);

    Optional<Rating> findByUser_IdAndBook_Id(int userId, int bookId);
    int countByBook_Id(int id);
    void deleteById(int id);
}
