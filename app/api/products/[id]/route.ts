import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = {
  params: { id: string };
};

export async function GET(_: Request, { params }: Params) {
  const id = Number(params.id);

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PUT(req: Request, { params }: Params) {
  const id = Number(params.id);
  const body = await req.json();

  const updated = await prisma.product.update({
    where: { id },
    data: {
      name: body.name,
      price: Number(body.price),
      stock: Number(body.stock),
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: Params) {
  const id = Number(params.id);

  await prisma.product.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Deleted successfully" });
}