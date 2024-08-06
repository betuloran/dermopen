import { NextRequest, NextResponse } from "next/server";
import { client } from "@/mongodb/connect";
import getDate from "@/utils/getDate";

export async function POST(request: NextRequest) {
    const formData = await request.json();

    const dataBase = client.db("dermopen");
    const usersCollection = dataBase.collection("users");

    const newUser = { ...formData, orders: [], date: getDate(new Date()) };

    await usersCollection.insertOne(newUser);

    return NextResponse.json(
        { message: "Kullanici başarıyla kaydedildi" },
        { status: 200 }
    );
}
