import React, { createContext, useContext, useEffect, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  is_vip: boolean;
  vip_expires_at?: string | null;
  points: number;
  streak: number;
  saved_ids: string[];
  history: { videoId: string; progress: number; watchedAt: string }[];
  biometric_enabled: boolean;
}

interface AuthContextType {
  user: UserProfile;
  isBiometricsSupported: boolean;
  login: (email: string) => Promise<void>;
  register: (email: string, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
  toggleFavorite: (videoId: string) => void;
  addToHistory: (videoId: string, progress?: number) => void;
  redeemVipWithPoints: (days: number, cost: number) => boolean;
  upgradeVip: (planName: string) => void;
  unlockWithBiometrics: () => Promise<boolean>;
  setBiometricEnabled: (enabled: boolean) => Promise<void>;
}

const DEFAULT_USER: UserProfile = {
  id: 'user_01',
  email: 'nguoidung@playbox.vn',
  full_name: 'Minh Hoàng',
  avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
  is_vip: false,
  vip_expires_at: null,
  points: 520,
  streak: 5,
  saved_ids: ['v1', 'v2'],
  history: [
    { videoId: 'v1', progress: 0.65, watchedAt: 'Hôm nay' },
    { videoId: 'v3', progress: 0.9, watchedAt: 'Hôm qua' },
  ],
  biometric_enabled: true,
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
const USER_KEY = 'playbox_user_profile';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [isBiometricsSupported, setIsBiometricsSupported] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const comp = await LocalAuthentication.hasHardwareAsync();
        const enr = await LocalAuthentication.isEnrolledAsync();
        setIsBiometricsSupported(comp && enr);

        const saved = await SecureStore.getItemAsync(USER_KEY);
        if (saved) setUser(JSON.parse(saved));
      } catch (e) {
        console.warn('Lỗi load user profile:', e);
      }
    })();
  }, []);

  const saveUser = async (u: UserProfile) => {
    setUser(u);
    try {
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(u));
    } catch (e) {
      console.warn('Lỗi lưu user:', e);
    }
  };

  const login = async (email: string) => {
    await saveUser({ ...user, email, full_name: email.split('@')[0] });
  };

  const register = async (email: string, full_name: string) => {
    await saveUser({ ...user, email, full_name });
  };

  const logout = async () => {
    await saveUser(DEFAULT_USER);
  };

  const toggleFavorite = (id: string) => {
    const exists = user.saved_ids.includes(id);
    const updated = exists ? user.saved_ids.filter((x) => x !== id) : [...user.saved_ids, id];
    saveUser({ ...user, saved_ids: updated });
  };

  const addToHistory = (videoId: string, progress = 0.1) => {
    const filtered = user.history.filter((h) => h.videoId !== videoId);
    saveUser({
      ...user,
      history: [{ videoId, progress, watchedAt: 'Vừa xong' }, ...filtered],
    });
  };

  const redeemVipWithPoints = (days: number, cost: number): boolean => {
    if (user.points < cost) return false;
    const exp = new Date();
    exp.setDate(exp.getDate() + days);
    saveUser({
      ...user,
      points: user.points - cost,
      is_vip: true,
      vip_expires_at: exp.toISOString(),
    });
    return true;
  };

  const upgradeVip = (planName: string) => {
    const exp = new Date();
    exp.setMonth(exp.getMonth() + (planName.includes('Năm') ? 12 : 1));
    saveUser({ ...user, is_vip: true, vip_expires_at: exp.toISOString() });
  };

  const unlockWithBiometrics = async (): Promise<boolean> => {
    if (!isBiometricsSupported) return false;
    try {
      const res = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Xác thực sinh trắc học để mở khóa PlayBox',
        cancelLabel: 'Dùng mã PIN',
      });
      return res.success;
    } catch {
      return false;
    }
  };

  const setBiometricEnabled = async (enabled: boolean) => {
    if (enabled && !(await unlockWithBiometrics())) return;
    saveUser({ ...user, biometric_enabled: enabled });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isBiometricsSupported,
        login,
        register,
        logout,
        toggleFavorite,
        addToHistory,
        redeemVipWithPoints,
        upgradeVip,
        unlockWithBiometrics,
        setBiometricEnabled,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
