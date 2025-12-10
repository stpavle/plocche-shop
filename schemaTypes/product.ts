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
      description: 'Toggle this ON to show this record on the landing page',
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
      initialValue: 1,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'soldOutAt',
      title: 'Sold Out Timestamp',
      type: 'datetime',
      readOnly: true, 
      description: 'Automatically set when stock hits 0. Used to hide items after 30 days.'
    }),
    defineField({
      name: 'origin',
      title: 'Origin (Category)',
      type: 'string',
      options: {
        list: [
          { title: 'Balkan (Domaća)', value: 'balkan' },
          { title: 'Worldwide (Strana)', value: 'worldwide' },
        ],
        layout: 'radio'
      },
      initialValue: 'worldwide'
    }),
    defineField({
      name: 'genre',
      title: 'Genre',
      type: 'string',
      options: {
        list: [
          { title: 'Rock', value: 'Rock' },
          { title: 'Pop', value: 'Pop' },
          { title: 'Jazz', value: 'Jazz' },
          { title: 'Funk & Soul', value: 'Funk & Soul' },
          { title: 'Electronic', value: 'Electronic' },
          { title: 'Hip Hop', value: 'Hip Hop' },
          { title: 'Folk / Narodna', value: 'Folk' },
          { title: 'Classical', value: 'Classical' },
          { title: 'Reggae', value: 'Reggae' },
          { title: 'Soundtrack', value: 'Soundtrack' },
        ],
      },
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
    defineField({
      name: 'image',
      title: 'Main Cover Art',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Extra Photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      options: { layout: 'grid' }
    }),
    defineField({
      name: 'labelColor',
      title: 'Center Label Color',
      type: 'string',
      initialValue: '#FF4D00'
    }),
  ],
})