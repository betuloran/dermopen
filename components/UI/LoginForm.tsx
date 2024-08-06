"use client";

import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
    const [loginError, setLoginError] = useState<boolean>(false);
    const authContext = useContext(AuthContext);
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            password: "",
            email: "",
        },
        validationSchema: Yup.object({
            password: Yup.string().required("Bu alanı doldurmak zorunludur."),
            email: Yup.string()
                .email("Geçersiz mail adresi.")
                .required("Bu alanı doldurmak zorunludur."),
        }),
        onSubmit: () => {
            (async function () {
                const res = await fetch("/api/girisYap", {
                    method: "POST",
                    body: JSON.stringify(formik.values),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json();

                if (res.status === 200) {
                    authContext?.setUser(data.user);
                    localStorage.setItem(
                        "userInfo",
                        JSON.stringify(formik.values)
                    );
                    router.push("/");
                    setLoginError(false);
                } else {
                    setLoginError(true);
                }
            })();
        },
    });
    return (
        <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-3 max-w-[25rem] mx-auto"
        >
            <header className="form-header text-center text-xl md:text-2xl font-semibold text-gray-800">
                Giriş Yap
            </header>

            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Email"
                className="outline-none border-2 border-gray-200 py-2 px-2 text-lg"
            />
            {formik.touched.email && formik.errors.email ? (
                <p className="text-md text-red-500 text-center">
                    {formik.errors.email}
                </p>
            ) : null}
            <input
                id="password"
                name="password"
                type="password"
                placeholder="Şifre"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="outline-none border-2 border-gray-200 py-2 px-2 text-lg"
            />
            {formik.touched.password && formik.errors.password ? (
                <p className="text-md text-red-500 text-center">
                    {formik.errors.password}
                </p>
            ) : null}
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 duration-150 text-white w-full py-2 font-bold text-lg"
            >
                İleri
            </button>

            {loginError && (
                <p className="text-center text-red-500 font-semibold">
                    Kullanıcı adı veya şifre yanlış
                </p>
            )}
            <p className="text-center">
                Henüz bir hesabın yok mu ?<br />
                <Link
                    href={"/kayit-ol"}
                    className="text-blue-600 hover:text-blue-700 duration-150"
                >
                    Kayıt Ol
                </Link>
            </p>
        </form>
    );
}
