"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import validators from "hexis/utils/validators";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "hexis/components/common/button";
import { InputField } from "hexis/components/common/input-field";
import { lexend_deca, montserrat } from "hexis/app/fonts";

interface IResetPasswordDetails {
  email: string;
}

const formField = {
  email: "email",
};

export default function ResetPasswordForm() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPasswordDetails>({
    defaultValues: {
      email: "",
    },
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const onRequestPassword = () => {
    setIsSubmitted(!isSubmitted);
  };

  const onBackToLogin = () => {
    router.push("/login");
  };

  const EmailSentSuccess = () => {
    return (
      <>
        <p className="text-center font-medium  text-3xl md:text-3xl">Password link sent</p>
        <p className={`text-center font-normal text-sm md:text-sm px-8 ${lexend_deca.className}`}>
          Check your emails for your password reset link
        </p>

        <Button onClick={onBackToLogin} text="Back to login" className="w-3/4 md:w-1/2 font-normal text-sm" />

        <div className={`absolute right-8 bottom-6 mx-auto py-2 py-0 flex justify-evenly text-xs ${montserrat.className}`}>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            className="text-white underline cursor-pointer me-6"
            href="https://www.hexis.live/support"
          >
            FAQ
          </Link>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            className="text-white underline cursor-pointer me-6"
            href="https://www.hexis.live/privacy-policy"
          >
            Privacy Policy
          </Link>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            className="text-white underline cursor-pointer"
            href="https://www.hexis.live/terms-conditions"
          >
            T&C
          </Link>
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 md:p-0 ">
      {isSubmitted ? (
        <EmailSentSuccess />
      ) : (
        <>
          <p className="text-center font-medium  text-3xl px-4">Reset your password</p>
          <p className={`text-center font-normal text-sm md:text-sm px-8 ${lexend_deca.className}`}>
            Enter your email below to receive a password reset link.
          </p>
          <form className="md:w-full lg:w-full mx-auto px-8 md:px-6" onSubmit={handleSubmit(onRequestPassword)}>
            <InputField
              id={formField.email}
              name={formField.email}
              control={control}
              type="email"
              errors={errors.email?.message}
              placeholder="Email"
              className="mt-4 mb-6 w-full p-3 rounded-lg bg-background-300 outline-0 text-white"
              rules={validators.email({
                required: true,
                requiredMsg: "The email you entered is not recognised",
                invalidMsg: "Please provide a valid email",
              })}
            />

            <Button text="Reset Password" className="w-full font-normal text-sm" />
            <div>
              <Link href="/login">
                <p className={`text-white underline cursor-pointer mt-6 text-xs ${montserrat.className}`}>Back to login</p>
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
        </>
      )}
    </div>
  );
}
