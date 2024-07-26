import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    number: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must contain 10 digits')
      .required('Phone number is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one digit')
      .matches(/^\S*$/, 'Password must not contain spaces')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/signup', data);
      if (response.status === 201) {
        localStorage.setItem('userId', response.data.userId); 
        setSuccess('Signed up successfully');
        setError('');
        // Redirect to /question 
        navigate('/questions');
      } else {
        setError(response.data.message || 'Sign up failed, please try again');
        setSuccess('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Due to some internal error, sign up failed');
      setSuccess('');
    }
  };

  return (
    <div id="signup">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Signup Page</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            {...register('name')}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>
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
          <label htmlFor="number">Phone Number:</label>
          <input
            type="tel"
            id="number"
            {...register('number')}
          />
          {errors.number && <p className="error">{errors.number.message}</p>}
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit">Submit</button>
        <p>Already have an account? <Link to="/login">Login here</Link></p>
        <p><Link to='/home'>Back to play</Link></p>
      </form>
    </div>
  );
};

export default SignUpPage;
