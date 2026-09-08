import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iessywmmbgbwhzyrinkg.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_FW4QRajmhUxU4Lx1g5ypSg_SYnObLFe';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper to format item fields for consistent frontend usage
function formatItem(item) {
  if (!item) return null;
  const rawCat = item.category || item.type || '';
  let category = 'school';
  if (rawCat.toLowerCase() === 'national' || rawCat.toLowerCase().includes('national')) {
    category = 'national';
  } else if (item.title && item.title.toLowerCase().includes('national')) {
    category = 'national';
  }

  return {
    ...item,
    id: item.id.toString(),
    fileUrl: item.file_url || item.fileUrl || '',
    category: category,
  };
}

// ---------------- EXAMS ----------------
export async function getExams() {
  const { data, error } = await supabase
    .from('exams')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase fetch exams error:', error);
    throw error;
  }
  return (data || []).map(formatItem);
}

export async function addExam({ title, subject, date, category = 'school', fileUrl }) {
  const payload = {
    title,
    subject,
    date,
    category,
    file_url: fileUrl || ''
  };

  let { data, error } = await supabase
    .from('exams')
    .insert([payload])
    .select();

  if (error && error.code === 'PGRST204') {
    // Category column not in Supabase schema yet; fallback to title tagging
    const fallbackTitle = (category === 'national' && !title.toLowerCase().includes('national'))
      ? `${title} [National Exam]`
      : title;
    const fallbackPayload = {
      title: fallbackTitle,
      date,
      file_url: fileUrl || ''
    };
    const res = await supabase.from('exams').insert([fallbackPayload]).select();
    data = res.data;
    error = res.error;
  }

  if (error) {
    console.error('Supabase add exam error:', error);
    throw error;
  }
  return formatItem(data[0]);
}

export async function updateExam(id, { title, subject, date, category = 'school', fileUrl }) {
  const payload = {
    title,
    subject,
    date,
    category,
    file_url: fileUrl || ''
  };

  let { data, error } = await supabase
    .from('exams')
    .update(payload)
    .eq('id', id)
    .select();

  if (error && error.code === 'PGRST204') {
    const fallbackTitle = (category === 'national' && !title.toLowerCase().includes('national'))
      ? `${title} [National Exam]`
      : title.replace(/\s*\[National Exam\]/i, '');
    const fallbackPayload = {
      title: fallbackTitle,
      subject,
      date,
      file_url: fileUrl || ''
    };
    const res = await supabase.from('exams').update(fallbackPayload).eq('id', id).select();
    data = res.data;
    error = res.error;
  }

  if (error) {
    console.error('Supabase update exam error:', error);
    throw error;
  }
  return formatItem(data[0]);
}

export async function deleteExam(id) {
  const { error } = await supabase
    .from('exams')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Supabase delete exam error:', error);
    throw error;
  }
  return true;
}

// ---------------- NEWS ----------------
export async function getNews() {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase fetch news error:', error);
    throw error;
  }
  return (data || []).map(formatItem);
}

export async function addNews({ title, date, excerpt, fileUrl }) {
  const payload = {
    title,
    date,
    excerpt,
    file_url: fileUrl || ''
  };

  const { data, error } = await supabase
    .from('news')
    .insert([payload])
    .select();

  if (error) {
    console.error('Supabase add news error:', error);
    throw error;
  }
  return formatItem(data[0]);
}

export async function updateNews(id, { title, date, excerpt, fileUrl }) {
  const payload = {
    title,
    date,
    excerpt,
    file_url: fileUrl || ''
  };

  const { data, error } = await supabase
    .from('news')
    .update(payload)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Supabase update news error:', error);
    throw error;
  }
  return formatItem(data[0]);
}

export async function deleteNews(id) {
  const { error } = await supabase
    .from('news')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Supabase delete news error:', error);
    throw error;
  }
  return true;
}

// ---------------- CHALLENGE ATTEMPTS ----------------
export async function saveChallengeAttempt(payload) {
  const { data, error } = await supabase
    .from('challenge_attempts')
    .insert([payload])
    .select();

  if (error) {
    console.error('Supabase save challenge attempt error:', error);
    throw error;
  }

  return data?.[0] || null;
}

// ---------------- PROFESSIONAL STUDENT ACCOUNT + SUBSCRIPTIONS ----------------
export async function createProfessionalStudentAccount({
  fullName,
  email,
  phone,
  passwordHash,
  schoolName,
  accountType = 'professional',
}) {
  const payload = {
    full_name: fullName,
    email,
    phone: phone || '',
    password_hash: passwordHash,
    school_name: schoolName || '',
    account_type: accountType,
    is_active: false,
  };

  const { data, error } = await supabase
    .from('student_accounts')
    .insert([payload])
    .select();

  if (error) {
    console.error('Supabase create professional student account error:', error);
    throw error;
  }

  return data?.[0] || null;
}

export async function getAllProfessionalAccounts() {
  const { data, error } = await supabase
    .from('student_accounts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase fetch all professional accounts error:', error);
    throw error;
  }

  return data || [];
}

export async function getAllProfessionalSubscriptions() {
  const { data, error } = await supabase
    .from('student_subscriptions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase fetch all professional subscriptions error:', error);
    throw error;
  }

  return data || [];
}

export async function getProfessionalStudentByEmail(email) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  if (!normalizedEmail) return null;

  const { data, error } = await supabase
    .from('student_accounts')
    .select('*')
    .eq('email', normalizedEmail)
    .maybeSingle();

  if (error && error.code !== 'PGRST116') {
    console.error('Supabase fetch student by email error:', error);
    throw error;
  }

  return data || null;
}

