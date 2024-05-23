import Button from '@mui/joy/Button';
import { CircularProgress, FormLabel, Input } from '@mui/joy';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';
import { forgetPassowrd, sentVerifyOtp } from '../services/apiUser.js';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handlesSubmitEmail = async e => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await forgetPassowrd({ email });
      toast.success('Email sent successfully');
      setIsSent(true);
    } catch (error) {
      console.log(error?.response?.data?.errors);
      setErrors(error?.response?.data?.errors);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmitOtp = async e => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = await sentVerifyOtp({ email, otp });
      console.log(data);
      toast.success(
        'New password sent to your email. Please check your email and reset your password'
      );
      navigate('/login');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-sky-500 to-indigo-500 flex justify-center items-center w-full h-full">
      <div className="bg-white w-[70%] h-[80%] flex rounded-lg text-slate-700">
        <div className="flex-1 rounded-lg my-auto">
          <p className="px-8 text-sky-500 text-xl text-center mb-4">
            Reset Password
          </p>
          {!isSent ? (
            <ResetPasswordForm
              email={email}
              setEmail={setEmail}
              handleSubmitEmail={handlesSubmitEmail}
              isLoading={isLoading}
              errors={errors}
            />
          ) : (
            <OtpForm
              otp={otp}
              setOtp={setOtp}
              isLoading={isLoading}
              handleSubmitOtp={handleSubmitOtp}
              errors={errors}
            />
          )}
        </div>
        <div className="flex-1 rounded-r-lg">
          <img
            src="/images/logo_edu_v2.jpg"
            alt="ResetPassword"
            className="object-cover w-full h-full rounded-r-lg"
          />
        </div>
      </div>
    </div>
  );
}
const ResetPasswordForm = ({
  email,
  setEmail,
  handleSubmitEmail,
  isLoading,
  errors,
}) => {
  return (
    <form className="px-8 flex flex-col gap-4" onSubmit={handleSubmitEmail}>
      <div className="flex flex-col gap-2">
        <FormLabel htmlFor="email" sx={{ color: 'rgb(24, 165, 236)' }}>
          Email address
        </FormLabel>
        <Input
          color="neutral"
          type="email"
          id="email"
          placeholder="Enter your email here..."
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {errors?.email && <p className="text-red-400">{errors?.email[0]}</p>}
      </div>
      <div className="flex justify-between items-center">
        {isLoading ? (
          <Button sx={{ justifySelf: 'center' }}>
            <CircularProgress />
          </Button>
        ) : (
          <>
            <Link
              to={'/login'}
              className="flex gap-2 items-center bg-lime-500 px-2 py-1 rounded-md text-white hover:bg-lime-500 max-h-[42px] text-sm font-medium"
            >
              <ArrowBackIcon />
              <span>Back to login</span>
            </Link>
            <Button
              className="self-end"
              variant="solid"
              sx={{
                color: 'white',
                background: '#068ede',
                ':hover': { background: '#007bff' },
              }}
              type="submit"
              onClick={handleSubmitEmail}
            >
              Vefiry Email
            </Button>
          </>
        )}
      </div>
    </form>
  );
};
const OtpForm = ({ otp, setOtp, handleSubmitOtp, errors, isLoading }) => {
  const [timer, setTimer] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <form className="px-8 flex flex-col gap-4" onSubmit={handleSubmitOtp}>
      <div className="flex flex-col gap-2">
        <FormLabel htmlFor="otp" sx={{ color: 'rgb(24, 165, 236)' }}>
          Opt
        </FormLabel>
        <Input
          color="neutral"
          type="text"
          id="otp"
          placeholder="Enter your otp here..."
          value={otp}
          onChange={e => setOtp(e.target.value)}
        />
        {errors?.otp && <p className="text-red-400">{errors?.otp[0]}</p>}
        <button disabled={true}>{`${Math.floor(timer / 60)
          .toString()
          .padStart(2, '0')}:${(timer % 60)
          .toString()
          .padStart(2, '0')}`}</button>
      </div>
      {isLoading && (
        <Button sx={{ justifySelf: 'center' }}>
          <CircularProgress />
        </Button>
      )}
      <div className="flex justify-between items-center">
        <Link
          to={'/login'}
          className="flex gap-2 items-center bg-lime-500 px-2 py-1 rounded-md text-white hover:bg-lime-500 max-h-[42px] text-sm font-medium"
        >
          <ArrowBackIcon />
          <span>Back to login</span>
        </Link>
        <Button
          className="self-end"
          variant="solid"
          onClick={handleSubmitOtp}
          sx={{
            color: 'white',
            background: '#068ede',
            ':hover': { background: '#007bff' },
          }}
          type="submit"
        >
          Verify Otp
        </Button>
      </div>
    </form>
  );
};

export default ResetPassword;
