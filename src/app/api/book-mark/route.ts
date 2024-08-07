import { createClient } from '@/supabase/supabaseServerClient';
import { NextRequest, NextResponse } from 'next/server';
import { URL } from 'url';

export const GET = async (request: NextRequest) => {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  try {
    const { data, error } = await supabase
      .from('BookMark')
      .select()
      .eq('userId', userId)
      .order('createdAt', { ascending: true });

    if (error)
      return NextResponse.json({ message: 'Failed to fetch supabase data', error, status: false, statusCode: 500 });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch data', error, status: false, statusCode: 500 });
  }
};

export const DELETE = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const bookMarkId = searchParams.get('bookMarkId');
  const supabase = createClient();

  try {
    const { error } = await supabase.from('BookMark').delete().eq('bookMarkId', bookMarkId);

    if (error)
      return NextResponse.json({ message: 'Failed to delete supabase data', error, status: false, statusCode: 500 });
    return NextResponse.json({ message: 'Success to delete data', error, status: false, statusCode: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete data', error, status: false, statusCode: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  const bookMark = await request.json();
  const supabase = createClient();

  try {
    const { error } = await supabase.from('BookMark').insert(bookMark);

    if (error)
      return NextResponse.json({ message: 'Failed to insert supabase data', error, status: false, statusCode: 500 });
    return NextResponse.json({ message: 'Success to insert data', error, status: false, statusCode: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to post data', error, status: false, statusCode: 500 });
  }
};
