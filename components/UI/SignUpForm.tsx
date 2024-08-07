"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpForm() {
    const [submitMessage, setSubmitMessage] = useState<string | null>(null);
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            email: "",
            password: "",
            passwordCheck: "",
            phoneNumber: "",
            address: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Bu alanı doldurmak zorunludur."),
            surname: Yup.string().required("Bu alanı doldurmak zorunludur."),
            email: Yup.string()
                .email("Geçersiz email adresi.")
                .required("Bu alanı doldurmak zorunludur."),
            password: Yup.string()
                .required("Bu alanı doldurmak zorunludur.")
                .max(20, "Şifre en fazla 20 hane olabilir.")
                .min(10, "Şifre en az 10 hane olmalı."),
            passwordCheck: Yup.string()
                .required("Bu alanı doldurmak zorunludur.")
                .oneOf([Yup.ref("password")], "Şifreler eşleşmiyor."),
            phoneNumber: Yup.string()
                .required("Bu alanı doldurmak zorunludur.")
                .length(10, "Telefon numarası 10 haneli olmalıdır."),
            address: Yup.string().required("Bu alanı doldurmak zorunludur."),
        }),
        onSubmit: () => {
            (async function () {
                const response = await fetch("/api/kayitOl", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formik.values),
                });
                const { message } = await response.json();
                setSubmitMessage(message);
                setTimeout(() => {
                    router.push("/");
                }, 1500);
            })();
        },
    });

    const [signUpPhase, setSignUpPhase] = useState<number>(1);

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 items-center py-8 mx-auto"
        >
            {!submitMessage && signUpPhase === 1 && (
                <div className="flex flex-col items-center gap-5 w-full max-w-[25rem]">
                    <header className="form-header text-center text-xl md:text-2xl font-semibold text-gray-800">
                        Kayıt Ol
                    </header>

                    {["name", "surname"].map((key) => {
                        const typedKey = key as "name" | "surname";
                        return (
                            <React.Fragment key={typedKey}>
                                <input
                                    type="text"
                                    id={typedKey}
                                    name={typedKey}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder={
                                        typedKey === "name" ? "İsim" : "Soyisim"
                                    }
                                    value={formik.values[typedKey]}
                                    className="outline-none w-full border-2 border-gray-200 py-2 px-2 text-lg"
                                />
                                {formik.touched[typedKey] &&
                                formik.errors[typedKey] ? (
                                    <p className="text-md text-red-500 text-center">
                                        {formik.errors[typedKey]}
                                    </p>
                                ) : null}
                            </React.Fragment>
                        );
                    })}

                    <button
                        onClick={() => {
                            if (
                                !formik.errors.name &&
                                !formik.errors.surname &&
                                formik.touched.name &&
                                formik.touched.surname
                            ) {
                                setSignUpPhase((prevState) => ++prevState);
                            }
                        }}
                        type="button"
                        className="bg-blue-600 hover:bg-blue-700 duration-150 text-white w-full py-2 font-bold text-lg"
                    >
                        İleri
                    </button>
                    <p className="text-center">
                        Zaten hesabın var mı ?<br />
                        <Link
                            href={"/giris-yap"}
                            className="text-blue-600 hover:text-blue-700 duration-150"
                        >
                            Giriş yap
                        </Link>
                    </p>
                </div>
            )}
            {!submitMessage && signUpPhase === 2 && (
                <div className="flex flex-col  gap-5 w-full max-w-[25rem]">
                    {["email", "password", "passwordCheck"].map((key) => {
                        const typedKey = key as
                            | "email"
                            | "password"
                            | "passwordCheck";
                        return (
                            <React.Fragment key={typedKey}>
                                <input
                                    type={
                                        typedKey === "email"
                                            ? "email"
                                            : "password"
                                    }
                                    id={typedKey}
                                    name={typedKey}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder={
                                        typedKey === "email"
                                            ? "Email"
                                            : typedKey === "password"
                                            ? "Şifre"
                                            : "Şifre tekrar"
                                    }
                                    value={formik.values[typedKey]}
                                    className="outline-none border-2 border-gray-200 py-2 px-2 text-lg"
                                />
                                {formik.touched[typedKey] &&
                                formik.errors[typedKey] ? (
                                    <p className="text-md text-red-500 text-center">
                                        {formik.errors[typedKey]}
                                    </p>
                                ) : null}
                            </React.Fragment>
                        );
                    })}

                    <button
                        onClick={() => {
                            if (
                                !formik.errors.email &&
                                !formik.errors.password &&
                                !formik.errors.passwordCheck &&
                                formik.touched.email &&
                                formik.touched.password &&
                                formik.touched.passwordCheck
                            ) {
                                setSignUpPhase((prevState) => ++prevState);
                            }
                        }}
                        type="button"
                        className="bg-blue-600 hover:bg-blue-700 duration-150 text-white w-full py-2 font-bold text-lg"
                    >
                        İleri
                    </button>
                </div>
            )}
            {!submitMessage && signUpPhase === 3 && (
                <div className="flex flex-col  gap-5 w-full max-w-[25rem]">
                    {["phoneNumber", "address"].map((key) => {
                        const typedKey = key as "phoneNumber" | "address";
                        return (
                            <React.Fragment key={typedKey}>
                                {typedKey === "phoneNumber" && (
                                    <input
                                        type="text"
                                        id={typedKey}
                                        name={typedKey}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder={"Telefon Numarası"}
                                        value={formik.values[typedKey]}
                                        className="outline-none border-2 border-gray-200 py-2 px-2 text-lg"
                                    />
                                )}
                                {typedKey === "address" && (
                                    <textarea
                                        id={typedKey}
                                        name={typedKey}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder={"Adresiniz"}
                                        value={formik.values[typedKey]}
                                        className="outline-none border-2 border-gray-200 py-2 px-2 text-lg w-full h-[24rem]"
                                    />
                                )}
                                {formik.touched[typedKey] &&
                                formik.errors[typedKey] ? (
                                    <p className="text-md text-red-500 text-center">
                                        {formik.errors[typedKey]}
                                    </p>
                                ) : null}
                            </React.Fragment>
                        );
                    })}

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 duration-150 text-white w-full py-2 font-bold text-lg"
                    >
                        İleri
                    </button>
                </div>
            )}
            {submitMessage && (
                <div className="text-green-500 text-2xl font-medium flex flex-col  gap-4 w-full max-w-[25rem]">
                    <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="text-6xl"
                    ></FontAwesomeIcon>

                    <p className="text-center">
                        {submitMessage} <br /> Anasayfaya yönlendiriliyorsunuz.{" "}
                    </p>
                </div>
            )}
        </form>
    );
}
