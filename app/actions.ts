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
        // Decrease stock
        const patch = transaction.patch(cartItem.id.toString()).dec({ stock: 1 });

        // If this specific purchase makes it 0, stamp it!
        if (productInDb.stock - 1 <= 0) {
            patch.set({ soldOutAt: new Date().toISOString() });
        }
      }
    });

    await transaction.commit();
    return { success: true, orderId };
  } catch (error) {
    console.error("Sanity Write Error:", error);
    return { success: false, error: "Failed to create order" };
  }
}