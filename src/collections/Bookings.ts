import type { Access, CollectionConfig } from 'payload'

const bookingAccess: Access = ({ req }) => {
  if (req.user?.collection === 'admins') return true
  if (req.user?.collection !== 'users') return false
  if (req.user.role === 'staff') return true
  return { resident: { equals: req.user.id } }
}

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: { group: 'Resident Services', useAsTitle: 'bookingDate' },
  access: {
    create: ({ req }) => req.user?.collection === 'admins' || req.user?.collection === 'users',
    delete: bookingAccess,
    read: bookingAccess,
    update: bookingAccess,
  },
  hooks: {
    beforeChange: [
      ({ data, operation, req }) => {
        if (operation === 'create' && req.user?.collection === 'users') {
          return { ...data, resident: req.user.id, status: 'pending' }
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
    { name: 'amenity', type: 'relationship', relationTo: 'amenities', required: true },
    { name: 'bookingDate', type: 'date', required: true },
    { name: 'startTime', type: 'text', required: true },
    { name: 'endTime', type: 'text', required: true },
    { name: 'purpose', type: 'textarea' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: ['pending', 'confirmed', 'declined', 'cancelled'],
      access: {
        create: () => false,
        update: ({ req }) => req.user?.collection === 'admins' || (req.user?.collection === 'users' && req.user.role === 'staff'),
      },
    },
  ],
}
