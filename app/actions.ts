"use server";

import { createClient } from "next-sanity";
import { revalidatePath } from "next/cache";

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

    // 2. SMART STOCK DECREASE
    // We fetch the current stock levels first to know if we are hitting zero
    // (This prevents race conditions where we might miss the "0" moment)
    const productIds = cartItems.map((item) => item.id);
    const currentProducts = await writeClient.fetch(
      `*[_id in $ids] { _id, stock }`, 
      { ids: productIds }
    );

    cartItems.forEach((cartItem) => {
      const productInDb = currentProducts.find((p: any) => p._id === cartItem.id);
      
      if (productInDb) {
        // Use callback syntax for patch to chain operations safely
        transaction.patch(cartItem.id.toString(), (p) => {
            // A. Decrease stock
            let patch = p.dec({ stock: 1 });

            // B. If this specific purchase makes it 0, stamp it!
            if (productInDb.stock - 1 <= 0) {
                patch = patch.set({ soldOutAt: new Date().toISOString() });
            }
            
            return patch;
        });
      }
    });

    // 3. Commit (Run everything)
    await transaction.commit();

    // 4. Force Cache Refresh (CRITICAL)
    // This tells Next.js: "The data changed, stop showing the old version."
    revalidatePath('/shop'); 
    revalidatePath('/product/[slug]', 'page'); 
    revalidatePath('/'); 

    return { success: true, orderId };
  } catch (error) {
    console.error("Sanity Write Error:", error);
    return { success: false, error: "Failed to create order" };
  }
}