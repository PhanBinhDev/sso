import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const logDir = path.join(process.cwd(), 'logs')
    const logFile = path.join(logDir, 'supabase-oauth.log')
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir)
    const logEntry = `[${new Date().toISOString()}] ${JSON.stringify(body)}\n`
    fs.appendFileSync(logFile, logEntry)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: error?.toString() })
  }
}
