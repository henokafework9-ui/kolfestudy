import { NextResponse } from 'next/server';
import { getExams, addExam, updateExam, deleteExam } from '@/lib/supabase';

export async function GET() {
  try {
    const data = await getExams();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to fetch exams from Supabase' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newItem = await addExam(body);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to add exam to Supabase' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    if (!id) {
      return NextResponse.json({ error: 'ID is required to update an exam' }, { status: 400 });
    }
    const updatedItem = await updateExam(id, data);
    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to update exam in Supabase' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required to delete an exam' }, { status: 400 });
    }
    await deleteExam(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to delete exam from Supabase' }, { status: 500 });
  }
}
