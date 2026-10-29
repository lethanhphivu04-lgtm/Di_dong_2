import '@/global.css';

export const Colors = {
  light: {
    text: '#111115',
    background: '#F8F9FA',
    backgroundElement: '#EEEEF2',
    backgroundSelected: '#E2E2EA',
    textSecondary: '#6C6C7A',
    primary: '#E50914',
    tint: '#E50914',
    card: '#FFFFFF',
    border: '#E5E5EB',
    gold: '#F5A623',
    success: '#34C759',
  },
  dark: {
    text: '#FFFFFF',
    background: '#0B0B0E',
    backgroundElement: '#18181E',
    backgroundSelected: '#25252E',
    textSecondary: '#9A9AA6',
    primary: '#FF2A38',
    tint: '#FF2A38',
    card: '#16161C',
    border: '#282832',
    gold: '#FFD700',
    success: '#30D158',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;
export const Spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };
