import path from 'path'
import { buildFigmaConfig } from '@payloadcms/figma'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { en as adminLanguage } from '@payloadcms/translations/languages/en'
import { fileURLToPath } from 'url'
import { Admins } from './collections/Admins'
import { Media } from './collections/Media'
import { Folders } from './collections/Folders'
import { Tags } from './collections/Tags'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Properties } from './collections/Properties'
import { Amenities } from './collections/Amenities'
import { Bookings } from './collections/Bookings'
import { ServiceRequests } from './collections/ServiceRequests'
import { Messages } from './collections/Messages'
import { LegalDocuments } from './collections/LegalDocuments'
import { Careers } from './collections/Careers'
import { CareerApplications } from './collections/CareerApplications'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const baseConfig = {
  admin: {
    user: Admins.slug,
    constrainWidth: true,
    dashboard: {
      widgets: [],
      defaultLayout: [
        { widgetSlug: 'activity', width: 'full' },
        { widgetSlug: 'collections', width: 'full' },
      ],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: {
    fallbackLanguage: 'en',
    supportedLanguages: { 'en': adminLanguage },
  },
  collections: [
    Admins,
    Users,
    Media,
    Folders,
    Tags,
    Posts,
    Properties,
    Amenities,
    Bookings,
    ServiceRequests,
    Messages,
    LegalDocuments,
    Careers,
    CareerApplications,
  ],
  localization: {
    locales: [{ code: 'en', label: 'English' }],
    fallback: true,
    defaultLocale: 'en',
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  plugins: [mcpPlugin({})],
} as const

const hasFigmaRuntime = Boolean(
  process.env.FIGMA_EID ||
    process.env.FIGMA_PROJECT_ID ||
    process.env.FIGMA_CONTENT_API_CONTENT_SYSTEM_ID ||
    process.env.FIGMA_CONTENT_API_ACCESS_KEY ||
    process.env.FIGMA_DEV_JWT,
)

export default hasFigmaRuntime
  ? buildFigmaConfig({
      ...baseConfig,
      figma: {},
    })
  : baseConfig
