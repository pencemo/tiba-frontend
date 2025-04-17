import { Routes, Route, HashRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Login from "./components/Auth/Login";
import Page from "./app/Admin/Page/page";
import Dashboard from "./app/Admin/dashboard/Dashboard";
import Protect from "./Utils/Protected";
import {AllUsers} from "./app/Admin/userlist/AllUsers";
import Carlist from "./app/Admin/Cars/Carlist";
import AddCars from "./app/Admin/Cars/AddCars";
import AllAdmins from "./app/Admin/admins/AllAdmins";
import SignUpForm from "./components/Auth/SignUp";
import UserDashbord from "./app/User/UserDashbord";
import CarListPage from "./app/CarList/CarlistPage";
import { Payment } from "./app/Admin/Payment/payment";
import ProductPage from "./app/CarBooking/Booking";
import {AllBooking} from "./app/Admin/BookingList/all-booking";
import UserBookings from "./app/User/UserBookings";
import UserHome from "./app/User/user-home";
import AllNotifications from "./app/Admin/notifications/AllNotifications";
import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";
import {Enquires} from "./app/Admin/enquire/Enquires";
import UserNotification from "./app/User/userNotifications";
import Forgot from "./app/login/Forgot";
import AdminSettings from "./app/Admin/Settings/Settings";
import TermsPage from "./Pages/TermsPage";
import FilterContext from "./Context/filterContext";
import PrivacyPage from "./Pages/PrivacyPage";
import { EditCar } from "./app/Admin/Cars/EditCar";
import DeliveryTerms from "./Pages/DeliveryPage";
import { ScrollToTop } from "./lib/scrollTop";

function App() {
  
  return (
      <HashRouter>
        <ScrollToTop/>
        <Routes>
          {/* pages  */}
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cars" element={<FilterContext><CarListPage /></FilterContext>} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/delivery" element={<DeliveryTerms />} />

          {/* auth  */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/forgot" element={<Forgot />} />

          {/* admin  */}
          <Route path="/admin" element={<Protect requiredRole={['admin', 'subadmin']}><Page /></Protect>} >
            <Route index element={<Dashboard />} />
            <Route path="users" element={<AllUsers />} />
            <Route path="payment" element={<Payment />} />
            <Route path="notification" element={<AllNotifications />} />
            <Route path="enquires" element={<Enquires />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="manage-admin" element={<Protect requiredRole={['admin']}><AllAdmins /></Protect>} />
            <Route path="booking" element={<AllBooking />} />
            <Route path="manage-cars" >
              <Route index element={<Carlist />} />
              <Route path="add-car" element={<Protect requiredRole={['subadmin']}><AddCars /></Protect>} />
              <Route path="edit/:id" element={<Protect requiredRole={['subadmin']}><EditCar /></Protect>} />
            </Route>
          </Route>

          {/* user  */}
          <Route path="/booking/:id" element={<Protect requiredRole={['admin', 'subadmin', 'user']}><ProductPage /></Protect>} />
          <Route path="/user" element={<Protect requiredRole={['user',]}><UserDashbord/></Protect>}>
            <Route index element={<UserHome />} />
            <Route path='booking' element={<UserBookings />} />
            <Route path='notification' element={<UserNotification />} />
            <Route path='settings' element={<AdminSettings />} />
          </Route>
          

        </Routes>
      </HashRouter>
  );
}

export default App;
