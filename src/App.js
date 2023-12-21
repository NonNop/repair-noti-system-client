import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./layouts/Layout";
import ErrorPage from "./layouts/ErrorPage";
import ManageUsers from "./pages/manage-users/ManageUsers";
import UpdateUser from "./pages/manage-users/UpdateUser";
import Register from "./pages/manage-users/Register";
import RepairNotice from "./pages/repair-notice/RepairNotice";
import ViewRepairs from "./pages/repair-notice/ViewRepairs";
import UpdateRepairNotice from "./pages/repair-notice/UpdateRepairNotice";
import { currentUser } from "./service/userauth";
import { useDispatch } from "react-redux";
import { userLogin } from "./store/userSlice";
import MhRepairNotice from "./pages/mechanice/MhRepairNotice";
import MhUpdateRepairNotice from "./pages/mechanice/MhUpdateRepairNotice";
import PcUpdateRepairNotice from "./pages/parcel/PcUpdateRepairNotice";
import PcRepairNotice from "./pages/parcel/PcRepairNotice";
import AdminCheck from "./routes/AdminCheck";
import UserCheck from "./routes/UserCheck";
import MechaniceCheck from "./routes/Mechanice";
import ParcelCheck from "./routes/ParcelCheck";
import PcRepairApprove from "./pages/parcel/PcRepairApprove";
import ParMecCheck from "./routes/ParMecCheck";
import PcListRepair from "./pages/parcel/PcListRepair";

function App() {
  const dispatch = useDispatch();

  const token = JSON.parse(sessionStorage.getItem("token"));
  currentUser(token)
    .then((res) => {
      dispatch(
        userLogin({
          id: res.data.payload.id,
          name: res.data.payload.name,
          role: res.data.payload.role,
          position: res.data.payload.position,
          token: token,
        })
      );
    })
    .catch((err) => console.log(err));

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Login />} />
        <Route element={<Layout />}>
          {/* แอดมิน */}
          <Route
            path='/manage-users'
            element={
              <AdminCheck>
                <ManageUsers />
              </AdminCheck>
            }
          />
          <Route
            path='/register-user'
            element={
              <AdminCheck>
                <Register />
              </AdminCheck>
            }
          />
          <Route
            path='/update-user/:id'
            element={
              <AdminCheck>
                <UpdateUser />
              </AdminCheck>
            }
          />
          {/* พัสดุ */}
          <Route
            path='/list-repair-parcel'
            element={
              <ParcelCheck>
                <PcListRepair />
              </ParcelCheck>
            }
          />
          <Route
            path='/view-repair-parcel'
            element={
              <ParcelCheck>
                <PcRepairNotice />
              </ParcelCheck>
            }
          />
          <Route
            path='/parcel-update-repair/:id'
            element={
              <ParcelCheck>
                <PcUpdateRepairNotice />
              </ParcelCheck>
            }
          />
          <Route
            path='/view-repair-approve'
            element={
              <ParMecCheck>
                <PcRepairApprove />
              </ParMecCheck>
            }
          />
          {/* ช่างเทคนิค */}
          <Route
            path='/view-repair-mechanice'
            element={
              <MechaniceCheck>
                <MhRepairNotice />
              </MechaniceCheck>
            }
          />

          <Route
            path='/mechanice-update-repair/:id'
            element={
              <MechaniceCheck>
                <MhUpdateRepairNotice />
              </MechaniceCheck>
            }
          />
          {/* ใบแจ้งซ่อม */}
          <Route
            path='/view-repair-notice'
            element={
              <UserCheck>
                <ViewRepairs />
              </UserCheck>
            }
          />
          <Route
            path='/repair-notice'
            element={
              <UserCheck>
                <RepairNotice />
              </UserCheck>
            }
          />
          <Route
            path='/update-repair-notice/:id'
            element={
              <UserCheck>
                <UpdateRepairNotice />
              </UserCheck>
            }
          />
        </Route>

        <Route path='*' element={<ErrorPage />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
