import { db } from '@/firebase';

export type Booking = {
  uid: string;
  from: string;
  to: string;
  isAdminBooking: boolean;
  createdAt: string;
};

const bookingConverter = {
  toFirestore(booking: Booking): FirebaseFirestore.DocumentData {
    return booking;
  },
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): Booking {
    return snapshot.data() as Booking;
  },
};

export const bookings = db
  .collection('bookings')
  .withConverter(bookingConverter);

export const bookingsCol = (myDb: FirebaseFirestore.Firestore) =>
  myDb.collection('bookings').withConverter(bookingConverter);
