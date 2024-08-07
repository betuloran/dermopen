import { NextRequest, NextResponse } from "next/server";
import { client } from "@/mongodb/connect";

export async function POST(request: NextRequest) {
    const formData = await request.json();

    const dataBase = client.db("dermopen");
    const usersCollection = dataBase.collection("users");

    const user = await usersCollection.findOne({
        email: formData.email,
        password: formData.password,
    });

    console.log(formData);
    console.log(user);

    if (user?._id) {
        return NextResponse.json({ user }, { status: 200 });
    } else {
        return NextResponse.json(
            { message: "Hatalı kullanıcı adı veya şifre" },
            { status: 404 }
        );
    }
}
