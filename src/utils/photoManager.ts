import { useState, useEffect } from 'react';
import { profileData } from '../data/profile';

const PHOTO_STORAGE_KEY = 'kishor_exact_profile_photo_v3';
const EVENT_NAME = 'kishor-photo-synced';

/**
 * Returns the exact profile portrait photo URL
 */
export function getStoredProfilePhoto(): string {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(PHOTO_STORAGE_KEY);
    if (saved && saved.length > 50) {
      return saved;
    }
  }
  return profileData.photoUrl || '/images/profile-photo.jpg';
}

/**
 * Returns the avatar photo URL
 */
export function getStoredAvatarPhoto(): string {
  return getStoredProfilePhoto();
}

/**
 * Uploads/persists the exact uploaded photo asset to server and browser storage
 */
export async function savePermanentPhoto(imageBase64: string): Promise<boolean> {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(PHOTO_STORAGE_KEY, imageBase64);
      window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: imageBase64 }));
    }

    // Also persist directly to server disk at /public/images/profile-photo.jpg
    fetch('/api/upload-photo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64 }),
    }).catch((err) => console.warn('Server photo sync background notice:', err));

    return true;
  } catch (err) {
    console.error('Failed to save photo:', err);
    return false;
  }
}

/**
 * Hook to reactively consume the active profile photo
 */
export function useProfilePhoto() {
  const [photoUrl, setPhotoUrl] = useState<string>(() => getStoredProfilePhoto());

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setPhotoUrl(customEvent.detail);
      } else {
        setPhotoUrl(getStoredProfilePhoto());
      }
    };

    window.addEventListener(EVENT_NAME, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return {
    photoUrl,
    avatarUrl: photoUrl,
    setPermanentPhoto: savePermanentPhoto,
  };
}

