export type Locale = 'en' | 'bs';

const dictionaries = {
  en: {
    header: {
      shop: "Shop",
      info: "Info",
      cart: "Cart",
    },
    home: {
      title: "Independent Record Store",
      subtitle: "Based in Bosnia & Herzegovina.\nShipping Worldwide.",
      cta: "Start Digging",
      featured: "Featured Vinyl",
    },
    shop: {
      title: "All Records",
      available: "Items Available",
      addToCart: "+ Add to Cart",
    },
    product: {
      addToCart: "Add to Cart",
      shipping: "* Worldwide Shipping Available via Post",
      condition: "Condition",
      year: "Year",
    },
    checkout: {
      title: "Checkout",
      back: "Back to Shop",
      shippingDetails: "01. Shipping Details",
      orderSummary: "02. Order Summary",
      firstName: "First Name",
      lastName: "Last Name",
      address: "Address",
      city: "City",
      postal: "Postal Code",
      email: "Email Address",
      phone: "Phone",
      confirm: "Confirm Order",
      total: "Total",
      note: "* Payment due upon delivery (Cash Only).",
      successTitle: "Order Received",
      successMsg: "Thank you. Your order has been saved. We will ship via Post Office.",
      backHome: "Back to Home",
    },
    cart: {
      heading: "Your Selection",
      empty: "[ Cart is Empty ]",
      total: "Total",
      checkout: "Proceed to Checkout",
    },
    footer: {
      locations: "Sarajevo / Banja Luka / Mostar",
      rights: "© 2024 Plocche",
    }
  },
  bs: {
    header: {
      shop: "Trgovina",
      info: "Info",
      cart: "Korpa",
    },
    home: {
      title: "Nezavisna Prodavnica Ploča",
      subtitle: "Banja Luka, BiH.\nŠaljemo širom svijeta.",
      cta: "Započni Pretragu",
      featured: "Izdvojeno",
    },
    shop: {
      title: "Sve Ploče",
      available: "Artikala Dostupno",
      addToCart: "+ Dodaj u Korpu",
    },
    product: {
      addToCart: "Dodaj u Korpu",
      shipping: "* Dostava poštom (Plaćanje pouzećem)",
      condition: "Stanje",
      year: "Godina",
    },
    checkout: {
      title: "Kasa",
      back: "Nazad u Trgovinu",
      shippingDetails: "01. Podaci za Dostavu",
      orderSummary: "02. Pregled Narudžbe",
      firstName: "Ime",
      lastName: "Prezime",
      address: "Adresa",
      city: "Grad",
      postal: "Poštanski Broj",
      email: "Email Adresa",
      phone: "Telefon",
      confirm: "Potvrdi Narudžbu",
      total: "Ukupno",
      note: "* Plaćanje pouzećem (Keš pri preuzimanju).",
      successTitle: "Narudžba Primljena",
      successMsg: "Hvala vam. Vaša narudžba je sačuvana. Šaljemo brzom poštom.",
      backHome: "Nazad na Početnu",
    },
    cart: {
      heading: "Vaš Izbor",
      empty: "[ Korpa je Prazna ]",
      total: "Ukupno",
      checkout: "Nastavi na Kasu",
    },
    footer: {
      locations: "Sarajevo / Banja Luka / Mostar",
      rights: "© 2024 Plocche",
    }
  }
};

export const getDictionary = (lang: Locale) => dictionaries[lang];