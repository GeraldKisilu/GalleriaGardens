import type { CollectionConfig } from 'payload'

export const Properties: CollectionConfig = {
  slug: 'properties',
  admin: { group: 'Estate', useAsTitle: 'title' },
  access: {
    create: ({ req }) => req.user?.collection === 'admins',
    delete: ({ req }) => req.user?.collection === 'admins',
    read: () => true,
    update: ({ req }) => req.user?.collection === 'admins',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'listingType',
      type: 'select',
      required: true,
      options: [
        { label: 'For rent', value: 'rent' },
        { label: 'For sale', value: 'sale' },
      ],
    },
    { name: 'price', type: 'number', required: true },
    { name: 'priceSuffix', type: 'text' },
    { name: 'bedrooms', type: 'number', required: true },
    { name: 'bathrooms', type: 'number', required: true },
    { name: 'landSize', type: 'text', defaultValue: '0.5 acre' },
    { name: 'description', type: 'textarea', required: true },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    {
      name: 'features',
      type: 'array',
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    {
      name: 'availability',
      type: 'select',
      defaultValue: 'available',
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Reserved', value: 'reserved' },
        { label: 'Occupied', value: 'occupied' },
      ],
    },
  ],
}
