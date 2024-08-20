import { useForm, SubmitHandler } from 'react-hook-form';
import useAuthStore from '../../../hooks/useAuthStore';
import { Box, TextField, Button, Alert, Link } from '@mui/material';

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { signInProcess, errorMessage } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: 'aranguren.alonso@gmail.com',
      password: '@Lonbeth1719',
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log({ data });

    signInProcess(data.email, data.password);
    // reset();
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Invalid email address',
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Link href="#" variant="body2" underline="hover">
          Forgot your password?
        </Link>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Login
        </Button>
        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}
      </Box>
    </>
  );
};

export default LoginForm;
