import { Routes, Route, Navigate } from "react-router-dom";
import BookingPage from "./pages/public/BookingPage.jsx";
import SuccessPage from "./pages/public/SuccessPage.jsx";
import TrackPage from "./pages/public/TrackPage.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Appointments from "./pages/admin/Appointments.jsx";
import Patients from "./pages/admin/Patients.jsx";
import Doctors from "./pages/admin/Doctors.jsx";
import Questionnaires from "./pages/admin/Questionnaires.jsx";
import StaffPage from "./pages/admin/Staff.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="/book" element={<BookingPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/track" element={<TrackPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="patients" element={<Patients />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="questionnaires" element={<Questionnaires />} />
        <Route path="staff" element={<StaffPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
