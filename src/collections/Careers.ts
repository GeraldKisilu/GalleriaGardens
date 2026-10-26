import type { CollectionConfig } from 'payload'

export const Careers: CollectionConfig = {
  slug: 'careers',
  admin: { group: 'People', useAsTitle: 'title' },
  access: {
    create: ({ req }) => req.user?.collection === 'admins',
    delete: ({ req }) => req.user?.collection === 'admins',
    read: () => true,
    update: ({ req }) => req.user?.collection === 'admins',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'department', type: 'text', required: true },
    { name: 'employmentType', type: 'select', required: true, options: ['full-time', 'part-time', 'contract'] },
    { name: 'description', type: 'textarea', required: true },
    { name: 'requirements', type: 'textarea', required: true },
    { name: 'isOpen', type: 'checkbox', defaultValue: true },
  ],
}
