/** MOCK admin data for the dashboard concept only. */
import { products } from "@/lib/mock/products";

export const kpis = [
  { label: "Revenue (30d)", value: "$248,910", delta: "+12.4%", positive: true },
  { label: "Orders (30d)", value: "412", delta: "+8.1%", positive: true },
  { label: "Products", value: String(products.length), delta: "3 low stock", positive: false },
  { label: "Customers", value: "3,284", delta: "+5.6%", positive: true },
];

// Simple daily revenue series for the sparkline/area chart (in thousands).
export const salesSeries = [
  6, 8, 7, 10, 9, 12, 11, 14, 13, 16, 15, 18, 17, 21, 19, 24, 22, 26, 25, 29,
  27, 31, 30, 34, 33, 37, 36, 40, 39, 44,
];

export const recentOrders = [
  { id: "MSN-2026-0431", customer: "Amara Okafor", date: "Aug 7", status: "Paid", total: "$1,485.00", items: 2 },
  { id: "MSN-2026-0430", customer: "Julien Marchand", date: "Aug 7", status: "Processing", total: "$695.00", items: 1 },
  { id: "MSN-2026-0429", customer: "Sofia Ricci", date: "Aug 6", status: "Shipped", total: "$2,340.00", items: 1 },
  { id: "MSN-2026-0428", customer: "Daniel Cho", date: "Aug 6", status: "Delivered", total: "$1,050.00", items: 1 },
  { id: "MSN-2026-0427", customer: "Priya Nair", date: "Aug 5", status: "Paid", total: "$540.00", items: 2 },
  { id: "MSN-2026-0426", customer: "Lars Andersen", date: "Aug 5", status: "Refunded", total: "$360.00", items: 1 },
  { id: "MSN-2026-0425", customer: "Mia Rossi", date: "Aug 4", status: "Delivered", total: "$780.00", items: 1 },
];

export const customers = [
  { name: "Amara Okafor", email: "amara@example.com", orders: 8, spent: "$9,240", tier: "Private Client", joined: "2024" },
  { name: "Julien Marchand", email: "julien@example.com", orders: 3, spent: "$2,180", tier: "Member", joined: "2025" },
  { name: "Sofia Ricci", email: "sofia@example.com", orders: 12, spent: "$18,640", tier: "Private Client", joined: "2023" },
  { name: "Daniel Cho", email: "daniel@example.com", orders: 2, spent: "$1,745", tier: "Member", joined: "2026" },
  { name: "Priya Nair", email: "priya@example.com", orders: 5, spent: "$4,320", tier: "Member", joined: "2025" },
  { name: "Lars Andersen", email: "lars@example.com", orders: 1, spent: "$360", tier: "New", joined: "2026" },
];

export const discounts = [
  { code: "PRIVATE10", type: "10% off", scope: "Private clients", uses: "142 / 500", status: "Active", expires: "Dec 31, 2026" },
  { code: "WELCOME", type: "$50 off $500+", scope: "New customers", uses: "63 / ∞", status: "Active", expires: "—" },
  { code: "AW26LAUNCH", type: "15% off", scope: "Autumn Collection", uses: "0 / 200", status: "Scheduled", expires: "Sep 15, 2026" },
  { code: "SUMMER24", type: "20% off", scope: "Sitewide", uses: "410 / 410", status: "Expired", expires: "Aug 1, 2026" },
];

export const contentBlocks = [
  { key: "home.hero", type: "Hero", title: "The Art of Modern Luxury", status: "Published" },
  { key: "home.featured", type: "Featured collection", title: "The Autumn Collection", status: "Published" },
  { key: "home.editorial", type: "Editorial", title: "Crafted with Intention", status: "Published" },
  { key: "home.lookbook", type: "Lookbook", title: "Autumn in Frame", status: "Published" },
  { key: "page.about", type: "Page", title: "About — The House", status: "Published" },
];
