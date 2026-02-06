import { useState, useEffect } from "react";
import { Plus, Trash2, Save, AlertCircle } from "lucide-react";
import { useOffers, type Offer } from "../context/OffersContext";
import toast from "react-hot-toast";

const Offers = () => {
  const { offers, addOffer, deleteOffer, updateOffer } = useOffers();

  const [newTickerText, setNewTickerText] = useState("");
  const [badgeTitle, setBadgeTitle] = useState("");
  const [badgeDiscount, setBadgeDiscount] = useState("");
  const [pendingAdds, setPendingAdds] = useState<Omit<Offer, "id">[]>([]);

  // Separate offers by type
  const tickerOffers = offers.filter((o) => o.type === "ticker");
  // Assuming we use a single badge with a known ID or filter by type 'badge'
  const badgeOffer = offers.find((o) => o.type === "badge");

  // Load badge data into local state when it loads
  useEffect(() => {
    if (badgeOffer) {
      setBadgeTitle(badgeOffer.code || "HOLI OFFER");
      setBadgeDiscount(badgeOffer.description || "20-25% OFF");
    }
  }, [badgeOffer]);

  const handleAddTicker = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTickerText.trim()) {
      setPendingAdds([
        ...pendingAdds,
        {
          code: `TICKER-${Date.now()}`, // Internal code
          description: newTickerText.trim(),
          discount: 0,
          expiryDate: "",
          isActive: true,
          type: "ticker",
        },
      ]);
      setNewTickerText("");
      toast.success("Added to draft list! Don't forget to save.", {
        icon: "📝",
      });
    }
  };

  const handleSaveBadge = async () => {
    try {
      if (badgeOffer) {
        // Update existing
        await updateOffer(badgeOffer.id, {
          code: badgeTitle,
          description: badgeDiscount,
          isActive: true,
        });
      } else {
        // Create new
        await addOffer({
          code: badgeTitle || "OFFER",
          description: badgeDiscount || "SALE",
          discount: 0,
          expiryDate: "",
          isActive: true,
          type: "badge",
        });
      }
      toast.success("Badge settings updated successfully!");
    } catch (e) {
      console.error(e);
      toast.error("Failed to update badge.");
    }
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
              {/* Database Offers */}
              {tickerOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 group hover:border-amber-500/30 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-gray-200 text-sm">{offer.description}</p>
                  </div>
                  <button
                    onClick={() => deleteOffer(offer.id)}
                    className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Pending (Unsaved) Offers */}
              {pendingAdds.map((offer, index) => (
                <div
                  key={`pending-${index}`}
                  className="flex items-center gap-4 bg-amber-500/10 p-4 rounded-lg border border-amber-500/50 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-br">
                    Unsaved
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-amber-200 text-sm">
                      {offer.description}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newPending = [...pendingAdds];
                      newPending.splice(index, 1);
                      setPendingAdds(newPending);
                    }}
                    className="p-2 text-amber-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Remove Draft"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {tickerOffers.length === 0 && pendingAdds.length === 0 && (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No active offers. The ticker will be empty.
                </div>
              )}
            </div>

            {pendingAdds.length > 0 && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={async () => {
                    const offersToSave = [...pendingAdds];
                    setPendingAdds([]); // Clear immediately to prevent duplication glitch

                    try {
                      const toastId = toast.loading("Saving ticker offers...");
                      for (const offer of offersToSave) {
                        await addOffer(offer);
                      }
                      toast.success("Ticker offers saved successfully!", {
                        id: toastId,
                      });
                    } catch (error) {
                      console.error("Error saving tickers:", error);
                      toast.error("Failed to save some offers.");
                      // Optional: restore pending if failed
                      setPendingAdds(offersToSave);
                    }
                  }}
                  className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors animate-pulse"
                >
                  <Save className="w-4 h-4" />
                  Save {pendingAdds.length} New Offer(s)
                </button>
              </div>
            )}
          </div>

          {/* Add New Offer */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Add New Ticker Offer
            </h3>
            <form onSubmit={handleAddTicker} className="flex gap-4">
              <input
                type="text"
                value={newTickerText}
                onChange={(e) => setNewTickerText(e.target.value)}
                placeholder="Enter offer text (e.g., Summer Sale: 15% OFF)"
                className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                disabled={!newTickerText.trim()}
                className="flex items-center gap-2 px-6 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
                title="Add to List (Draft)"
              >
                <Plus className="w-4 h-4" />
                Add to List
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
                      <span className="text-xs tracking-widest block uppercase text-amber-200 mt-1">
                        {badgeDiscount.split(" ").slice(1).join(" ") || "OFF"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleSaveBadge}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Badge Settings
          </button>
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
              Update Badge
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              Review your changes above and click save to update the live
              website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
