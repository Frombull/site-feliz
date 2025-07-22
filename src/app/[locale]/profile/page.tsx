'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { User, Mail, Camera, Save, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const t = useTranslations('Profile');
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (session) {
      setName(session.user?.name || '');
      setPreview(session.user?.image || '/default-profile-picture.png');
      setImageError(false);
    }
  }, [session]);

  if (!session) {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
            <Loader2 className="animate-spin text-blue-500" size={48} />
        </div>
    );
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', name);
    if (image) {
      formData.append('image', image);
    }
    
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const updatedUser = await response.json();
        await update({
          name: updatedUser.name,
          image: updatedUser.image,
        });
        router.refresh(); 
      } else {
        console.error('Failed to update profile');
        // Adicionar um estado de erro para o usuário
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      // Adicionar um estado de erro para o usuário
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-lg overflow-hidden transition-shadow duration-300">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">{t('title')}</h1>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Image
                    src={imageError ? '/default-profile-picture.png' : preview || '/default-profile-picture.png'}
                    onError={() => setImageError(true)}
                    alt="Profile preview"
                    width={128}
                    height={128}
                    className="rounded-full object-cover border-4 border-gray-200 dark:border-gray-700 shadow-md"
                  />
                  <label htmlFor="image" className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors">
                    <Camera size={20} className="text-white" />
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-semibold text-gray-800 dark:text-white">{session.user?.name}</p>
                    <p className="text-md text-gray-500 dark:text-gray-400">{session.user?.email}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-gray-400">
                        <User size={16} />
                    </div>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('name')}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                    <Loader2 size={20} className="animate-spin" />
                ) : (
                    <Save size={20} className="mr-2" />
                )}
                <span className="ml-2">{isSubmitting ? t('saving') : t('save')}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 