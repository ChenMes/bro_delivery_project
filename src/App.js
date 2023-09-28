import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/header/header';
import React, { useContext, useEffect } from 'react';
import UserProvider, { SetUserContext } from './components/context/userContext';
import { ME_URL } from './infra/urls';
import axios from 'axios';
import { Stack } from '@mui/material';

function App() {
  const setUser = useContext(SetUserContext)

  useEffect(() => {
    const fetchData = async () => {
      const meResponse = await axios.get(ME_URL)
      setUser({
        user: { ...meResponse.data }
      })
    }
    fetchData()
  }, [])

  return (
    <>
    <Stack alignItems={"center"} paddingLeft={"5em"} paddingRight={"5em"} paddingBottom={"10em"} paddingTop={"2em"}>
    <Header/>
    <Outlet />
    </Stack>
  </> 
  );
}

export default App;
