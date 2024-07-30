import { useEffect } from 'react'
import './App.css'
import {Routes,Route,BrowserRouter} from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {
  Addresses,
    Categories,
    CategoryProducts,
    Chat,
    CheckoutPage,
    Home,
    Orders,
    PaymentPage,
    Products,
    SellerLogin,
    SellerRegistration,
    OrderSuccess,
    UserLogin,
    UserRegisteration,
    UserProfile,
    ActivationPage,
    UserOTP,
    FAQPage,
    ProductDetailsPage,
    ShopActivation,
    BestSelling,
    ShopDashboard,
    AllOrdersPage,
    AllProductsPage,
    CreateEventsPage,
    CreateProductPage,
    OrderDetailsPage,
    AllEventsPage,
    AllCoupounsPage,
    ShopSettingsPage,
    ForgotPassword,
    ResetPassword,
    ShopInbox,
    UserInbox
} from './pages';
import {loadUser,loadSeller} from "./store/actions/user"
import { useDispatch } from 'react-redux';
import { getAllProducts } from './store/actions/product';
import Dashboard from './components/Admin/Dashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import SellerNotifications from './components/Seller/Notifications';
function App() {
  const dispatch=useDispatch()
  useEffect(()=>{
   dispatch(loadUser())
   dispatch(loadSeller())
   dispatch(getAllProducts())
  },[])
  return (
      <BrowserRouter>

     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/faq' element={<FAQPage/>}/>
      <Route path='/user/register' element={<UserRegisteration/>}/>
      <Route path='/user/login' element={<UserLogin/>}/>
      <Route path='/activation/:activation_token' element={<ActivationPage/>}/>
      <Route path='/user/addresses' element={<Addresses/>}/>
      <Route path='/user/profile' element={<UserProfile/>}/>
      <Route path='/user/orders' element={<Orders/>}/>
      <Route path='/order/success' element={<OrderSuccess/>}/>
      <Route path='/payment' element={<PaymentPage/>}/>
      <Route path='/checkout' element={<CheckoutPage/>}/>
      <Route path='/product/details/:id' element={<ProductDetailsPage/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/best-selling' element={<BestSelling/>}/>
      <Route path='/seller/login' element={<SellerLogin/>}/>
      <Route path='/seller/register' element={<SellerRegistration/>}/>
      <Route path='/product/categories' element={<Categories/>}/>
      <Route path='/product/category/:id' element={<CategoryProducts/>}/>
      <Route path='/user/chat' element={<Chat/>}/>
      <Route path='/user/:email/otp' element={<UserOTP/>}/>
      <Route path='/seller/activation/:activation_token' element={<ShopActivation/>}/>
      <Route path='/dashboard' element={<ShopDashboard/>}/>
      <Route path='/dashboard/orders' element={<AllOrdersPage/>}/>
      <Route path='/dashboard/products' element={<AllProductsPage/>}/>
      <Route path='/dashboard/create-product' element={<CreateProductPage/>}/>
      <Route path='/dashboard/create-event' element={<CreateEventsPage/>}/>
      <Route path='/dashboard/coupons' element={<AllCoupounsPage/>}/>
      <Route path='/dashboard/settings' element={<ShopSettingsPage/>}/>
      <Route path='/dashboard/events' element={<AllEventsPage/>}/>
      <Route path='/dashboard/messages' element={<ShopInbox/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/user/reset-password/:email' element={<ResetPassword/>} />
      <Route path='/inbox' element={<UserInbox/>}/>
      <Route path='/admin' element={<AdminDashboard/>}/>
      <Route path='/dashboard/notifications' element={<SellerNotifications/>}/>
      <Route path='/admin/products' element={<h1>Admin Products</h1>}/>
      <Route path='/admin/orders' element={<h1>Admin orders</h1>}/>
      <Route path='/admin/users' element={<h1>Admin users</h1>}/>
      
     </Routes>
     <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
    

  )
}

export default App
