package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.modal.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
