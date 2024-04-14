package com.dungpham.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookedRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @Column(name = "check_In") // đổi tên cột để lúc tạo ra cột trong csdl nó không ra tên checkInDate mà ra bảng check_In
    private LocalDate checkInDate;

    @Column(name = "check_Out") // lý do tương tự như trên
    private LocalDate checkOutDate;

    @Column(name = "guest_FullName") // lý do tương tự như trên
    private String guestFullName;

    @Column(name = "guest_Email") // lý do tương tự như trên
    private String guestEmail;

    @Column(name = "adults") // lý do tương tự như trên
    private int NumOfAdults;

    @Column(name = "children") // lý do tương tự như trên
    private int NumOfChildren;

    @Column(name = "total_guest") // lý do tương tự như trên
    private int totalNumOfGuest;

    @Column(name = "confirmation_Code") // lý do tương tự như trên
    private String bookingConfirmationCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;



    public void calculateTotalNumberOfGuest() {
        this.totalNumOfGuest = this.NumOfAdults + this.NumOfChildren;
    }

    // không dùng lombok để tạo getter và setter do mỗi lần set lại NumOfAdults hoặc NumOfChildren thì cần gọi hàm calculateTotalNumberOfGuest()
    public void setNumOfAdults(int numOfAdults) {
        NumOfAdults = numOfAdults;
        calculateTotalNumberOfGuest();
    }

    public void setNumOfChildren(int numOfChildren) {
        NumOfChildren = numOfChildren;
        calculateTotalNumberOfGuest();
    }

    public void setBookingConfirmationCode(String bookingConfirmationCode) {
        this.bookingConfirmationCode = bookingConfirmationCode;
    }

}
