import type { CollectionConfig } from 'payload'

export const LegalDocuments: CollectionConfig = {
  slug: 'legal-documents',
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
      name: 'documentType',
      type: 'select',
      required: true,
      options: ['rental-contract', 'sale-agreement', 'terms-and-conditions', 'estate-rules'],
    },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'content', type: 'richText' },
    { name: 'file', type: 'upload', relationTo: 'media' },
  ],
}
