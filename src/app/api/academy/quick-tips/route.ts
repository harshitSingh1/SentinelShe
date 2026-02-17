import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'

// GET /api/academy/quick-tips - Get all quick tips
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const situation = searchParams.get('situation')
    const featured = searchParams.get('featured')

    const where: any = {}
    
    if (category) where.category = category
    if (situation) where.forSituation = situation
    if (featured === 'true') where.isFeatured = true

    const tips = await prisma.quickTip.findMany({
      where,
      orderBy: [
        { isFeatured: 'desc' },
        { order: 'asc' }
      ],
    })

    return NextResponse.json({ tips })
  } catch (error) {
    console.error('Error fetching quick tips:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tips' },
      { status: 500 }
    )
  }
}

// POST /api/academy/quick-tips - Create a new tip (admin only)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const tip = await prisma.quickTip.create({
      data: {
        title: body.title,
        content: body.content,
        category: body.category,
        icon: body.icon,
        readTime: body.readTime || 30,
        forSituation: body.forSituation,
        isFeatured: body.isFeatured || false,
        order: body.order || 0,
      },
    })

    return NextResponse.json({ tip }, { status: 201 })
  } catch (error) {
    console.error('Error creating tip:', error)
    return NextResponse.json(
      { error: 'Failed to create tip' },
      { status: 500 }
    )
  }
}