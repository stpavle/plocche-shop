"use server";

import { createClient } from "next-sanity";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function createOrder(formData: any, cartItems: any[]) {
  try {
    const transaction = writeClient.transaction();

    // 1. Create Order
    const orderId = `order-${Date.now()}`;
    transaction.create({
      _id: orderId,
      _type: "order",
      orderNumber: `ORD-${Date.now()}`,
      customerName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email, 
      address: `${formData.address}, ${formData.postalCode} ${formData.city}`,
      phone: formData.phone,
      status: "pending",
      items: cartItems.map((item) => ({
        _key: Math.random().toString(36).substring(7),
        title: item.title,
        price: item.price,
        productId: item.id.toString(),
      })),
    });

    // 2. SMART STOCK DECREASE & SOLD OUT TIMESTAMP
    const productIds = cartItems.map((item) => item.id);
    const currentProducts = await writeClient.fetch(
      `*[_id in $ids] { _id, stock }`, 
      { ids: productIds }
    );

    cartItems.forEach((cartItem) => {
      const productInDb = currentProducts.find((p: any) => p._id === cartItem.id);
      
      if (productInDb) {
        // --- FIXED SECTION START ---
        // We use a callback (p) to define the patch operations
        transaction.patch(cartItem.id.toString(), (p) => {
            // 1. Always decrement stock
            let patch = p.dec({ stock: 1 });

            // 2. If this purchase hits 0, also stamp the time
            if (productInDb.stock - 1 <= 0) {
                patch = patch.set({ soldOutAt: new Date().toISOString() });
            }

            // 3. Return the final patch instructions
            return patch;
        });
        // --- FIXED SECTION END ---
      }
    });

    await transaction.commit();
    return { success: true, orderId };
  } catch (error) {
    console.error("Sanity Write Error:", error);
    return { success: false, error: "Failed to create order" };
  }
}