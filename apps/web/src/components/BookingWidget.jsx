"use client";

import { useState } from "react";

export default function BookingWidget() {
  const [bookingData, setBookingData] = useState({
    from: "",
    to: "",
    date: "",
    passengers: 1,
  });

  const cities = [
    { value: "douala", label: "🏙️ Douala", emoji: "🏙️" },
    { value: "yaounde", label: "🏛️ Yaoundé", emoji: "🏛️" },
    { value: "bafoussam", label: "🏔️ Bafoussam", emoji: "🏔️" },
    { value: "bamenda", label: "🌳 Bamenda", emoji: "🌳" },
    { value: "garoua", label: "🌄 Garoua", emoji: "🌄" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking:", bookingData);
    // Navigate to booking page
  };

  const handleInputChange = (field, value) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-5xl mx-auto border-2 border-orange-100">
      <div className="mb-6">
        <h3 className="text-2xl font-black mb-2">Find Your Trip 🎫</h3>
        <p className="text-gray-600">Book verified buses across Cameroon</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* From */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Departure City
            </label>
            <select
              value={bookingData.from}
              onChange={(e) => handleInputChange("from", e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-base bg-white"
              required
            >
              <option value="">Select departure city...</option>
              {cities.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
          </div>

          {/* To */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Destination City
            </label>
            <select
              value={bookingData.to}
              onChange={(e) => handleInputChange("to", e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-base bg-white"
              required
            >
              <option value="">Select destination...</option>
              {cities.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Date */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Travel Date
            </label>
            <input
              type="date"
              value={bookingData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-base"
              required
            />
          </div>

          {/* Passengers */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Passengers
            </label>
            <select
              value={bookingData.passengers}
              onChange={(e) =>
                handleInputChange("passengers", parseInt(e.target.value))
              }
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-base bg-white"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "passenger" : "passengers"}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full btn btn-primary btn-lg group"
          disabled={!bookingData.from || !bookingData.to || !bookingData.date}
        >
          <span>Search Available Buses</span>
          <svg
            className="w-5 h-5 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>

        {/* Quick Info */}
        <div className="flex items-center justify-center gap-6 text-sm text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>Instant Confirmation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>Free Cancellation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>Mobile Money</span>
          </div>
        </div>
      </form>
    </div>
  );
}
