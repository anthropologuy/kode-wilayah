// kode-wilayah/next.config.ts

import type { NextConfig } from 'next'

const isProd =
  process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {

  assetPrefix:

    isProd

      ? '/kode-wilayah'

      : undefined,

  async headers() {

    return [

      {

        source: '/api/:path*',

        headers: [

          {

            key: 'Access-Control-Allow-Origin',

            value: '*',

          },

          {

            key: 'Access-Control-Allow-Methods',

            value: 'GET, OPTIONS',

          },

          {

            key: 'Access-Control-Allow-Headers',

            value: '*',

          },

        ],

      },

    ]

  },

}

export default nextConfig