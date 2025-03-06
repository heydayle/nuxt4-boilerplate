import type { Social, Header, Link, Feature } from '@/types/nuxtTypes'
declare module 'nuxt/schema' {
    interface AppConfigInput {
      /** Theme configuration */
      theme?: {
        /** Primary app color */
        primaryColor?: string
      },
      app?: {
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        ui?: any,
        meta?: {
          title?: string,
          description?: string,
          keywords?: string
        }
        features?: Feature[],
        socials?: Social[],
        headers?: Header,
        footer?: {
            references?: Link[],
            children?: Link[],
            contact?: Link[],
            copyright?: string
        }
      }
    }
  }
  
  export {}
  