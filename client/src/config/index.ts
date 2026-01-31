// Environment configuration
// All environment variables are accessed through this file for type safety

export const config = {
  // Studio Information
  studioName: import.meta.env.VITE_STUDIO_NAME || "Wedding Moments Studio",
  studioDescription:
    import.meta.env.VITE_STUDIO_DESCRIPTION ||
    "Capturing life's most precious moments with professional photography services.",
  studioAddress: import.meta.env.VITE_STUDIO_ADDRESS || "",

  // Contact Information
  contact: {
    email: import.meta.env.VITE_CONTACT_EMAIL || "info@weddingmoments.com",
    phone: import.meta.env.VITE_CONTACT_PHONE || "+91 98765 43210",
    whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || "919876543210",
  },

  // Social Media
  social: {
    instagram: import.meta.env.VITE_INSTAGRAM_URL || "https://instagram.com",
    facebook: import.meta.env.VITE_FACEBOOK_URL || "https://facebook.com",
    twitter: import.meta.env.VITE_TWITTER_URL || "https://twitter.com",
  },

  // Helper functions
  getWhatsAppLink: (message?: string) => {
    const baseUrl = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || "919876543210"}`;
    return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;
  },

  getMailtoLink: (subject?: string, body?: string) => {
    const email =
      import.meta.env.VITE_CONTACT_EMAIL || "info@weddingmoments.com";
    let link = `mailto:${email}`;
    const params = [];
    if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
    if (body) params.push(`body=${encodeURIComponent(body)}`);
    if (params.length > 0) link += `?${params.join("&")}`;
    return link;
  },
};
