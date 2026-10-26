import type { Access, CollectionConfig } from 'payload'

const requestAccess: Access = ({ req }) => {
  if (req.user?.collection === 'admins') return true
  if (req.user?.collection !== 'users') return false
  if (req.user.role === 'staff') return true
  return { resident: { equals: req.user.id } }
}

export const ServiceRequests: CollectionConfig = {
  slug: 'service-requests',
  admin: { group: 'Resident Services', useAsTitle: 'subject' },
  access: {
    create: ({ req }) => req.user?.collection === 'admins' || req.user?.collection === 'users',
    delete: requestAccess,
    read: requestAccess,
    update: requestAccess,
  },
  hooks: {
    beforeChange: [
      ({ data, operation, req }) => {
        if (operation === 'create' && req.user?.collection === 'users') {
          return { ...data, resident: req.user.id, status: 'submitted' }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'resident',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      access: { create: () => false, update: () => false },
    },
    { name: 'subject', type: 'text', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: ['plumbing', 'electrical', 'security', 'landscaping', 'general', 'complaint'],
    },
    {
      name: 'priority',
      type: 'select',
      required: true,
      defaultValue: 'normal',
      options: ['low', 'normal', 'urgent'],
    },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'submitted',
      options: ['submitted', 'acknowledged', 'in-progress', 'resolved', 'closed'],
      access: {
        create: () => false,
        update: ({ req }) => req.user?.collection === 'admins' || (req.user?.collection === 'users' && req.user.role === 'staff'),
      },
    },
    { name: 'managementResponse', type: 'textarea' },
  ],
}
