import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const where: any = {}
    if (category) where.category = category

    const checklists = await prisma.safetyChecklist.findMany({
      where,
      orderBy: { title: 'asc' },
    })

    return NextResponse.json({ checklists })
  } catch (error) {
    console.error('Error fetching checklists:', error)
    return NextResponse.json(
      { error: 'Failed to fetch checklists' },
      { status: 500 }
    )
  }
}