import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import { UserAuthContextProvider } from "./context/authContext";
import ProtectedRoute from "./components/ProtectedRoute";
import {lazy,Suspense} from 'react';
import { Oval } from 'react-loader-spinner';

// language translate

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Contains the value and text for the options
const languages = [
  { value: '', text: "Options" },
  { value: 'en', text: "English" },
  { value: 'hi', text: "Hindi" },
]

const Login=lazy(()=>import('./components/Login'));
const Signup=lazy(()=>import('./components/Signup'));
const Profile=lazy(()=>import('./components/Profile'));
const Home=lazy(()=>import('./pages/Home'));
const Movie=lazy(()=>import('./pages/Movie'));
const Categories=lazy(()=>import('./pages/Categories'));
const NotFound404=lazy(()=>import('./pages/NotFound404'));
const Favourite=lazy(()=>import('./components/Favourite'));
const Favourites=lazy(()=>import('./components/Favourites'));

function App() {

    // It is a hook imported from 'react-i18next'
    const { t } = useTranslation();
 
    const [lang, setLang] = useState('en');

 // This function put query that helps to
    // change the language
    const handleChange = e => {
      setLang(e.target.value);
      let loc = "http://localhost:3000/login";
      window.location.replace(loc + "?lng=" + e.target.value);
  }

   // we are showing the value by using the 
      // keys we have created in the website    
  return (
    <>
    <div className="App">
    <h1>{t('welcome')}</h1>
      <label>{t('choose')}</label>
  <select value={lang} onChange={handleChange}>
        {languages.map(item => {
          return (<option key={item.value}
            value={item.value}>{item.text}</option>);
        })}
      </select>
    </div>
    <BrowserRouter>
        <Suspense fallback={<div className='flex justify-center items-center h-screen my-8'>
          <Oval
            height='50'
            width='50'
            color='grey'
            secondaryColor='grey'
            ariaLabel='loading' />
        </div>}>
          <UserAuthContextProvider>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={<ProtectedRoute>
                  <Home />
                </ProtectedRoute>} />
              <Route
                exact
                path="/favourites"
                element={<ProtectedRoute>
                  <Favourites />
                </ProtectedRoute>} />
              <Route
                exact
                path="/profile"
                element={<ProtectedRoute>
                  <Profile />
                </ProtectedRoute>} />
              <Route
                exact
                path="/login"
                element={<>
                  <Login />
                </>} />
              <Route
                exact
                path="/signup"
                element={<>
                  <Signup />
                </>} />
              <Route
                exact
                path="/movie/:title/:movieId"
                element={<ProtectedRoute>
                  <Movie />
                </ProtectedRoute>} />
              <Route
                exact
                path="/category/:content/:title/:id"
                element={<ProtectedRoute>
                  <Categories />
                </ProtectedRoute>} />
              <Route
                exact
                path="/favourite"
                element={<ProtectedRoute>
                  <Favourite />
                </ProtectedRoute>} />
              <Route
                path="*"
                element={<NotFound404 />} />
            </Routes>
            <Footer />
          </UserAuthContextProvider>
        </Suspense>
      </BrowserRouter></>
  );
}

export default App;
