import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { SIGNUP_URL } from '../../infra/urls';
import { useNavigate } from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const SignupPage = () => {

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
  const data = new FormData(event.currentTarget);
  const userData = {
    email: data.get('email'),
    password: data.get('password'),
    first_name: data.get('firstName'),
    phone_number: data.get('phone_number'),
    is_restaurant: data.get('is_restaurant')


    // user: {
    //   email: data.get('email'),
    //   password: data.get('password'),
    //   first_name: data.get('firstName'),
    // },
    // city: data.get('city'),
    // address: {
    //   phone_number: data.get('phone_number'),
    //   street: data.get('street'),
    //   house_number: parseInt(data.get('house-number'))
    // }
  };

  console.log('userData', userData);

  try {
    const response = await axios.post(SIGNUP_URL, userData);
    console.log("response", response)
    navigate('/login')
  } catch (error) {
    console.log('Error', error);
  }
};
    

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 14,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          
        >
        <Typography
        variant="h2"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: '#191D88',
          textDecoration: 'none',
        }}
      >
        שליאח
      </Typography>
          <Typography component="h1" variant="h5" sx={{color: 'grey'}}>
            הרשמה
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="שם השליח/המסעדה"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="is_restaurant"
                  label="מסעדה/שליח"
                  name="is_restaurant"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="אי-מייל"
                  name="email"
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="phone_number"
                  label="טלפון"
                  name="phone_number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="סיסמא"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                  sx={{color: 'grey'}}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}

export default SignupPage