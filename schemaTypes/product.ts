import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Vinyl Records',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Album Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'artist',
      title: 'Artist',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Feature on Homepage',
      type: 'boolean',
      description: 'Toggle this ON to show this record on the landing page (Only the newest one toggled ON will show)',
      initialValue: false,
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL ID)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (KM)',
      type: 'number',
    }),
    defineField({
      name: 'stock',
      title: 'Stock Quantity',
      type: 'number',
      initialValue: 1, // Default is 1 (Unique)
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'year',
      title: 'Release Year',
      type: 'string', 
    }),
    defineField({
      name: 'pressing',
      title: 'Pressing Info / Label',
      type: 'string', 
      description: 'e.g., Jugoton LSY-63021, 1st Press, or UK Import',
    }),
    defineField({
      name: 'condition',
      title: 'Condition',
      type: 'string',
      options: {
        list: [
          { title: 'Mint (M)', value: 'Mint' },
          { title: 'Near Mint (NM)', value: 'Near Mint' },
          { title: 'Very Good Plus (VG+)', value: 'VG+' },
          { title: 'Very Good (VG)', value: 'VG' },
          { title: 'Good (G)', value: 'Good' },
          { title: 'Used', value: 'Used' },
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description / Tracklist',
      type: 'text', 
      rows: 10,
    }),
    // Main Cover (Used for the grid)
    defineField({
      name: 'image',
      title: 'Main Cover Art',
      type: 'image',
      options: { hotspot: true },
    }),
    // --- NEW: GALLERY ARRAY ---
    defineField({
      name: 'gallery',
      title: 'Extra Photos (Back, Disc, Damages)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      options: {
        layout: 'grid',
      }
    }),
    // --------------------------
    defineField({
      name: 'labelColor',
      title: 'Center Label Color',
      type: 'string',
      initialValue: '#FF4D00'
    }),
  ],
})