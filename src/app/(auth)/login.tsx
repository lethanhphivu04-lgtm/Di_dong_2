import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/auth-context';

export default function LoginScreen() {
  const { login, unlockWithBiometrics, isBiometricsSupported } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email) {
      Alert.alert('Thông báo', 'Vui lòng nhập địa chỉ email.');
      return;
    }
    await login(email);
    router.replace('/(tabs)');
  };

  const handleBioLogin = async () => {
    const success = await unlockWithBiometrics();
    if (success) {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Thất bại', 'Không thể xác thực sinh trắc học.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#FFF" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Đăng nhập</Text>
        <Text style={styles.subtitle}>Chào mừng bạn trở lại với PlayBox</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email hoặc Số điện thoại</Text>
          <View style={styles.inputBox}>
            <Ionicons name="mail-outline" size={20} color="#777" />
            <TextInput
              style={styles.input}
              placeholder="nhapemail@playbox.vn"
              placeholderTextColor="#555"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mật khẩu</Text>
          <View style={styles.inputBox}>
            <Ionicons name="lock-closed-outline" size={20} color="#777" />
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#555"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#777" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.forgotBtn} onPress={() => router.push('/(auth)/forgot-password')}>
          <Text style={styles.forgotText}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin}>
          <Text style={styles.btnPrimaryText}>Đăng nhập ngay</Text>
        </TouchableOpacity>

        {isBiometricsSupported && (
          <TouchableOpacity style={styles.btnBio} onPress={handleBioLogin}>
            <Ionicons name="finger-print-outline" size={22} color="#FF2A38" />
            <Text style={styles.btnBioText}>Đăng nhập nhanh bằng Vân tay / Face ID</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Chưa có tài khoản? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
          <Text style={styles.registerLink}>Đăng ký mới</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0E', padding: 24, justifyContent: 'space-between' },
  backBtn: { marginTop: 24, width: 40, height: 40, justifyContent: 'center' },
  header: { marginTop: 16 },
  title: { fontSize: 30, fontWeight: '800', color: '#FFF' },
  subtitle: { fontSize: 14, color: '#888', marginTop: 6 },
  form: { marginTop: 32, gap: 16 },
  inputGroup: { gap: 6 },
  label: { color: '#BBB', fontSize: 13, fontWeight: '600' },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16161E',
    borderWidth: 1,
    borderColor: '#262632',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
    gap: 10,
  },
  input: { flex: 1, color: '#FFF', fontSize: 15 },
  forgotBtn: { alignSelf: 'flex-end', marginTop: -4 },
  forgotText: { color: '#FF2A38', fontSize: 13, fontWeight: '600' },
  btnPrimary: {
    backgroundColor: '#FF2A38',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  btnPrimaryText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  btnBio: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#303040',
    borderRadius: 12,
    height: 48,
    marginTop: 4,
  },
  btnBioText: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center', paddingBottom: 16 },
  footerText: { color: '#777', fontSize: 14 },
  registerLink: { color: '#FF2A38', fontSize: 14, fontWeight: '700' },
});

