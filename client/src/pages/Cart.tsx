import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { config } from "../config";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, getCartTotal } = useCart();

  const generateBookingMessage = (): string => {
    let message = `🎉 *Booking Request - ${config.studioName}*\n\n`;

    cart.forEach((item, index) => {
      message += `📸 *Service ${index + 1}: ${item.serviceName}*\n`;
      item.subServices.forEach((sub) => {
        const unit =
          sub.pricingType === "manual"
            ? sub.customUnit || "units"
            : sub.pricingType === "per-piece"
              ? "pcs"
              : sub.pricingType === "per-hour"
                ? "hours"
                : sub.pricingType === "per-event"
                  ? "event"
                  : "days";

        message += `   • ${sub.name}\n`;
        message += `     Quantity: ${sub.days} ${unit} | Price: ₹${sub.pricePerDay}/${unit} | Subtotal: ₹${sub.pricePerDay * sub.days}\n`;
      });
      message += `   Service Total: ₹${item.totalPrice}\n\n`;
    });

    message += `💰 *Grand Total: ₹${getCartTotal()} INR*\n\n`;
    message +=
      "Please confirm availability and provide further details.\n\nThank you!";

    return message;
  };

  const handleWhatsAppBooking = () => {
    const message = generateBookingMessage();
    const whatsappUrl = config.getWhatsAppLink(message);
    window.open(whatsappUrl, "_blank");
  };

  const handleGmailBooking = () => {
    const message = generateBookingMessage();
    const subject = `Booking Request - ${config.studioName}`;
    const body = message.replace(/\*/g, "");
    const gmailUrl = config.getMailtoLink(subject, body);
    window.location.href = gmailUrl;
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8">
              <svg
                className="w-32 h-32 mx-auto text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-4xl font-serif font-bold text-white mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Start adding services to create your perfect photography package
            </p>
            <button
              onClick={() => navigate("/services")}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/50"
            >
              Browse Services
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-5xl font-serif font-bold text-white">
            Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Cart
            </span>
          </h1>
          <button
            onClick={clearCart}
            className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.serviceId}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-amber-400/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-serif font-semibold text-white">
                    {item.serviceName}
                  </h3>
                  <button
                    onClick={() => removeFromCart(item.serviceId)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                    aria-label="Remove service"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Sub-services */}
                <div className="space-y-3 mb-4">
                  {item.subServices.map((sub) => {
                    const unit =
                      sub.pricingType === "manual"
                        ? sub.customUnit || "units"
                        : sub.pricingType === "per-piece"
                          ? "pcs"
                          : sub.pricingType === "per-hour"
                            ? "hours"
                            : sub.pricingType === "per-event"
                              ? "event"
                              : "days";
                    return (
                      <div
                        key={sub.id}
                        className="flex items-center justify-between py-3 border-b border-white/5"
                      >
                        <div>
                          <div className="text-white font-medium">
                            {sub.name}
                          </div>
                          <div className="text-sm text-gray-400">
                            {sub.days} {unit} × ₹{sub.pricePerDay}
                          </div>
                        </div>
                        <div className="text-amber-400 font-semibold">
                          ₹{sub.pricePerDay * sub.days}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Service Total */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-gray-400">Service Total</span>
                  <span className="text-2xl font-bold text-amber-400">
                    ₹{item.totalPrice}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Summary & Booking */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sticky top-24">
              <h3 className="text-2xl font-serif font-semibold text-white mb-6">
                Order Summary
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-gray-400">
                  <span>Total Services</span>
                  <span className="text-white font-medium">{cart.length}</span>
                </div>
                <div className="flex items-center justify-between text-gray-400">
                  <span>Total Items</span>
                  <span className="text-white font-medium">
                    {cart.reduce(
                      (acc, item) => acc + item.subServices.length,
                      0,
                    )}
                  </span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-semibold text-white">
                    Grand Total
                  </span>
                  <span className="text-3xl font-bold text-amber-400">
                    ₹{getCartTotal()}
                  </span>
                </div>
                <p className="text-sm text-gray-400">INR (Indian Rupees)</p>
              </div>

              {/* Booking Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleWhatsAppBooking}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/50"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Send via WhatsApp
                </button>

                <button
                  onClick={handleGmailBooking}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white/10 border-2 border-white/20 text-white font-semibold rounded-full hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                  </svg>
                  Send via Gmail
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                Your booking request will be sent to our team for confirmation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
