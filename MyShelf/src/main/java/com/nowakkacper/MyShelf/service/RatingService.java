package com.nowakkacper.MyShelf.service;

import com.nowakkacper.MyShelf.entity.Book;
import com.nowakkacper.MyShelf.entity.Rating;
import com.nowakkacper.MyShelf.entity.User;
import com.nowakkacper.MyShelf.exception.ResourceNotFoundException;
import com.nowakkacper.MyShelf.model.BookRateModel;
import com.nowakkacper.MyShelf.repository.BookRepository;
import com.nowakkacper.MyShelf.repository.RatingRepository;
import com.nowakkacper.MyShelf.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RatingService {

    private final BookRepository bookRepository;

    private final UserRepository userRepository;

    private final RatingRepository ratingRepository;

    public double getAverageRate(Book book) {
        double avg_rate = book.getRatings().stream()
                .mapToInt(Rating::getRating)
                .average()
                .orElse(0d);
        return Math.round(avg_rate*10.0)/10.0;
    }

    public void createOrUpdateRating(BookRateModel bookRateModel) {
        Book book = bookRepository.findById(bookRateModel.getBookId()).orElseThrow(ResourceNotFoundException::new);

        User user = userRepository.findById(bookRateModel.getUserId()).orElseThrow(ResourceNotFoundException::new);
        if (user == null)
            throw new ResourceNotFoundException();

        Rating rating =  new Rating();
        rating.setRating(bookRateModel.getRate());
        rating.setUser(user);
        rating.setBook(book);

        if(!checkRates(user.getId(), book.getId())) {
            ratingRepository.save(rating);
        }
        else {
            Rating updateRating = getUserRates(user.getId(), book.getId());
            updateRating.setRating(bookRateModel.getRate());
            ratingRepository.save(updateRating);
        }
    }

    private Rating getUserRates(int userId, int bookId) {
        return ratingRepository.findByUser_IdAndBook_Id(userId,bookId).orElseThrow(
                () -> new RuntimeException("No ratings for this user"));
    }

    private boolean checkRates(int userId, int bookId) {
        return ratingRepository.findByUser_IdAndBook_Id(userId,bookId).isPresent();
    }

    public List<Rating> findByBook_Id(int id) {
        return ratingRepository.findByBook_Id(id);
    }

    public void deleteById(int id) {
        ratingRepository.deleteById(id);
    }
}
