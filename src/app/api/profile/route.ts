import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';

const prisma = new PrismaClient();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();
  const name = formData.get('name') as string;
  const image = formData.get('image') as File | null;

  let imageUrl: string | undefined;

  if (image) {
    const filePath = `Profile Pictures/${session.user.id}-${image.name}`;
    const { data, error } = await supabase.storage
      .from('site-feliz-bucket')
      .upload(filePath, image, {
        upsert: true,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }

    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from('site-feliz-bucket')
      .createSignedUrl(filePath, 60 * 60 * 24 * 365 * 10); // 10 years

    if (signedUrlError) {
      console.error('Supabase signed URL error:', signedUrlError);
      return NextResponse.json({ error: 'Failed to create signed URL' }, { status: 500 });
    }
      
    imageUrl = signedUrlData.signedUrl;
  }

  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name: name,
      ...(imageUrl && { image: imageUrl }),
    },
  });

  return NextResponse.json(updatedUser);
} 