import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/auth-context';

export default function SecurityScreen() {
  const { user, isBiometricsSupported, setBiometricEnabled } = useAuth();
  const [pinLock, setPinLock] = useState(false);

  const handleToggleBio = async (val: boolean) => {
    if (!isBiometricsSupported) {
      Alert.alert('Không hỗ trợ', 'Thiết bị của bạn chưa cài đặt hoặc không hỗ trợ sinh trắc học.');
      return;
    }
    await setBiometricEnabled(val);
  };

  const handleLogoutDevice = (deviceName: string) => {
    Alert.alert('Đăng xuất thiết bị', `Bạn có chắc muốn đăng xuất phiên khỏi "${deviceName}"?`, [
      { text: 'Hủy' },
      { text: 'Đăng xuất', style: 'destructive', onPress: () => Alert.alert('Đã đăng xuất', `Đã hủy phiên của ${deviceName}`) },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
      {/* Sinh trắc học & Khóa */}
      <Text style={styles.sectionTitle}>XÁC THỰC & BẢO MẬT TRUY CẬP</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="finger-print" size={22} color="#FF2A38" />
            <View>
              <Text style={styles.rowTitle}>Mở khóa Vân tay / Face ID</Text>
              <Text style={styles.rowSubtitle}>Đăng nhập nhanh không cần nhập mật khẩu</Text>
            </View>
          </View>
          <Switch
            value={user.biometric_enabled}
            onValueChange={handleToggleBio}
            trackColor={{ false: '#333', true: '#FF2A38' }}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="keypad" size={22} color="#4A90E2" />
            <View>
              <Text style={styles.rowTitle}>Khóa hồ sơ bằng mã PIN</Text>
              <Text style={styles.rowSubtitle}>Yêu cầu mã 4 số khi chuyển hồ sơ người lớn</Text>
            </View>
          </View>
          <Switch
            value={pinLock}
            onValueChange={setPinLock}
            trackColor={{ false: '#333', true: '#FF2A38' }}
          />
        </View>
      </View>

      {/* Mật khẩu */}
      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>TÀI KHOẢN</Text>
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.clickableRow}
          onPress={() => Alert.alert('Đổi mật khẩu', 'Vui lòng kiểm tra email để nhận đường dẫn đặt lại mật khẩu.')}>
          <View style={styles.rowLeft}>
            <Ionicons name="lock-closed" size={20} color="#FFD700" />
            <Text style={styles.rowTitle}>Đổi mật khẩu đăng nhập</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Thiết bị đăng nhập */}
      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>THIẾT BỊ ĐÃ ĐĂNG NHẬP (3)</Text>
      <View style={styles.card}>
        <View style={styles.deviceRow}>
          <Ionicons name="phone-portrait-outline" size={24} color="#30D158" />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={styles.deviceName}>Thiết bị này (Android/iOS)</Text>
              <View style={styles.currentBadge}><Text style={styles.currentText}>Hiện tại</Text></View>
            </View>
            <Text style={styles.deviceMeta}>TP. Hồ Chí Minh · Hoạt động vừa xong</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.deviceRow}>
          <Ionicons name="tv-outline" size={24} color="#888" />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.deviceName}>Sony Android TV 55 Inch</Text>
            <Text style={styles.deviceMeta}>Hà Nội · Hoạt động 2 ngày trước</Text>
          </View>
          <TouchableOpacity onPress={() => handleLogoutDevice('Sony Android TV')}>
            <Text style={styles.logoutBtnText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.deviceRow}>
          <Ionicons name="laptop-outline" size={24} color="#888" />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.deviceName}>Chrome trên Windows 11</Text>
            <Text style={styles.deviceMeta}>Đà Nẵng · Hoạt động 1 tuần trước</Text>
          </View>
          <TouchableOpacity onPress={() => handleLogoutDevice('Chrome trên Windows')}>
            <Text style={styles.logoutBtnText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0E' },
  sectionTitle: { color: '#777', fontSize: 12, fontWeight: '700', letterSpacing: 0.5, marginBottom: 8, marginLeft: 4 },
  card: { backgroundColor: '#16161E', borderRadius: 14, borderWidth: 1, borderColor: '#262632', overflow: 'hidden' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  rowTitle: { color: '#FFF', fontSize: 15, fontWeight: '600' },
  rowSubtitle: { color: '#888', fontSize: 12, marginTop: 2 },
  divider: { height: 1, backgroundColor: '#20202A', marginHorizontal: 16 },
  clickableRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  deviceRow: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  deviceName: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  deviceMeta: { color: '#777', fontSize: 12, marginTop: 2 },
  currentBadge: { backgroundColor: 'rgba(48, 209, 88, 0.2)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  currentText: { color: '#30D158', fontSize: 10, fontWeight: '700' },
  logoutBtnText: { color: '#FF453A', fontSize: 13, fontWeight: '600' },
});

