import { NextRequest, NextResponse } from "next/server";
import { client } from "@/mongodb/connect";

export async function PUT(request: NextRequest) {

    const data = await request.json();

    const dataBase = client.db("dermopen");
    const usersCollection = dataBase.collection("users");

    const user = await usersCollection.findOne({password:data.password,email:data.email});

    await usersCollection.updateOne(
        { password: data.password, email: data.email },
        {
            $set: {
                orders: [...user.orders,...data.orders],
            },
        }
    );

    return NextResponse.json({ status: 200 });
}