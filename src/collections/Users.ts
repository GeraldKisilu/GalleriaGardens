import type { Access, CollectionConfig } from 'payload'

const isAppUser = (user: unknown): user is { id: string | number; collection: 'users'; role?: string } =>
  Boolean(user && typeof user === 'object' && 'collection' in user && user.collection === 'users')

const selfOrStaff: Access = ({ req }) => {
  if (req.user?.collection === 'admins') return true
  if (!isAppUser(req.user)) return false
  if (req.user.role === 'staff') return true
  return { id: { equals: req.user.id } }
}

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    group: 'Residents',
    useAsTitle: 'fullName',
  },
  access: {
    admin: () => false,
    create: () => true,
    delete: selfOrStaff,
    read: ({ req }) => req.user?.collection === 'admins' || isAppUser(req.user),
    update: selfOrStaff,
  },
  fields: [
    { name: 'fullName', type: 'text', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'villaNumber', type: 'text' },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'tenant',
      options: [
        { label: 'Tenant', value: 'tenant' },
        { label: 'Prospective client', value: 'client' },
        { label: 'Management staff', value: 'staff' },
      ],
      access: {
        create: () => false,
        update: ({ req }) => req.user?.collection === 'admins' || (isAppUser(req.user) && req.user.role === 'staff'),
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending verification', value: 'pending' },
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
      access: {
        create: () => false,
        update: ({ req }) => req.user?.collection === 'admins' || (isAppUser(req.user) && req.user.role === 'staff'),
      },
    },
  ],
}
