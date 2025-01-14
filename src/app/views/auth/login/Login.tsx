"use client";
import Logo from "@/app/scaffold/navigation/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Images from "@/utils/images";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import notificatonService from "@/services/notificaton.service";

interface LoginValues {
  email: string;
  password: string;
}

export default function LoginAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Provide a valid email")
      .required("Required")
      .min(3, "Email must be longer than 3"),
    password: yup
      .string()
      .required("Required")
      .min(3, "Password must be longer than 3"),
  });

  const initialValues: LoginValues = {
    email: "",
    password: "",
  };

  const {
    values,
    errors,
    touched,
    isValid,
    handleBlur,
    handleChange,
    validateForm,
  } = useFormik({
    initialValues,
    onSubmit: () => {},
    validationSchema: loginSchema,
  });

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/",
      });

      console.log(response);

      if (response?.ok) {
        notificatonService.success("Login Successful");
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
        router.push("/");
      } else {
        notificatonService.error(response?.error || "Incorrect credentials");
      }
    } catch (error) {
      notificatonService.error("An error occurred, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm rounded-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center">
            <Logo />
          </div>
          <CardTitle className="text-xl font-bold">Welcome Back</CardTitle>
          <p className="text-sm text-gray-500">Login in less than a minute</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#344054]">
              Work Email*
            </Label>
            <Input
              className="border-kindsGrey"
              id="email"
              placeholder="Enter your email"
              required
              type="email"
              onChange={handleChange}
              value={values.email}
              onBlur={handleBlur}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#344054]">
              Password*
            </Label>
            <Input
              className="border-kindsGrey"
              id="password"
              placeholder="Create a password"
              required
              type="password"
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
            />
            {/* <p className="text-xs text-gray-500">
              Must be at least 8 characters
            </p> */}
          </div>
          <Button
            variant={"outline"}
            size={"lg"}
            className="w-full "
            onClick={(e: any) => {
              // e.preventDefault();
              handleSubmit();
            }}
            disabled={!isValid || isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            size={"lg"}
            variant="outline"
            className="w-full border-kindsGrey"
          >
            <Image
              src={Images.socialIcons.google}
              alt=""
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </Button>
          {/* <Button
            size={"lg"}
            variant="outline"
            className="w-full border-kindsGrey"
          >
            <Image
              src={Images.socialIcons.microsoft}
              alt=""
              className="w-5 h-5 mr-2"
            />
            Sign up with Microsoft
          </Button> */}
          <p className="text-xs text-center text-gray-500">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
