import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const difficulty = searchParams.get('difficulty')

    const where: any = {}
    if (difficulty) where.difficulty = difficulty

    const moves = await prisma.protectiveMove.findMany({
      where,
      orderBy: { difficulty: 'asc' },
    })

    return NextResponse.json({ moves })
  } catch (error) {
    console.error('Error fetching protective moves:', error)
    return NextResponse.json(
      { error: 'Failed to fetch moves' },
      { status: 500 }
    )
  }
}