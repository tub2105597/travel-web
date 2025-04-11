import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import { default as SignIn } from './auth/signin/signin';
import { default as SignUp } from './auth/signup/signup';
import { default as Destinations } from './destinations/destinations';
import { default as DetailDestination } from './destinations/detailDestination';
import { default as HomePage } from './home/home';
import { default as Profile } from './profile/profile';
import { default as SearchPage } from './search/searchPage';
import { default as Header } from './header/header';
import { default as Footer } from './footer/footer';
import {
  UserManagement,
  DestinationManagement,
  PostManagement,
  ImageManagement,
  FavouriteManagement,
  DistrictManagement,
  System
} from '../containers/system/index';
import { default as ChangePassword } from './auth/changePassword/changePassword';

function App(props) {
  return (
    <BrowserRouter>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          theme="colored"
        />
        <Header />
        <Routes>
          <Route path='/system/favourites' element={<FavouriteManagement />} />
          <Route path='/system/districts' element={<DistrictManagement />} />
          <Route path='/system/users' element={<UserManagement />} />
          <Route path='/system/destinations' element={<DestinationManagement />} />
          <Route path='/system/posts' element={<PostManagement />} />
          <Route path='/system/images' element={<ImageManagement />} />
          <Route path='/system' element={<System />} />

          <Route path='/password' element={<ChangePassword />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/destination/:id' element={<DetailDestination />} />
          <Route path='/destination' element={<Destinations />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/:username' element={<Profile />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
        {props.role !== 'admin' ? <Footer /> : null}
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => ({
  role: state.user.user.role,
});

export default connect(mapStateToProps)(App);
