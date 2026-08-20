import React from 'react';
import { ProfilePhotoFrame } from './ProfilePhotoFrame';

interface MotionProfilePhotoProps {
  variant?: 'hero' | 'about' | 'compact';
  className?: string;
  showBadges?: boolean;
}

export const MotionProfilePhoto: React.FC<MotionProfilePhotoProps> = (props) => {
  return <ProfilePhotoFrame {...props} />;
};

