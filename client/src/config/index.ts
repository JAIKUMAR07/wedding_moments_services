// Environment configuration
// All environment variables are accessed through this file for type safety

export const config = {
  // Studio Information
  studioName: "Studio Wedding Moments",
  studioDescription:
    "Capturing life's most precious moments with professional photography services.",
  studioAddress:
    "G-16/170-171,GF, near Rajah Mandapam, RCD Road, Visakhapatnam, Andhra Pradesh 530007",

  // Contact Information - Defaults until loaded from DB
  contact: {
    email: "[EMAIL_ADDRESS]",
    phone: "+91 99895 16846",
    whatsapp: "919989516846",
  },

  // Social Media - Defaults until loaded from DB
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
  },

  // Helper functions
  getWhatsAppLink: (message?: string) => {
    const baseUrl = `https://wa.me/919876543210`;
    return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;
  },

  getMailtoLink: (subject?: string, body?: string) => {
    const email = "info@weddingmoments.com";
    let link = `mailto:${email}`;
    const params = [];
    if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
    if (body) params.push(`body=${encodeURIComponent(body)}`);
    if (params.length > 0) link += `?${params.join("&")}`;
    return link;
  },
};
