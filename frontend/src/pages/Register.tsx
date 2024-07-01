import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      console.log("register successful!");
    },
    onError: (error: Error) => {
      console.log(error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Utwórz konto</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Imię
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "Pole jest wymagane" })}
          ></input>
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Nazwisko
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "Pole jest wymagane" })}
          ></input>
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Adres e-mail
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "Pole jest wymagane" })}
        ></input>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Hasło
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "Pole jest wymagane",
            minLength: {
              value: 6,
              message: "Hasło musi się składac z co najmniej 6 znaków",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Powtórz hasło
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "Pole jest wymagane";
              } else if (watch("password") !== val) {
                return "Hasła nie sa takie same";
              }
            },
          })}
        ></input>
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
        >
          Stwórz konto
        </button>
      </span>
    </form>
  );
};

export default Register;
