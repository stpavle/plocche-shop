"use server";

import { createClient } from "next-sanity";
import { revalidatePath } from "next/cache";

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

    const orderNum = `ORD-${Date.now()}`;
    transaction.create({
      _id: `order-${Date.now()}`,
      _type: "order",
      orderNumber: orderNum,
      customerName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email, 
      phone: formData.phone,
      address: `${formData.address}, ${formData.postalCode} ${formData.city}`,
      // NEW: Save Delivery Method
      deliveryMethod: formData.deliveryMethod,
      status: "pending",
      items: cartItems.map((item) => ({
        _key: Math.random().toString(36).substring(7),
        title: item.title,
        price: item.price,
        productId: item.id.toString(),
      })),
    });

    const productIds = cartItems.map((item) => item.id);
    const currentProducts = await writeClient.fetch(`*[_id in $ids] { _id, stock }`, { ids: productIds });

    cartItems.forEach((cartItem) => {
      const productInDb = currentProducts.find((p: any) => p._id === cartItem.id);
      if (productInDb) {
        transaction.patch(cartItem.id.toString(), (p) => {
            let patch = p.dec({ stock: 1 });
            if (productInDb.stock - 1 <= 0) {
                patch = patch.set({ soldOutAt: new Date().toISOString() });
            }
            return patch;
        });
      }
    });

    await transaction.commit();

    revalidatePath('/shop'); 
    revalidatePath('/product/[slug]', 'page'); 
    revalidatePath('/'); 

    return { success: true, orderId: orderNum };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Failed to create order" };
  }
}