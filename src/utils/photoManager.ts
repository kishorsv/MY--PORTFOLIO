import { useState, useEffect } from 'react';
import { profileData } from '../data/profile';

const STORAGE_KEY = 'portfolio_custom_photo';
const PHOTO_EVENT = 'portfolio_photo_changed';

export function getStoredProfilePhoto(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved.trim()) {
      return saved.trim();
    }
  } catch {
    // ignore
  }
  return profileData.photoUrl || '/kishor-portrait.svg';
}

export function getStoredAvatarPhoto(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved.trim()) {
      return saved.trim();
    }
  } catch {
    // ignore
  }
  return profileData.avatarUrl || '/kishor-avatar.svg';
}

export function saveProfilePhoto(newPhotoUrl: string) {
  try {
    if (newPhotoUrl) {
      localStorage.setItem(STORAGE_KEY, newPhotoUrl);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    window.dispatchEvent(new CustomEvent(PHOTO_EVENT, { detail: newPhotoUrl }));
  } catch {
    // ignore
  }
}

export function resetProfilePhoto() {
  saveProfilePhoto('');
}

export function useProfilePhoto() {
  const [photo, setPhoto] = useState<string>(getStoredProfilePhoto);
  const [avatar, setAvatar] = useState<string>(getStoredAvatarPhoto);

  useEffect(() => {
    const handleUpdate = () => {
      setPhoto(getStoredProfilePhoto());
      setAvatar(getStoredAvatarPhoto());
    };

    window.addEventListener(PHOTO_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(PHOTO_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return {
    photoUrl: photo,
    avatarUrl: avatar,
    savePhoto: saveProfilePhoto,
    resetPhoto: resetProfilePhoto,
  };
}
