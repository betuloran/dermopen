"use client";

import { AuthContext, User } from "@/context/AuthContext";
import getProfileData from "@/utils/getProfileData";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useContext, useEffect, useState } from "react";

export default function Profile() {
    const authContext = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const [userData, setUserData] = useState<User | null | undefined>(
        authContext?.user
    );

    async function updateProfile() {
        await fetch("/api/guncelle", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        localStorage.setItem("userInfo", JSON.stringify(userData));

        if(userData){
            authContext?.setUser(userData);
        }
        
    }

    function submitHandler(e: FormEvent) {
        e.preventDefault();

        (async function () {
            await updateProfile();
        })();
    }
    useEffect(() => {
        setUserData(authContext?.user);
    }, [authContext]);

    return (
        <div className="profile">
            {userData && (
                <>
                    <header className="profile-header text-left">
                        <h1 className="text-2xl">Kullanıcı Profili</h1>

                        <div className="h-[1px] bg-gray-200 w-full"></div>
                    </header>
                    <div className="profile-information mt-4">
                        <div className="flex items-center gap-4 mb-4 text-lg">
                            <FontAwesomeIcon
                                icon={faUser}
                                className="text-4xl"
                            ></FontAwesomeIcon>
                            <div className="flex flex-col">
                                <p>
                                    {userData.name} {userData.surname}
                                </p>

                                <p>{userData.email}</p>
                            </div>
                        </div>
                        <form
                            onSubmit={submitHandler}
                            className="text-lg flex flex-col gap-4"
                        >
                            <div>
                                <p>Kullanıcı adı</p>
                                <input
                                    placeholder={
                                        userData.name +
                                            " " +
                                            userData.surname || ""
                                    }
                                    disabled={!isEditing}
                                    className={`border-2 w-full border-gray-300 py-2 px-2  placeholder-gray-500 ${
                                        isEditing && "placeholder-gray-800"
                                    }`}
                                    onChange={(e) => {
                                        setUserData(
                                            (
                                                prevUserData:
                                                    | User
                                                    | null
                                                    | undefined
                                            ) => {
                                                if (!prevUserData) return;

                                                return {
                                                    ...prevUserData,
                                                    name: e.target.value.split(
                                                        " "
                                                    )[0],
                                                    surname:
                                                        e.target.value.split(
                                                            " "
                                                        )[1],
                                                };
                                            }
                                        );
                                    }}
                                />
                            </div>
                            <div>
                                <p>Email</p>
                                <input
                                    placeholder={userData.email || ""}
                                    disabled={!isEditing}
                                    className={`border-2 w-full border-gray-300 py-2 px-2 placeholder-gray-500 ${
                                        isEditing && "placeholder-gray-800"
                                    }`}
                                    onChange={(e) => {
                                        setUserData(
                                            (
                                                prevUserData:
                                                    | User
                                                    | null
                                                    | undefined
                                            ) => {
                                                if (!prevUserData) return;
                                                return {
                                                    ...prevUserData,
                                                    email: e.target.value,
                                                };
                                            }
                                        );
                                    }}
                                />
                            </div>
                            <div>
                                <p>Telefon Numarası</p>
                                <input
                                    placeholder={userData.phoneNumber || ""}
                                    disabled={!isEditing}
                                    className={`border-2 w-full border-gray-300 py-2 px-2 placeholder-gray-500 ${
                                        isEditing && "placeholder-gray-800"
                                    }`}
                                    onChange={(e) => {
                                        setUserData(
                                            (
                                                prevUserData:
                                                    | User
                                                    | null
                                                    | undefined
                                            ) => {
                                                if (!prevUserData) return;

                                                return {
                                                    ...prevUserData,
                                                    phoneNumber: e.target.value,
                                                };
                                            }
                                        );
                                    }}
                                />
                            </div>
                            <div>
                                <p>Üyelik tarihi</p>
                                <input
                                    placeholder={
                                        userData.date || "11 Temmuz 2024 14:13"
                                    }
                                    disabled
                                    className={`border-2 w-full border-gray-300 py-2 px-2 placeholder-gray-500`}
                                />
                            </div>
                            <div>
                                <p>Adres</p>
                                <textarea
                                    placeholder={userData.address || ""}
                                    disabled={!isEditing}
                                    className={`border-2 w-full border-gray-300 py-2 px-2 placeholder-gray-500 ${
                                        isEditing && "placeholder-gray-800"
                                    } h-[250px]`}
                                    onChange={(e) => {
                                        setUserData(
                                            (
                                                prevUserData:
                                                    | User
                                                    | null
                                                    | undefined
                                            ) => {
                                                if (!prevUserData) return;

                                                return {
                                                    ...prevUserData,
                                                    address: e.target.value,
                                                };
                                            }
                                        );
                                    }}
                                />
                            </div>
                            <button
                                type={isEditing ? "button" : "submit"}
                                className="py-3 hover:bg-blue-700 duration-150 bg-blue-600 text-white font-bold text-lg"
                                onClick={() => {
                                    setIsEditing((prevState) => !prevState);
                                }}
                            >
                                {isEditing ? "Kaydet" : "Profili Düzenle"}
                            </button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}
