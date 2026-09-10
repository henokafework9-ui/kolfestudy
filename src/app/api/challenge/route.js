import { NextResponse } from 'next/server';
import { saveChallengeAttempt } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();

    const basePayload = {
      student_name: body.student_name || 'Anonymous Student',
      student_class: body.student_class || 'Not provided',
      score: Number(body.score || 0),
      total_questions: Number(body.total_questions || 10),
      answers: body.answers || {},
      status: body.status || 'submitted',
      time_used_seconds: Number(body.time_used_seconds || 0),
      submitted_at: body.submitted_at || new Date().toISOString(),
    };

    const paymentPayload = {
      ...basePayload,
      transaction_number: body.transaction_number || '',
      telebirr_number: body.telebirr_number || '',
      payment_amount_etb: Number(body.payment_amount_etb || 0),
    };

    try {
      const savedAttempt = await saveChallengeAttempt(paymentPayload);
      return NextResponse.json({ success: true, data: savedAttempt }, { status: 201 });
    } catch (error) {
      const errorMessage = error?.message || '';
      const missingColumns = ['payment_amount_etb', 'transaction_number', 'telebirr_number'];
      const hasMissingColumn = missingColumns.some((column) => errorMessage.includes(column));

      if (!hasMissingColumn) {
        throw error;
      }

      const fallbackSavedAttempt = await saveChallengeAttempt(basePayload);
      return NextResponse.json(
        {
          success: true,
          data: fallbackSavedAttempt,
          warning: 'Payment columns are not available in the current Supabase schema yet.',
        },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to save challenge attempt to Supabase' }, { status: 500 });
  }
}
