import { NextResponse } from 'next/server';
import {
  getAllProfessionalAccounts,
  getAllProfessionalSubscriptions,
  approveProfessionalStudent,
  revokeProfessionalStudent,
} from '@/lib/supabase';

export async function GET() {
  try {
    const [accounts, subscriptions] = await Promise.all([
      getAllProfessionalAccounts(),
      getAllProfessionalSubscriptions(),
    ]);

    const subscriptionByEmail = {};
    for (const sub of subscriptions) {
      const email = String(sub.student_email || '').toLowerCase();
      if (!subscriptionByEmail[email]) {
        subscriptionByEmail[email] = sub;
      }
    }

    const data = accounts.map((account) => ({
      ...account,
      id: account.id.toString(),
      subscription: subscriptionByEmail[String(account.email || '').toLowerCase()] || null,
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error('Admin fetch accounts error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch professional accounts' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, accountId, email } = body || {};

    if (!accountId) {
      return NextResponse.json({ error: 'Account ID is required.' }, { status: 400 });
    }

    if (action === 'approve') {
      const result = await approveProfessionalStudent({ accountId, email });
      return NextResponse.json({
        success: true,
        message: 'Account approved successfully.',
        ...result,
      });
    }

    if (action === 'revoke') {
      const account = await revokeProfessionalStudent(accountId);
      return NextResponse.json({
        success: true,
        message: 'Account access revoked.',
        account,
      });
    }

    return NextResponse.json({ error: 'Invalid action. Use approve or revoke.' }, { status: 400 });
  } catch (error) {
    console.error('Admin account action error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update account' },
      { status: 500 }
    );
  }
}
