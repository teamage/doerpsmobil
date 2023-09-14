import { initializeApp } from 'firebase-admin/app';
// import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { bookingsCol } from '@/db/booking';

const firebaseConfig = {
  projectId: 'doerpsmobil-65d16',
};
const app = initializeApp(firebaseConfig, 'my-app');
// const auth = getAuth(app);
const db = getFirestore(app);

const bookings = bookingsCol(db);

(async () => {
  await bookings.add({
    from: 'fromdd',
    to: 'toddd',
    uid: 'some-uid',
    createdAt: new Date().toString(),
    isAdminBooking: true,
  });

  // const res = await bookings.get();
  // console.log(res.docs.length);

  // const user = await auth.getUserByEmail('test@test.com');
  // console.log(user);
})();
