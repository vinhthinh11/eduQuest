import Button from '@mui/joy/Button';
import { Checkbox, FormLabel, Input } from '@mui/joy';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getUser } from '../services/apiUser.js';

function Login() {
  const { register, formState, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const { errors } = formState;
  const navigate = useNavigate();
  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true);
      const { data } = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password,
      });
      localStorage.setItem('token', data.access_token);
      toast.success('Đăng nhập thành công');
      // Chuyển trang tai đây
      const { data: user } = await getUser('/me');
      let endPoint;
      switch (user.permission) {
        case 1:
          endPoint = '/admin';
          break;
        case 2:
          endPoint = '/teacher';
          break;
        case 3:
          endPoint = '/student';
          break;
        case 4:
          endPoint = '/subject-head';
          break;
        default:
          toast.error('Không xác định quyền truy cập');
          break;
      }
      setTimeout(() => {
        navigate(endPoint);
      }, 700);
    } catch (error) {
      console.log(error);
      toast.error();
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-base flex justify-center items-center w-full h-full">
      <div className="bg-white w-[70%] h-[80%] flex rounded-lg  ">
        <div className="flex-1 rounded-lg mt-8">
          <form
            className="px-8 flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2">
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                color="neutral"
                defaultValue={'111@mail.com'}
                type="email"
                id="email"
                {...register('email', { required: 'This field is required' })}
              />
              {errors?.email?.message && (
                <p className="text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <FormLabel htmlFor="password" error={errors?.password?.message}>
                Password
              </FormLabel>
              <Input
                color="neutral"
                type="password"
                id="password"
                defaultValue={111}
                {...register('password', {
                  required: 'This field is required',
                })}
              />
              {errors?.password?.message && (
                <p className="text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="flex justify-between">
              <Checkbox
                name="remember"
                label="Remember me"
                variant="outlined"
              />
              <Link className="text-base" to="/reset-password">
                Forgot password
              </Link>
            </div>

            {loading ? (
              <Button>
                <CircularProgress color="inherit" size={30} />
              </Button>
            ) : (
              <Button
                variant="solid"
                color="primary"
                type="submit"
                onClick={function () {}}
              >
                Sign in
              </Button>
            )}
          </form>
        </div>
        <div className="flex-1 rounded-lg">
          <img
            src="/images/image_login.jpg"
            alt="login"
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
