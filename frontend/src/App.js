import { CssBaseline, ThemeProvider } from '@mui/material';
import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { darkTheme } from './Themes/DarkTheme';
import { Home } from './Components/HomePage/Home';
import { RestaurantDetails } from './Components/Restaurant/RestaurantDetails';
import { Cart } from './Components/Cart/Cart';
import { Profile } from './Components/Profile/Profile';
import { CustomerRouter } from './Routers/CustomerRouter';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './Components/State/Authentication/Action';
import { store } from './Components/State/Store';
import { findCart } from './Components/State/Cart/Action';
import { Routers } from './Routers/Routers';
import { get_restaurants_by_user_id } from './Components/State/Restaurant/Action';

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token')
  const auth = useSelector(store=>store.auth);
  useEffect(() => {
    dispatch(getUser(token || auth.token));
    dispatch(findCart(token || auth.token));
  },[auth.token])
  useEffect(() => {
    dispatch(get_restaurants_by_user_id(token || auth.token));
  },[auth.token])
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Routers/>
    </ThemeProvider>
  );
}

export default App;
