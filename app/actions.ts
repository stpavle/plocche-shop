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
    // Validate input data
    if (!formData || !cartItems || cartItems.length === 0) {
      console.error("Invalid order data: missing form data or cart items");
      return { success: false, error: "Invalid order data. Please check your cart and try again." };
    }

    // Validate required form fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postalCode'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        console.error(`Missing required field: ${field}`);
        return { success: false, error: `Missing required field: ${field}` };
      }
    }

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

    // Fetch current product stock with error handling
    const productIds = cartItems.map((item) => item.id);
    let currentProducts;
    try {
      currentProducts = await writeClient.fetch(`*[_id in $ids] { _id, stock }`, { ids: productIds });
    } catch (fetchError) {
      console.error("Failed to fetch product stock:", fetchError);
      return { success: false, error: "Unable to verify product availability. Please try again." };
    }

    // Validate all products exist in database
    const missingProducts = cartItems.filter(
      (cartItem) => !currentProducts.find((p: any) => p._id === cartItem.id)
    );

    if (missingProducts.length > 0) {
      console.error("Products not found in database:", missingProducts.map(p => p.id));
      return { success: false, error: "Some products in your cart are no longer available." };
    }

    // Update stock for each product
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

    // Commit transaction with error handling
    try {
      await transaction.commit();
    } catch (commitError) {
      console.error("Failed to commit transaction:", commitError);
      return { success: false, error: "Failed to process order. Your cart has not been modified. Please try again." };
    }

    // Revalidate paths with error handling
    try {
      revalidatePath('/shop');
      revalidatePath('/product/[slug]', 'page');
      revalidatePath('/');
    } catch (revalidateError) {
      console.error("Failed to revalidate paths:", revalidateError);
      // Don't fail the order if cache invalidation fails
    }

    return { success: true, orderId: orderNum };
  } catch (error) {
    console.error("Unexpected error creating order:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return { success: false, error: `Failed to create order: ${errorMessage}` };
  }
}