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

  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!currentUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const formData = await req.formData();
  const name = formData.get('name') as string;
  const image = formData.get('image') as File | null;

  let imageUrl = currentUser.image;

  if (image) {
    // Delete old image from Supabase if it exists
    if (currentUser.image) {
      const bucketName = 'site-feliz-bucket'; // TODO: use .env var
      const pathStartIndex = currentUser.image.indexOf(bucketName + '/');
      
      if (pathStartIndex !== -1) {
        const pathWithQuery = currentUser.image.substring(pathStartIndex + bucketName.length + 1);
        const objectPath = decodeURIComponent(pathWithQuery.split('?')[0]);

        if (objectPath) {
          const { error: deleteError } = await supabase.storage
            .from(bucketName)
            .remove([objectPath]);

          if (deleteError) {
            console.error('Supabase delete error:', deleteError.message);
            // Non-fatal, continue with the stuffs
          }
        }
      }
    }

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
      image: imageUrl,
    },
  });

  return NextResponse.json(updatedUser);
} 