import { NextResponse } from 'next/server';
import {
  createProfessionalStudentAccount,
  createMonthlySubscription,
  getProfessionalStudentByEmail,
  getLatestProfessionalSubscription,
} from '@/lib/supabase';

function hashPassword(value) {
  const str = String(value || '');
  return Array.from(str).reduce((acc, char) => {
    return acc + char.charCodeAt(0).toString(16).padStart(2, '0');
  }, '');
}

function isSubscriptionActive(subscription) {
  if (!subscription) return false;
  const status = String(subscription.status || '').toLowerCase();
  if (status !== 'paid' && status !== 'approved') return false;
  if (subscription.expires_at) {
    const expiry = new Date(subscription.expires_at);
    if (Number.isNaN(expiry.getTime()) || expiry.getTime() < Date.now()) return false;
  }
  return true;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action = 'create', ...payload } = body || {};

    if (action === 'login') {
      const email = String(payload.email || '').trim().toLowerCase();
      const password = String(payload.password || '');

      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
      }

      const account = await getProfessionalStudentByEmail(email);
      if (!account) {
        return NextResponse.json({ error: 'No professional account was found for this email.' }, { status: 401 });
      }

      if (!account.is_active) {
        return NextResponse.json({
          success: true,
          accessActive: false,
          account,
          subscription: null,
          message: 'Your professional account is pending approval. Please wait up to 5 hours or call 0947257165.',
        }, { status: 200 });
      }

      const expectedHash = hashPassword(password);
      if (account.password_hash !== expectedHash) {
        return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
      }

      const subscription = await getLatestProfessionalSubscription(email);
      const accessActive = isSubscriptionActive(subscription);

      if (!accessActive) {
        return NextResponse.json({
          success: true,
          accessActive: false,
          account,
          subscription: subscription || null,
          message: 'Your professional account is pending approval. Please wait up to 5 hours or call 0947257165.',
        }, { status: 200 });
      }

      return NextResponse.json({
        success: true,
        accessActive: true,
        account,
        subscription,
        message: 'Login successful. Professional access is active.',
      }, { status: 200 });
    }

    const {
      fullName,
      email,
      phone,
      schoolName,
      password,
      transactionNumber,
      amount = 300,
    } = payload;

    if (!fullName || !email || !password || !transactionNumber) {
      return NextResponse.json({ error: 'Full name, email, password, and transaction number are required.' }, { status: 400 });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const existingAccount = await getProfessionalStudentByEmail(normalizedEmail);
    if (existingAccount) {
      return NextResponse.json({ error: 'An account with this email already exists. Please log in instead.' }, { status: 409 });
    }

    const passwordHash = hashPassword(password);

    const account = await createProfessionalStudentAccount({
      fullName,
      email: normalizedEmail,
      phone,
      passwordHash,
      schoolName,
      accountType: 'professional',
    });

    const subscription = await createMonthlySubscription({
      studentEmail: normalizedEmail,
      accountId: account?.id,
      plan: 'Professional Monthly',
      amount: Number(amount) || 300,
      currency: 'ETB',
      transactionNumber,
      paymentMethod: 'manual',
      status: 'pending',
    });

    return NextResponse.json({
      success: true,
      account,
      subscription,
      message: 'Professional account and monthly subscription saved to Supabase.',
    }, { status: 201 });
  } catch (error) {
    console.error('Account creation error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create professional account.' }, { status: 500 });
  }
}
