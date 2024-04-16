import Button from '@mui/joy/Button';
import { FormLabel, Input } from '@mui/joy';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function ResetPassword() {
  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;
  const onSubmit = async ({ email }) => {
    // TODO: not implemented yet
    toast.success('Success. Please check your email to continue');
  };
  return (
    <div className="bg-gradient-to-b from-sky-500 to-indigo-500 flex justify-center items-center w-full h-full">
      <div className="bg-white w-[70%] h-[80%] flex rounded-lg text-slate-700">
        <div className="flex-1 rounded-lg my-auto">
          <p className="px-8 text-sky-500 text-xl text-center mb-4">
            Reset Password
          </p>
          <form
            className="px-8 flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2">
              <FormLabel htmlFor="email" sx={{ color: 'rgb(24, 165, 236)' }}>
                Email adress
              </FormLabel>
              <Input
                color="neutral"
                type="email"
                id="email"
                placeholder="Enter your email here..."
                {...register('email', { required: 'This field is required' })}
              />
              {errors?.email?.message && (
                <p className="text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
            <Button
              className="self-end"
              variant="solid"
              sx={{
                color: 'white',
                background: '#068ede',
                ':hover': { background: '#007bff' },
              }}
              type="submit"
              onClick={function () {}}
            >
              Reset password
            </Button>
          </form>
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

export default ResetPassword;
