"use server";

import { createClient } from "next-sanity";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN, // Needs the Editor token from .env.local
  useCdn: false,
});

export async function createOrder(formData: any, cartItems: any[]) {
  try {
    // Start a Transaction (This ensures all changes happen together)
    const transaction = writeClient.transaction();

    // 1. Create the Order Document
    const orderId = `order-${Date.now()}`;
    
    transaction.create({
      _id: orderId,
      _type: "order",
      orderNumber: `ORD-${Date.now()}`,
      customerName: `${formData.firstName} ${formData.lastName}`,
      
      // SAVING THE EMAIL HERE
      email: formData.email, 
      
      // Combine address + phone for easier reading in dashboard
      address: `${formData.address}, ${formData.postalCode} ${formData.city}`,
      phone: formData.phone, // Ensure your Order Schema has a 'phone' field, or remove this line
      
      status: "pending",
      items: cartItems.map((item) => ({
        _key: Math.random().toString(36).substring(7),
        title: item.title,
        price: item.price,
        productId: item.id.toString(),
      })),
    });

    // 2. Decrease Stock for EACH item purchased
    cartItems.forEach((item) => {
      // We assume item.id is the Sanity _id
      if (item.id) {
        // "dec" means decrement (subtract)
        transaction.patch(item.id.toString(), (p) => p.dec({ stock: 1 }));
      }
    });

    // 3. Commit (Run everything)
    await transaction.commit();

    return { success: true, orderId };
  } catch (error) {
    console.error("Sanity Write Error:", error);
    return { success: false, error: "Failed to create order" };
  }
}