export async function getLatestProfessionalSubscription(studentEmail) {
  const normalizedEmail = String(studentEmail || '').trim().toLowerCase();
  if (!normalizedEmail) return null;

  const { data, error } = await supabase
    .from('student_subscriptions')
    .select('*')
    .eq('student_email', normalizedEmail)
    .order('paid_at', { ascending: false })
    .limit(1);

  if (error) {
    console.error('Supabase fetch latest subscription error:', error);
    throw error;
  }

  return data?.[0] || null;
}

export async function createMonthlySubscription({
  studentEmail,
  accountId,
  plan = 'Professional Monthly',
  amount = 300,
  currency = 'ETB',
  transactionNumber,
  paymentMethod = 'manual',
  status = 'pending',
}) {
  const now = new Date();
  const expiresAt = new Date(now);
  expiresAt.setMonth(expiresAt.getMonth() + 1);

  const payload = {
    student_email: studentEmail,
    account_id: accountId,
    plan,
    amount,
    currency,
    transaction_number: transactionNumber || '',
    payment_method: paymentMethod,
    status,
    paid_at: now.toISOString(),
    expires_at: expiresAt.toISOString(),
  };

  const { data, error } = await supabase
    .from('student_subscriptions')
    .insert([payload])
    .select();

  if (error) {
    console.error('Supabase create monthly subscription error:', error);
    throw error;
  }

  return data?.[0] || null;
}

export async function approveProfessionalStudent({ accountId, email }) {
  const now = new Date();
  const expiresAt = new Date(now);
  expiresAt.setMonth(expiresAt.getMonth() + 1);

  const { data: account, error: accountError } = await supabase
    .from('student_accounts')
    .update({ is_active: true })
    .eq('id', accountId)
    .select();

  if (accountError) {
    console.error('Supabase approve professional account error:', accountError);
    throw accountError;
  }

  const { data: subscriptions, error: subscriptionError } = await supabase
    .from('student_subscriptions')
    .select('*')
    .eq('student_email', String(email || '').trim().toLowerCase())
    .order('paid_at', { ascending: false })
    .limit(1);

  if (subscriptionError) {
    console.error('Supabase fetch subscription for approval error:', subscriptionError);
    throw subscriptionError;
  }

  let subscription = null;
  if (subscriptions && subscriptions[0]) {
    const { data: updated, error: updateError } = await supabase
      .from('student_subscriptions')
      .update({
        status: 'approved',
        expires_at: expiresAt.toISOString(),
      })
      .eq('id', subscriptions[0].id)
      .select();

    if (updateError) {
      console.error('Supabase approve professional subscription error:', updateError);
      throw updateError;
    }

    subscription = updated?.[0] || subscriptions[0];
  }

  return {
    account: account?.[0] || null,
    subscription,
  };
}

// ---------------- MESSAGES (student_messages table) ----------------
export async function getMessages() {
  let { data, error } = await supabase
    .from('student_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('Supabase student_messages fetch warning:', error.message);
    const fallback = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });
    if (!fallback.error) {
      data = fallback.data;
    } else {
      return [];
    }
  }

  // If student_messages returned an empty array, also check fallback 'messages' table
  if (!data || data.length === 0) {
    const fallback = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });
    if (!fallback.error && fallback.data && fallback.data.length > 0) {
      data = fallback.data;
    }
  }

  return (data || []).map((item) => ({
    ...item,
    id: item.id ? item.id.toString() : Date.now().toString(),
  }));
}

export async function addMessage({ name, email, subject, message, grade }) {
  const payload = {
    name,
    email,
    subject: subject || 'General Inquiry',
    message,
    grade: grade || 'N/A',
  };

  // 1. Try student_messages with .select()
  let { data, error } = await supabase
    .from('student_messages')
    .insert([payload])
    .select();

  // 2. If select fails (e.g. RLS policy blocks RETURNING * / select), try without .select()
  if (error) {
    console.warn('student_messages insert with select failed, trying without select:', error.message);

    const insertOnlyRes = await supabase
      .from('student_messages')
      .insert([payload]);

    if (!insertOnlyRes.error) {
      return {
        id: Date.now().toString(),
        ...payload,
        created_at: new Date().toISOString(),
      };
    }

    // 3. Try fallback table 'messages' with select
    const fallbackSelect = await supabase
      .from('messages')
      .insert([payload])
      .select();

    if (!fallbackSelect.error && fallbackSelect.data?.[0]) {
      return {
        ...fallbackSelect.data[0],
        id: fallbackSelect.data[0].id.toString(),
      };
    }

    // 4. Try fallback table 'messages' without select
    const fallbackInsertOnly = await supabase
      .from('messages')
      .insert([payload]);

    if (!fallbackInsertOnly.error) {
      return {
        id: Date.now().toString(),
        ...payload,
        created_at: new Date().toISOString(),
      };
    }

    // If RLS policy is still strictly blocking anon writes in Supabase online dashboard
    console.error('All Supabase message insert attempts failed:', error, insertOnlyRes.error);
    throw new Error(
      error.code === '42501' || insertOnlyRes.error?.code === '42501'
        ? 'Database RLS Policy Error: Please run the updated supabase_schema.sql script in your Supabase SQL Editor to grant message permissions.'
        : error.message || 'Failed to submit contact message'
    );
  }

  if (data && data.length > 0) {
    return {
      ...data[0],
      id: data[0].id.toString(),
    };
  }

  return {
    id: Date.now().toString(),
    ...payload,
    created_at: new Date().toISOString(),
  };
}

export async function deleteMessage(id) {
  let { error } = await supabase
    .from('student_messages')
    .delete()
    .eq('id', id);

  if (error) {
    const fallback = await supabase
      .from('messages')
      .delete()
      .eq('id', id);
    if (fallback.error) {
      console.error('Supabase delete message error:', error);
      throw error;
    }
  }
  return true;
}
