import type { CollectionConfig } from 'payload'

export const CareerApplications: CollectionConfig = {
  slug: 'career-applications',
  admin: { group: 'People', useAsTitle: 'fullName' },
  access: {
    create: () => true,
    read: ({ req }) => req.user?.collection === 'admins',
    update: ({ req }) => req.user?.collection === 'admins',
    delete: ({ req }) => req.user?.collection === 'admins',
  },
  fields: [
    { name: 'career', type: 'relationship', relationTo: 'careers', required: true },
    { name: 'fullName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'coverNote', type: 'textarea', required: true },
    { name: 'cv', type: 'upload', relationTo: 'media' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'received',
      options: ['received', 'reviewing', 'shortlisted', 'declined'],
      access: { create: () => false },
    },
  ],
}
