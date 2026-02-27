import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Shop By Category */}
          <div className="space-y-4">
            <h3 className="font-semibold">Shop By Category</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><Link className="hover:text-black" href="/category/new-arrivals">New Arrivals</Link></li>
              <li><Link className="hover:text-black" href="/category/workwear">Workwear</Link></li>
              <li><Link className="hover:text-black" href="/category/dresses">Dresses</Link></li>
              <li><Link className="hover:text-black" href="/category/evening-wear">Evening Wear</Link></li>
              <li><Link className="hover:text-black" href="/category/accessories">Accessories</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Information</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><Link className="hover:text-black" href="/about">About Us</Link></li>
              <li><Link className="hover:text-black" href="/contact">Contact Us</Link></li>
              <li><Link className="hover:text-black" href="/club">Indra Club</Link></li>
              <li><Link className="hover:text-black" href="/events">Events</Link></li>
              <li><Link className="hover:text-black" href="/size-guide">Size Guide</Link></li>
              <li><Link className="hover:text-black" href="/blogs">Blogs</Link></li>
            </ul>
          </div>

          {/* Terms */}
          <div className="space-y-4">
            <h3 className="font-semibold">Term of Use</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><Link className="hover:text-black" href="/terms">Terms & Conditions</Link></li>
              <li><Link className="hover:text-black" href="/privacy">Privacy Policy</Link></li>
              <li><Link className="hover:text-black" href="/returns">Shipping & Returns</Link></li>
              <li><Link className="hover:text-black" href="/track">Track Orders</Link></li>
            </ul>
          </div>

          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-semibold">Shop By Brand</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><Link className="hover:text-black" href="/brand/indra">Indra Dress Point</Link></li>
              <li><Link className="hover:text-black" href="/brand/scylla-zelus">Scylla Zelus</Link></li>
              <li><Link className="hover:text-black" href="/brand/redvers-buller">Redvers Buller</Link></li>
              <li><Link className="hover:text-black" href="/brand/eighty">EIGHTY %</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold">Join our Newsletter</h3>
            <p className="text-sm text-gray-700">
              Be the First to Discover New Collections & Exclusive Offers
            </p>

            <form className="flex items-center gap-3">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 rounded-full border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="button"
                className="rounded-full bg-black text-white px-6 py-3 text-sm font-medium hover:opacity-90 flex items-center gap-2"
              >
                SUBSCRIBE <span className="inline-block w-2 h-2 bg-white rounded-full" />
              </button>
            </form>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-50"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-50"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-sm text-gray-700">
            Copyright© {new Date().getFullYear()} Indra Dress Point
          </div>

          <div className="flex items-center gap-3">
            <button className="border rounded-lg px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
              EN <span className="text-xs">▾</span>
            </button>
            <button className="border rounded-lg px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
              LKR <span className="text-xs">▾</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}