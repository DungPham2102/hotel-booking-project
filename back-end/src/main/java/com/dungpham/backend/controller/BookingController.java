package com.dungpham.backend.controller;


import com.dungpham.backend.exception.ResourceNotFoundException;
import com.dungpham.backend.model.BookedRoom;
import com.dungpham.backend.response.BookingResponse;
import com.dungpham.backend.service.IBookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/bookings")
public class BookingController {

//    private final IBookingService bookingService;
//
//    @GetMapping("/all-bookings")
//    public ResponseEntity<List<BookingResponse>> getAllBookings() {
//        List<BookedRoom> bookings = bookingService.getAllBookings();
//        List<BookingResponse> bookingResponses = new ArrayList<>();
//        for(BookedRoom booking : bookings){
//            BookingResponse bookingResponse = getBookingResponse(booking);
//            bookingResponses.add(bookingResponse);
//        }
//        return ResponseEntity.ok(bookingResponses);
//    }
//
//    @GetMapping("/confirmation/{confirmationCode}")
//    public ResponseEntity<?> getBookingByConfirmationCode( @PathVariable String confirmationCode) {
//        try{
//            BookedRoom booking = bookingService.findByBookingConfirmationCode(confirmationCode);
//            BookingResponse bookingResponse = getBookingResponse(booking);
//            return ResponseEntity.ok(bookingResponse);
//        }catch(ResourceNotFoundException ex){
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
//
//        }
//    }
//
//    public ResponseEntity<?> saveBooking(@PathVariable Long roomId,
//                                         @RequestBody BookedRoom bookingRequest){
//        try{
//            String confirmationCode = bookingService.saveBooking(roomId, bookingRequest);
//            return ResponseEntity.ok("Room booked successfully. Confirmation code: " + confirmationCode);
//        }catch(InvalidBookingRequestException ex){
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
//
//        }
//    }


}











