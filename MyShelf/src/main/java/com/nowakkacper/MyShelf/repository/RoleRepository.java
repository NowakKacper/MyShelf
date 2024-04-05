package com.nowakkacper.MyShelf.repository;

import com.nowakkacper.MyShelf.entity.Role;
import com.nowakkacper.MyShelf.entity.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

    Optional<Role> findByName(RoleEnum name);
}
