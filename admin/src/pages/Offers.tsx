import { useState } from "react";
import { Plus, Trash2, Save, AlertCircle } from "lucide-react";

const Offers = () => {
  // Initial state mimicking client's OFFERS array
  const [offers, setOffers] = useState<string[]>([
    "Special Offer: Get up to 20% OFF on Pre-Wedding Shoots",
    "Limited Time: 10% OFF on All Baby Photography Packages",
    "Combo Deal: Book Wedding + Pre-Wedding & Get Free Album",
    "Flash Sale: Flat ₹5000 OFF on Cinematic Wedding Films",
  ]);

  const [newOffer, setNewOffer] = useState("");
  const [badgeTitle, setBadgeTitle] = useState("HOLI OFFER");
  const [badgeDiscount, setBadgeDiscount] = useState("20-25% OFF");

  const handleAddOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (newOffer.trim()) {
      setOffers([...offers, newOffer.trim()]);
      setNewOffer("");
    }
  };

  const handleDeleteOffer = (index: number) => {
    if (window.confirm("Are you sure you want to remove this offer?")) {
      const updatedOffers = offers.filter((_, i) => i !== index);
      setOffers(updatedOffers);
    }
  };

  const handleSave = () => {
    // In a real app, this would send an API request to update the backend
    alert(
      "Offers updated successfully! (This would update the live site via API)",
    );
  };

  return (
    <div className="p-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">
          Offers & Ticker Management
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Manage the scrolling ticker offers shown on the Services page.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ticker List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6">
              Active Ticker Offers
            </h3>

            <div className="space-y-4">
              {offers.map((offer, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 group hover:border-amber-500/30 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-gray-200 text-sm">{offer}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteOffer(index)}
                    className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {offers.length === 0 && (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No active offers. The ticker will be empty.
                </div>
              )}
            </div>
          </div>

          {/* Add New Offer */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Add New Ticker Offer
            </h3>
            <form onSubmit={handleAddOffer} className="flex gap-4">
              <input
                type="text"
                value={newOffer}
                onChange={(e) => setNewOffer(e.target.value)}
                placeholder="Enter offer text (e.g., Summer Sale: 15% OFF)"
                className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                disabled={!newOffer.trim()}
                className="flex items-center gap-2 px-6 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
                title="Add Offer"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </form>
          </div>

          {/* Festive Badge Management */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6">
              Special Festive Badge
            </h3>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Form */}
              <div className="flex-1 w-full space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Badge Title (Top Tag)
                  </label>
                  <input
                    type="text"
                    value={badgeTitle}
                    onChange={(e) => setBadgeTitle(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="e.g., HOLI OFFER"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Badge Discount Text (Main Text)
                  </label>
                  <input
                    type="text"
                    value={badgeDiscount}
                    onChange={(e) => setBadgeDiscount(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="e.g., 20-25% OFF"
                  />
                </div>
              </div>

              {/* Preview */}
              <div className="flex items-center justify-center p-4 bg-black/60 rounded-xl border border-gray-700 min-w-[200px]">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  {/* Background Star */}
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full text-amber-500 drop-shadow-lg"
                  >
                    <path
                      fill="currentColor"
                      d="M50 0 L61 15 L78 10 L84 27 L100 35 L95 52 L100 69 L84 77 L78 94 L61 89 L50 104 L39 89 L22 94 L16 77 L0 69 L5 52 L0 35 L16 27 L22 10 L39 15 Z"
                    />
                  </svg>
                  {/* Content */}
                  <div className="relative z-10 text-center transform -rotate-12">
                    <div className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">
                      {badgeTitle || "OFFER"}
                    </div>
                    <div className="font-black text-white leading-none text-shadow">
                      <span className="text-xl block">
                        {badgeDiscount.split(" ")[0]}
                      </span>
                      <span className="text-[10px] tracking-widest block uppercase text-amber-200">
                        {badgeDiscount.split(" ").slice(1).join(" ") || "OFF"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-blue-400 mb-1">
                  Preview Info
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-3">
                  <strong>Ticker:</strong> Appears at the top of the Services
                  page in a scrolling animation.
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  <strong>Special Badge:</strong> The large rotating seal on the
                  right side of the "Our Services" heading. Use short text like
                  "25% OFF" for best results.
                </p>
              </div>
            </div>
          </div>

          {/* Save Action */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Publish Changes
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              Review your changes above and click save to update the live
              website.
            </p>
            <button
              onClick={handleSave}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
