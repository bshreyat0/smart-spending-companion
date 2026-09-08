// Mock Data for Smart Spending Companion
// All data is simulated — no backend required

export const BUDGET_LIMIT = 50000; // Monthly budget in ₹

// Initial transactions with categories, amounts, dates, and optional tax for CA review
export const initialTransactions = [
  { id: 1, description: "Zomato Order", amount: 450, category: "Food", date: "2026-03-24", icon: "🍕", tax: 22 },
  { id: 2, description: "Uber Ride", amount: 320, category: "Travel", date: "2026-03-24", icon: "🚗", tax: 0 },
  { id: 3, description: "Netflix Subscription", amount: 649, category: "Subscriptions", date: "2026-03-23", icon: "📺", tax: 116 },
  { id: 4, description: "Amazon Shopping", amount: 2199, category: "Shopping", date: "2026-03-23", icon: "🛍️", tax: 395 },
  { id: 5, description: "Swiggy Breakfast", amount: 280, category: "Food", date: "2026-03-22", icon: "🍳", tax: 14 },
  { id: 6, description: "Spotify Premium", amount: 119, category: "Subscriptions", date: "2026-03-22", icon: "🎵", tax: 21 },
  { id: 7, description: "Flight Ticket", amount: 4500, category: "Travel", date: "2026-03-21", icon: "✈️", tax: 810 },
  { id: 8, description: "Myntra Dress", amount: 1299, category: "Shopping", date: "2026-03-21", icon: "👗", tax: 233 },
  { id: 9, description: "Swiggy Lunch", amount: 380, category: "Food", date: "2026-03-20", icon: "🍱", tax: 19 },
  { id: 10, description: "Metro Card Recharge", amount: 500, category: "Travel", date: "2026-03-20", icon: "🚇", tax: 0 },
  { id: 11, description: "Adobe CC", amount: 1675, category: "Subscriptions", date: "2026-03-19", icon: "🎨", tax: 301 },
  { id: 12, description: "Electricity Bill", amount: 1800, category: "Others", date: "2026-03-19", icon: "⚡", tax: 0 },
  { id: 13, description: "Gym Membership", amount: 2000, category: "Others", date: "2026-03-18", icon: "💪", tax: 360 },
  { id: 14, description: "Jio Recharge", amount: 279, category: "Others", date: "2026-03-18", icon: "📱", tax: 50 },
  { id: 15, description: "Pizza Night", amount: 720, category: "Food", date: "2026-03-17", icon: "🍕", tax: 36 },
];

// Category metadata
export const categoryMeta = {
  Food:          { color: "#f97316", bg: "rgba(249,115,22,0.15)", emoji: "🍕" },
  Travel:        { color: "#3b82f6", bg: "rgba(59,130,246,0.15)", emoji: "🚗" },
  Shopping:      { color: "#ec4899", bg: "rgba(236,72,153,0.15)", emoji: "🛍️" },
  Subscriptions: { color: "#8b5cf6", bg: "rgba(139,92,246,0.15)", emoji: "📺" },
  Loan:          { color: "#f59e0b", bg: "rgba(245,158,11,0.15)", emoji: "🏦" },
  Others:        { color: "#10b981", bg: "rgba(16,185,129,0.15)", emoji: "💡" },
};

// Active subscriptions for tracker
export const subscriptions = [
  { name: "Netflix", amount: 649, cycle: "Monthly", nextDate: "Apr 23", icon: "📺", color: "#e50914" },
  { name: "Spotify", amount: 119, cycle: "Monthly", nextDate: "Apr 22", icon: "🎵", color: "#1db954" },
  { name: "Adobe CC", amount: 1675, cycle: "Monthly", nextDate: "Apr 19", icon: "🎨", color: "#ff0000" },
  { name: "Zomato Pro", amount: 299, cycle: "Monthly", nextDate: "Apr 28", icon: "🍕", color: "#e23744" },
];

// Money leak categories (recurring patterns that look wasteful)
export const moneyLeaks = [
  { label: "Late-night food orders", amount: 1830, tip: "You ordered food after 11 PM 6 times this month" },
  { label: "Impulse shopping", amount: 3498, tip: "3 purchases made within 10 mins of browsing" },
  { label: "Unused subscriptions", amount: 1675, tip: "Adobe CC — last used 18 days ago" },
];

// Weekly spend data for charts
export const weeklySpend = [
  { day: "Mon", amount: 450 },
  { day: "Tue", amount: 2519 },
  { day: "Wed", amount: 1068 },
  { day: "Thu", amount: 4500 },
  { day: "Fri", amount: 2019 },
  { day: "Sat", amount: 720 },
  { day: "Sun", amount: 380 },
];

// AI-powered insights
export const insights = [
  { type: "warning", icon: "🔥", text: "You spent 38% more on Food this week compared to last week." },
  { type: "danger",  icon: "⚠️", text: "Subscription costs have increased by ₹1,994 this month. Review unused plans." },
  { type: "info",    icon: "💡", text: "Your travel spending peaks on weekends. Consider public transit to save ₹1,200/month." },
  { type: "success", icon: "✅", text: "Great job! You saved ₹3,000 more than last month. Keep it up!" },
  { type: "warning", icon: "📉", text: "At current pace, you'll exceed your ₹50,000 budget by ₹6,170 this month." },
];
