import { NextResponse } from 'next/server';
import { getNews, addNews, updateNews, deleteNews } from '@/lib/supabase';

export async function GET() {
  try {
    const data = await getNews();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to fetch news from Supabase' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newItem = await addNews(body);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to add news to Supabase' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    if (!id) {
      return NextResponse.json({ error: 'ID is required to update news item' }, { status: 400 });
    }
    const updatedItem = await updateNews(id, data);
    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to update news in Supabase' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required to delete news item' }, { status: 400 });
    }
    await deleteNews(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to delete news from Supabase' }, { status: 500 });
  }
}
