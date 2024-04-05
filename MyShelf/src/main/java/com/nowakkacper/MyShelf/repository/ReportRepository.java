package com.nowakkacper.MyShelf.repository;

import com.nowakkacper.MyShelf.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {

}
