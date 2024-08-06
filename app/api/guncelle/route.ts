import { User } from "@/context/AuthContext";
import { client } from "@/mongodb/connect";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {

    const formData:User = await request.json();

    const dataBase = client.db("dermopen");
    const usersCollection = dataBase.collection("users");

    if("_id" in formData){
        delete formData["_id"];
    }

    await usersCollection.updateOne({password:formData.password},{$set:formData});
    
    return NextResponse.json(
        { status: 200 }
    );
}