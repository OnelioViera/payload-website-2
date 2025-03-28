import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

import config from '@/payload.config'

export async function GET() {
  const payload = await getPayload({
    config: await config,
  })

  const { docs } = await payload.find({
    collection: 'home-page',
    limit: 1,
  })

  return NextResponse.json({ docs })
}
