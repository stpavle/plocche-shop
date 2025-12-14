import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'order',
  title: 'Orders',
  type: 'document',
  fields: [
    defineField({ name: 'orderNumber', title: 'Order Number', type: 'string' }),
    defineField({ name: 'customerName', title: 'Customer Name', type: 'string' }),
    // NEW FIELD
    defineField({
      name: 'deliveryMethod',
      title: 'Delivery Method',
      type: 'string',
      options: {
        list: [
          { title: 'Shipping', value: 'shipping' },
          { title: 'Local Pickup', value: 'pickup' },
        ]
      },
      initialValue: 'shipping'
    }),
    defineField({ name: 'phone', title: 'Phone Number', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'address', title: 'Shipping Address', type: 'text' }),
    defineField({
      name: 'items',
      title: 'Purchased Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string' },
            { name: 'price', type: 'string' },
            { name: 'productId', type: 'string' },
          ]
        }
      ]
    }),
    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'pending'
    }),
  ],
  preview: {
    select: {
      title: 'orderNumber',
      subtitle: 'customerName',
      status: 'status',
      method: 'deliveryMethod'
    },
    prepare(selection) {
      const { title, subtitle, status, method } = selection
      
      const statusIcons: Record<string, string> = {
        pending: '⏳',
        shipped: '🚚',
        delivered: '✅',
        cancelled: '❌'
      }

      const methodIcon = method === 'pickup' ? '🏪' : '📦';

      return {
        title: `${statusIcons[status] || '❓'} ${title}`,
        subtitle: `${methodIcon} ${subtitle} | ${status?.toUpperCase()}`
      }
    }
  }
})