import React, { useEffect, useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { bookRoom, getRoomById } from "../utils/ApiFunctions";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment/moment";
import BookingSummary from "./BookingSummary";

const BookingForm = () => {
  const [isValidated, setIsValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [roomPrice, setRoomPrice] = useState(0);
  const [booking, setBooking] = useState({
    guestFullName: "",
    guestEmail: "",
    checkInDate: "",
    checkOutDate: "",
    numOfAdults: "",
    numOfChildren: "",
  });

  const [roomInfo, setRoomInfo] = useState({
    photo: "",
    roomType: "",
    roomPrice: "",
  });

  const { roomId } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBooking({ ...booking, [name]: value });
    setErrorMessage("");
  };

  const getRoomPriceById = async (roomId) => {
    try {
      const response = await getRoomById(roomId);
      setRoomPrice(response.roomPrice);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getRoomPriceById(roomId);
  }, [roomId]);

  const calculatePayment = () => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const diffInDays = checkOutDate.diff(checkInDate, "days");
    const paymentPerDay = roomPrice ? roomPrice : 0;
    return diffInDays * paymentPerDay;
  };

  const isGuestValid = () => {
    const adultCount = parseInt(booking.numOfAdults);
    const childrenCount = parseInt(booking.numOfChildren);
    const totalCount = adultCount + childrenCount;
    return adultCount >= 1;
  };

  const isCheckOutDateValid = () => {
    if (
      !moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))
    ) {
      setErrorMessage("Check-out date must come after check-in date");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (
      form.checkValidity() === false ||
      !isGuestValid() ||
      !isCheckOutDateValid()
    ) {
      e.stopPropagation();
    } else {
      setIsSubmitted(true);
    }
    setIsValidated(true);
  };

  const handleFormSubmit = async () => {
    try {
      const confirmationCode = await bookRoom(roomId, booking);
      setIsSubmitted(true);
      navigate("/booking-success", { state: { message: confirmationCode } });
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
      navigate("/booking-success", { state: { error: errorMessage } });
    }
  };

  return (
    <>
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card card-body mt-5">
              <h4 className="card card-title">Reserve Room</h4>
              <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label htmlFor="guestName" className="hotel-color">
                    Full Name:
                  </Form.Label>
                  <Form.Control
                    id="guestFullName"
                    value={booking.guestFullName}
                    placeholder="Enter your fullname"
                    type="text"
                    name="guestFullName"
                    onChange={handleInputChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your full name
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="guestEmail" className="hotel-color">
                    Email:
                  </Form.Label>
                  <Form.Control
                    id="guestEmail"
                    value={booking.guestEmail}
                    placeholder="Enter your email"
                    type="email"
                    name="guestEmail"
                    onChange={handleInputChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your email
                  </Form.Control.Feedback>
                </Form.Group>

                <fieldset style={{ border: "2px" }}>
                  <legend>Lodging period</legend>
                  <div className="row">
                    <div className="col-6">
                      <Form.Label htmlFor="checkInDate" className="hotel-color">
                        Check-in date:
                      </Form.Label>
                      <Form.Control
                        id="checkInDate"
                        value={booking.checkInDate}
                        placeholder="check-in date"
                        type="date"
                        name="checkInDate"
                        onChange={handleInputChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please select a check-in date
                      </Form.Control.Feedback>
                    </div>

                    <div className="col-6">
                      <Form.Label
                        htmlFor="checkOutDate"
                        className="hotel-color"
                      >
                        Check-out date:
                      </Form.Label>
                      <Form.Control
                        id="checkOutDate"
                        value={booking.checkOutDate}
                        placeholder="check-out date"
                        type="date"
                        name="checkOutDate"
                        onChange={handleInputChange}
                        required
                        min={moment().format("MMM Do, YYYY")}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please select a check-out date
                      </Form.Control.Feedback>
                    </div>

                    {errorMessage && (
                      <p className="error-message text-danger">
                        {errorMessage}
                      </p>
                    )}
                  </div>
                </fieldset>

                <fieldset>
                  <legend>Number of guest</legend>
                  <div className="row">
                    <div className="col-6">
                      <Form.Label htmlFor="numOfAdults" className="hotel-color">
                        Adults:
                      </Form.Label>
                      <Form.Control
                        id="numOfAdults"
                        value={booking.numOfAdults}
                        placeholder="0"
                        min={1}
                        type="number"
                        name="numOfAdults"
                        onChange={handleInputChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        please select at least 1 adult
                      </Form.Control.Feedback>
                    </div>

                    <div className="col-6">
                      <Form.Label
                        htmlFor="numOfChildren"
                        className="hotel-color"
                      >
                        Children:
                      </Form.Label>
                      <Form.Control
                        id="numOfChildren"
                        value={booking.numOfChildren}
                        placeholder="0"
                        type="number"
                        name="numOfChildren"
                        onChange={handleInputChange}
                        required
                        min={0}
                      />
                    </div>
                  </div>
                </fieldset>

                <div className="form-group mt-2 mb-2">
                  <button className="btn btn-hotel" type="submit">
                    Continue
                  </button>
                </div>
              </Form>
            </div>
          </div>
          <div className="col-md-6">
            {isSubmitted && (
              <BookingSummary
                booking={booking}
                payment={calculatePayment()}
                isFormValid={isValidated}
                onConfirm={handleFormSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
