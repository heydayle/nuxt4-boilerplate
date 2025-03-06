import type { Social, Header, Link } from '@/types/nuxtTypes'
declare module 'nuxt/schema' {
    interface AppConfigInput {
      /** Theme configuration */
      theme?: {
        /** Primary app color */
        primaryColor?: string
      },
      template?: {
        ui?: {},
        features?: any[],
        socials?: Social[],
        headers?: Header[],
        footer?: {
            references?: Link[],
            children?: Link[],
        }
      }
    }
  }
  
  export {}
  