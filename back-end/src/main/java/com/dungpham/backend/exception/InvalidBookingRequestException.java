package com.dungpham.backend.exception;

public class InvalidBookingRequestException extends RuntimeException {
    public InvalidBookingRequestException(String message){
        super(message);
    }
}
