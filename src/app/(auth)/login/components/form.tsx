"use client";
import { InputField } from "hexis/components/common/input-field";
import { useForm } from "react-hook-form";
import { Button } from "hexis/components/common/button";
import validators from "hexis/utils/validators";
import Link from "next/link";
import { useAppDispatch } from "hexis/hooks/useRedux";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSupabase } from "hexis/providers/supabase-provider";
import { AuthError } from "@supabase/supabase-js";

interface ILoginDetails {
  email: string;
  password: string;
}

const formField = {
  email: "email",
  password: "password",
};

export function LoginForm() {
  useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { supabase } = useSupabase();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ILoginDetails>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleOnSubmit = async ({ email, password }: { email: string; password: string }) => {
    setLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        user: null,
        error: error.message,
      };
    }

    if (data?.user) {
      router.push("/");
      setLoading(false);
    }

    if (error) {
      setError(formField.password as "password", {
        message: (error as AuthError)?.message,
        type: "custom",
      });
      setLoading(false);
    }

    return;
  };

  return (
    <div className="flex flex-col md:h-full items-center justify-center p-4 md:px-0 ">
      <p className="text-white font-bold mb-3 text-3xl md:text-4xl">Log In</p>
      <p className="text-white text-sm md:text-lg mb-4 font-semibold text-center">Sign in and start managing your clients!</p>

      <form className="md:w-full lg:w-1/2 mx-auto" onSubmit={handleSubmit(handleOnSubmit)}>
        <InputField
          id={formField.email}
          name={formField.email}
          control={control}
          type="email"
          errors={errors.email?.message}
          placeholder="Email"
          className="mt-4 mb-3 w-full p-3 rounded-lg bg-background-300 outline-0 text-white"
          rules={validators.email({
            required: true,
            requiredMsg: "Please provide your email",
            invalidMsg: "Please provide a valid email",
          })}
        />

        <InputField
          id={formField.password}
          name={formField.password}
          control={control}
          type="password"
          errors={errors.password?.message}
          placeholder="Password"
          className="mb-3 w-full p-3 rounded-lg bg-background-300 outline-0 text-white"
          rules={validators.password({
            requiredMsg: "Please provide password",
            minMsg: "Password should be more than 6 characters",
          })}
        />

        <Button text="Login" className="w-full" loading={loading} />

        <div className="flex my-3 justify-between	w-full">
          <Link
            className="text-white underline cursor-pointer md:text-sm text-xs"
            rel="noopener noreferrer"
            target="_blank"
            href={`${process.env.NEXT_PUBLIC_HEXIS_WEB_URL || "https://dev-hexis-web-app.onrender.com"}/account/onboarding?customer=coach`}
          >
            Create account
          </Link>
          <Link className="text-white underline cursor-pointer md:text-sm text-xs" href="/reset-password">
            Forgot password?
          </Link>
        </div>
      </form>

      <div className="absolute right-8 bottom-6 mx-auto py-2 py-0 flex justify-evenly">
        <Link
          rel="noopener noreferrer"
          target="_blank"
          className="text-white underline cursor-pointer me-6 md:text-sm text-xs"
          href="https://www.hexis.live/support"
        >
          FAQ
        </Link>
        <Link
          rel="noopener noreferrer"
          target="_blank"
          className="text-white underline cursor-pointer me-6 md:text-sm text-xs"
          href="https://www.hexis.live/privacy-policy"
        >
          Privacy Policy
        </Link>
        <Link
          rel="noopener noreferrer"
          target="_blank"
          className="text-white underline cursor-pointer md:text-sm text-xs"
          href="https://www.hexis.live/terms-conditions"
        >
          T&C
        </Link>
      </div>
    </div>
  );
}
