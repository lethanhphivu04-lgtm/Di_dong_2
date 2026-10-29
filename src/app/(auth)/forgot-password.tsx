import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPasswordScreen() {
  const [step, setStep] = useState<1 | 2>(1); // 1: nhập email, 2: nhập OTP & mật khẩu mới
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSendOtp = () => {
    if (!email) {
      Alert.alert('Lỗi', 'Vui lòng nhập email để nhận mã xác thực.');
      return;
    }
    Alert.alert('Đã gửi OTP', `Mã OTP xác thực 4 số đã được gửi tới ${email}. (Mã mẫu: 1234)`);
    setStep(2);
  };

  const handleResetPassword = () => {
    if (otp !== '1234' && otp.length !== 4) {
      Alert.alert('Sai mã', 'Mã OTP không hợp lệ, vui lòng thử lại.');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      Alert.alert('Lỗi', 'Mật khẩu mới phải từ 6 ký tự trở lên.');
      return;
    }
    Alert.alert('Thành công', 'Đổi mật khẩu thành công! Vui lòng đăng nhập lại.', [
      { text: 'Đăng nhập', onPress: () => router.replace('/(auth)/login') },
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => (step === 2 ? setStep(1) : router.back())}>
        <Ionicons name="arrow-back" size={24} color="#FFF" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>{step === 1 ? 'Khôi phục mật khẩu' : 'Nhập mã xác thực OTP'}</Text>
        <Text style={styles.subtitle}>
          {step === 1
            ? 'Nhập địa chỉ email đăng ký để nhận mã OTP lấy lại mật khẩu'
            : `Nhập mã 4 chữ số gửi tới ${email} và đặt mật khẩu mới`}
        </Text>
      </View>

      {step === 1 ? (
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email của bạn</Text>
            <View style={styles.inputBox}>
              <Ionicons name="mail-outline" size={20} color="#777" />
              <TextInput
                style={styles.input}
                placeholder="example@gmail.com"
                placeholderTextColor="#555"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.btnPrimary} onPress={handleSendOtp}>
            <Text style={styles.btnPrimaryText}>Gửi mã OTP</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mã xác thực OTP (Mẫu: 1234)</Text>
            <View style={styles.inputBox}>
              <Ionicons name="keypad-outline" size={20} color="#777" />
              <TextInput
                style={[styles.input, { letterSpacing: 6, fontSize: 18 }]}
                placeholder="••••"
                placeholderTextColor="#555"
                keyboardType="number-pad"
                maxLength={4}
                value={otp}
                onChangeText={setOtp}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mật khẩu mới</Text>
            <View style={styles.inputBox}>
              <Ionicons name="lock-closed-outline" size={20} color="#777" />
              <TextInput
                style={styles.input}
                placeholder="Tối thiểu 6 ký tự"
                placeholderTextColor="#555"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.btnPrimary} onPress={handleResetPassword}>
            <Text style={styles.btnPrimaryText}>Xác nhận & Cập nhật</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0E', padding: 24 },
  backBtn: { marginTop: 24, width: 40, height: 40, justifyContent: 'center' },
  header: { marginTop: 16 },
  title: { fontSize: 26, fontWeight: '800', color: '#FFF' },
  subtitle: { fontSize: 14, color: '#888', marginTop: 8, lineHeight: 20 },
  form: { marginTop: 32, gap: 18 },
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
  btnPrimary: {
    backgroundColor: '#FF2A38',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  btnPrimaryText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});

