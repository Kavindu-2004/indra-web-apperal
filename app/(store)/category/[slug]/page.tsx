// app/(store)/category/[slug]/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AddToCartButton from "@/components/AddToCartButton";

export const runtime = "nodejs";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ FIX: params is async in Next 15

  if (!slug) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold">Category</h1>
        <p className="text-gray-600 mt-2">Missing category slug.</p>
      </div>
    );
  }

  // ✅ Find category by slug
  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold">Not found</h1>
        <p className="text-gray-600 mt-2">No category for slug: {slug}</p>
      </div>
    );
  }

  // ✅ Products logic:
  // New Arrivals = latest 20 uploads (across all products)
  // Others = products inside selected category
  const products =
    slug === "new-arrivals"
      ? await prisma.product.findMany({
          where: { isActive: true },
          include: { images: true, category: true, inventory: true },
          orderBy: { createdAt: "desc" },
          take: 20,
        })
      : await prisma.product.findMany({
          where: { isActive: true, categoryId: category.id },
          include: { images: true, category: true, inventory: true },
          orderBy: { createdAt: "desc" },
        });

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold">{category.name}</h1>
          <p className="text-gray-600 mt-1">
            {slug === "new-arrivals"
              ? "Latest 20 uploads"
              : "Products in this category"}
          </p>
        </div>

        <Link href="/" className="text-sm text-gray-600 hover:text-black">
          ← Back to Home
        </Link>
      </div>

      {/* Grid */}
      {products.length === 0 ? (
        <div className="border rounded-2xl p-10 text-center bg-gray-50">
          <p className="text-gray-700 font-medium">No products yet.</p>
          <p className="text-gray-500 text-sm mt-1">
            Add products from Admin → Products.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p) => {
            const img = p.images?.[0]?.url ?? null;

            return (
              <Link key={p.id} href={`/products/${p.id}`} className="group block">
                <div className="p-card rounded-2xl border bg-white overflow-hidden">
                  {/* Image */}
                  <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                    {img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={img}
                        alt={p.name}
                        className="p-img w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="p-img w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        Product Image
                      </div>
                    )}

                    {/* ✅ Quick View (ONLY ADDED THIS BLOCK) */}
                    <div className="absolute inset-x-4 bottom-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition duration-200">
                      <div className="w-full rounded-full bg-black text-white text-sm py-2 text-center">
                        Quick view
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="text-sm font-medium group-hover:underline">
                      {p.name}
                    </div>
                    <div className="mt-1 text-sm font-semibold">
                      Rs {p.price.toLocaleString()}
                    </div>

                    {/* ✅ Add to cart */}
                    <AddToCartButton
                      id={p.id}
                      name={p.name}
                      price={p.price}
                      image={img}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}