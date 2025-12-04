import { FRONT_URL } from "../../utils/api/config";

// components/StructuredData.js
export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Крымский Привоз",
    description: "Оптовый рынок в Симферополе",
    url: FRONT_URL,
    telephone: "+7-978-837-18-21",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Симферополь",
      streetAddress: "ул. Киевская, 144",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 44.98,
      longitude: 34.0861,
    },
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "₽₽",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
