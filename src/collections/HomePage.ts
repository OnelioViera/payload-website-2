import type { CollectionConfig } from 'payload'

export const HomePage: CollectionConfig = {
  slug: 'home-page',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Page Title',
    },
    {
      name: 'welcomeMessage',
      type: 'text',
      required: true,
      label: 'Welcome Message',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Hero Image',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Main Content',
    },
    {
      name: 'ctaText',
      type: 'text',
      required: true,
      label: 'Call to Action Text',
    },
    {
      name: 'ctaLink',
      type: 'text',
      required: true,
      label: 'Call to Action Link',
    },
  ],
} 