import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";

function makeOrderNumber() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const rnd = Math.floor(1000 + Math.random() * 9000);
  return `ORD-${y}${m}${day}-${rnd}`;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const sessionUserId = (session?.user as any)?.id || null;

    const body = await req.json();

    const {
      customerEmail,
      customerName,
      address,
      apartment,
      city,
      postalCode,
      phone,
      notes,
      items,
    } = body;

    if (!customerEmail || !address || !city) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const subtotal = items.reduce(
      (sum: number, i: any) => sum + Number(i.price) * Number(i.qty),
      0
    );

    const shipping = 0;
    const total = subtotal + shipping;

    const order = await prisma.order.create({
      data: {
        orderNumber: makeOrderNumber(),
        status: "PROCESSING",
        userId: sessionUserId, // ✅ from session, not client

        customerEmail,
        customerName: customerName || null,

        address,
        apartment: apartment || null,
        city,
        postalCode: postalCode || null,
        phone: phone || null,
        notes: notes || null,

        subtotal,
        shipping,
        total,

        items: {
          create: items.map((i: any) => ({
            productId: i.id ? Number(i.id) : null,
            name: String(i.name),
            price: Number(i.price),
            qty: Number(i.qty),
            image: i.image || null,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json(order);
  } catch (error: any) {
    console.error("ORDER ERROR:", error);
    return NextResponse.json(
      { error: error?.message || "Order failed" },
      { status: 500 }
    );
  }
}