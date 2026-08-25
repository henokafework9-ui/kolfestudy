import { NextResponse } from 'next/server';
import { getMessages, addMessage, deleteMessage } from '@/lib/supabase';

export async function GET() {
  try {
    const data = await getMessages();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to fetch messages from Supabase' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, grade } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    const newMessage = await addMessage({ name, email, subject, message, grade });
    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to insert message into Supabase' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required to delete a message' }, { status: 400 });
    }
    await deleteMessage(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to delete message from Supabase' }, { status: 500 });
  }
}
