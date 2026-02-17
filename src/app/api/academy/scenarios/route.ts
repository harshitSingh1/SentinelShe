import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const situation = searchParams.get('situation')

    const where: any = {}
    if (situation) where.situation = situation

    const scenarios = await prisma.scenario.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ scenarios })
  } catch (error) {
    console.error('Error fetching scenarios:', error)
    return NextResponse.json(
      { error: 'Failed to fetch scenarios' },
      { status: 500 }
    )
  }
}