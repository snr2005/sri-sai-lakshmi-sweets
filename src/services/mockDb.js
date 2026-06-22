import { DEFAULT_PRODUCTS, DEFAULT_FAQS, DEFAULT_GALLERY } from '../utils/seedData';

const STORAGE_KEY = 'sri_sai_lakshmi_mock_db';

const loadDb = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.products && parsed.faqs && parsed.gallery && parsed.inquiries) {
        if (!parsed.orders) {
          parsed.orders = [
            {
              id: "mock-order-1",
              customer_name: "Satish Prasad",
              customer_phone: "+91 99887 76655",
              order_type: "Catering",
              occasion: "Wedding Reception",
              event_date: "2026-07-15",
              items: "Assorted Ghee Sweets (Laddu, Kaju Katli) - 300 plates, Hot Mixture - 300 plates",
              total_price: 45000,
              advance_paid: 15000,
              status: "Confirmed",
              notes: "Requires silver platter setups. Delivery directly to Sai Kalyan Mandapam.",
              created_at: new Date(Date.now() - 3600000 * 5)
            },
            {
              id: "mock-order-2",
              customer_name: "Prerna Reddy",
              customer_phone: "+91 88776 65544",
              order_type: "Bulk Order",
              occasion: "Festival Distribution",
              event_date: "2026-06-28",
              items: "Agra Pan - 50 Boxes (10pcs each), Osmania Biscuits - 100 Packs",
              total_price: 18000,
              advance_paid: 5000,
              status: "Pending",
              notes: "Pack in premium boxes with store brand labeling.",
              created_at: new Date(Date.now() - 3600000 * 12)
            }
          ];
        }
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error reading mock DB from localStorage:", e);
  }
  return null;
};

const saveDb = (db) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch (e) {
    console.error("Error saving mock DB to localStorage:", e);
  }
};

// Initialize the global mock db state
if (!window.__MOCK_DB__ || import.meta.hot) {
  // Force reset cache if old placeholders are found to sync new local assets
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw && (raw.includes('unsplash.com') || raw.includes('i0.wp.com') || raw.includes('static.toiimg.com') || raw.includes('Bulk Sweets Distribution Setup') || raw.includes('photo-1589301760014-d929f3979dbc') || raw.includes('Crunchy Spicy Palli Pakodi'))) {
    localStorage.removeItem(STORAGE_KEY);
  }

  const loaded = loadDb();
  if (loaded) {
    if (loaded.products) {
      loaded.products = loaded.products.map(p => {
        const seedProd = DEFAULT_PRODUCTS.find(sp => sp.name === p.name);
        if (seedProd && seedProd.image_url !== p.image_url) {
          return { ...p, image_url: seedProd.image_url };
        }
        return p;
      });
    }
    if (loaded.gallery) {
      loaded.gallery = loaded.gallery.filter(item => item.category !== 'Shop' && item.category !== 'Catering').map(g => {
        const seedGall = DEFAULT_GALLERY.find(sg => sg.title === g.title);
        if (seedGall && seedGall.image_url !== g.image_url) {
          return { ...g, image_url: seedGall.image_url };
        }
        return g;
      });
    }
    window.__MOCK_DB__ = loaded;
    saveDb(window.__MOCK_DB__);
  } else {
    window.__MOCK_DB__ = {
      products: DEFAULT_PRODUCTS.map((p, idx) => ({ ...p, id: `mock-prod-${idx}`, created_at: new Date(), updated_at: new Date() })),
      faqs: DEFAULT_FAQS.map((f, idx) => ({ ...f, id: `mock-faq-${idx}`, created_at: new Date(), updated_at: new Date() })),
      gallery: DEFAULT_GALLERY.map((g, idx) => ({ ...g, id: `mock-gall-${idx}`, created_at: new Date() })),
      inquiries: [
        {
          id: "mock-inq-1",
          name: "Ramesh Kumar",
          phone: "+91 98765 43210",
          email: "ramesh@example.com",
          inquiry_type: "Catering Inquiry",
          message: "Need catering for wedding function with 500 guests. Traditional Andhra food.",
          status: "new",
          created_at: new Date(Date.now() - 3600000 * 2) // 2 hours ago
        },
        {
          id: "mock-inq-2",
          name: "Soumya Devi",
          phone: "+91 80000 55554",
          email: "",
          inquiry_type: "Bulk Order",
          message: "Want to order 10 kg Kaju Katli for Diwali gifting.",
          status: "contacted",
          created_at: new Date(Date.now() - 3600000 * 24) // 1 day ago
        }
      ],
      orders: [
        {
          id: "mock-order-1",
          customer_name: "Satish Prasad",
          customer_phone: "+91 99887 76655",
          order_type: "Catering",
          occasion: "Wedding Reception",
          event_date: "2026-07-15",
          items: "Assorted Ghee Sweets (Laddu, Kaju Katli) - 300 plates, Hot Mixture - 300 plates",
          total_price: 45000,
          advance_paid: 15000,
          status: "Confirmed",
          notes: "Requires silver platter setups. Delivery directly to Sai Kalyan Mandapam.",
          created_at: new Date(Date.now() - 3600000 * 5)
        },
        {
          id: "mock-order-2",
          customer_name: "Prerna Reddy",
          customer_phone: "+91 88776 65544",
          order_type: "Bulk Order",
          occasion: "Festival Distribution",
          event_date: "2026-06-28",
          items: "Agra Pan - 50 Boxes (10pcs each), Osmania Biscuits - 100 Packs",
          total_price: 18000,
          advance_paid: 5000,
          status: "Pending",
          notes: "Pack in premium boxes with store brand labeling.",
          created_at: new Date(Date.now() - 3600000 * 12)
        }
      ]
    };
    saveDb(window.__MOCK_DB__);
  }
}

// Listen to storage changes from other tabs to sync window.__MOCK_DB__
window.addEventListener('storage', (e) => {
  if (e.key === STORAGE_KEY && e.newValue) {
    try {
      const parsed = JSON.parse(e.newValue);
      window.__MOCK_DB__ = parsed;
      // Notify all collections of the change
      ['products', 'faqs', 'gallery', 'inquiries', 'orders'].forEach(collectionName => {
        const event = new CustomEvent(`mock-db-update-${collectionName}`, {
          detail: window.__MOCK_DB__[collectionName]
        });
        window.dispatchEvent(event);
      });
    } catch (err) {
      console.error("Error syncing mock DB from storage event:", err);
    }
  }
});

export const getMockDb = () => window.__MOCK_DB__;

// Helper to trigger custom events for real-time reactive simulation
export const notifyDbUpdate = (collectionName) => {
  saveDb(window.__MOCK_DB__);
  const event = new CustomEvent(`mock-db-update-${collectionName}`, {
    detail: window.__MOCK_DB__[collectionName]
  });
  window.dispatchEvent(event);
};

