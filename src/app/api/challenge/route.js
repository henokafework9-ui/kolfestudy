import { NextResponse } from 'next/server';
import { saveChallengeAttempt } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();

    const payload = {
      student_name: body.student_name || 'Anonymous Student',
      student_class: body.student_class || 'Not provided',
      score: Number(body.score || 0),
      total_questions: Number(body.total_questions || 10),
      answers: body.answers || {},
      status: body.status || 'submitted',
      time_used_seconds: Number(body.time_used_seconds || 0),
      submitted_at: body.submitted_at || new Date().toISOString(),
    };

    const savedAttempt = await saveChallengeAttempt(payload);
    return NextResponse.json({ success: true, data: savedAttempt }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to save challenge attempt to Supabase' }, { status: 500 });
  }
}
