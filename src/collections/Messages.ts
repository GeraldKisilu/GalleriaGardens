import type { Access, CollectionConfig, Where } from 'payload'

const messageRead: Access = ({ req }) => {
  if (req.user?.collection === 'admins') return true
  if (req.user?.collection !== 'users') return false
  if (req.user.role === 'staff') return true
  return {
    or: [
      { audience: { equals: 'community' } },
      { participants: { contains: req.user.id } },
    ],
  } as Where
}

export const Messages: CollectionConfig = {
  slug: 'messages',
  admin: { group: 'Communication', useAsTitle: 'body' },
  access: {
    create: ({ req }) => req.user?.collection === 'admins' || req.user?.collection === 'users',
    delete: ({ req }) =>
      req.user?.collection === 'admins'
        ? true
        : req.user?.collection === 'users'
        ? req.user.role === 'staff'
          ? true
          : { author: { equals: req.user.id } }
        : false,
    read: messageRead,
    update: () => false,
  },
  hooks: {
    beforeValidate: [
      ({ data, operation, req }) => {
        if (operation !== 'create' || req.user?.collection !== 'users') return data
        const participants = Array.isArray(data?.participants) ? data.participants : []
        return {
          ...data,
          author: req.user.id,
          participants:
            data?.audience === 'direct'
              ? Array.from(new Set([String(req.user.id), ...participants.map(String)]))
              : [],
        }
      },
    ],
  },
  fields: [
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      access: { create: () => false, update: () => false },
    },
    {
      name: 'audience',
      type: 'select',
      required: true,
      options: [
        { label: 'Estate community', value: 'community' },
        { label: 'Private conversation', value: 'direct' },
      ],
    },
    {
      name: 'participants',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      maxRows: 2,
      validate: (value, { siblingData }) => {
        const audience = (siblingData as { audience?: string } | undefined)?.audience
        if (audience === 'direct' && (!Array.isArray(value) || value.length !== 2)) {
          return 'Private messages require exactly two participants.'
        }
        return true
      },
    },
    { name: 'body', type: 'textarea', required: true, maxLength: 2000 },
  ],
}
