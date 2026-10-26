import type { CollectionConfig } from 'payload'

export const Amenities: CollectionConfig = {
  slug: 'amenities',
  admin: { group: 'Estate', useAsTitle: 'name' },
  access: {
    create: ({ req }) => req.user?.collection === 'admins',
    delete: ({ req }) => req.user?.collection === 'admins',
    read: () => true,
    update: ({ req }) => req.user?.collection === 'admins',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'openingHours', type: 'text' },
    { name: 'bookable', type: 'checkbox', defaultValue: false },
    { name: 'capacity', type: 'number' },
  ],
}
