import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/login', data);
      if (response.status === 200) {
        localStorage.setItem('userId', response.data.userId); // Store user ID in local storage
        localStorage.setItem('token', response.data.token); // Store token in local storage
        setSuccess('Login completed successfully');
        setError('');
        navigate('/home'); // Redirect to home page
      } else {
        setError(response.data.message || 'Login failed');
        setSuccess('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed due to some internal error');
      setSuccess('');
    }
  };

  return (
    <div id="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Login Page</h2>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            {...register('email')}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register('password')}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit">Submit</button>
        <p>New to the page? <Link to="/signup">Sign Up</Link></p> 
        <p><Link to='/home'>Back to play</Link></p>
      </form>
    </div>
  );
};

export default Login;
