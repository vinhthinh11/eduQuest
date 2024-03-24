import Button from '@mui/joy/Button';
import { Checkbox, FormLabel, Input } from '@mui/joy';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const onSubmit = async ({ email, password }) => {
    const { data } = await axios.get(
      'https://65f53032f54db27bc022bcf0.mockapi.io/api/user'
    );
    const user = data.find(u => {
      return u.name === email && u.password === password;
    });
    if (!user) return toast.error('Khong co usre nao trong he thong');
    toast.success('Chuc mung ban da dang nhap thanh cong');
    navigate('/');
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
                defaultValue={'vinhthinh@gmail.com'}
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
                defaultValue={123}
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

            <Button
              variant="solid"
              color="primary"
              type="submit"
              onClick={function () {}}
            >
              Sign in
            </Button>
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
