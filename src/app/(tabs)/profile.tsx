import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/context/auth-context';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.full_name);

  const handleSaveProfile = () => {
    setIsEditing(false);
    Alert.alert('Thành công', 'Đã cập nhật thông tin hồ sơ!');
  };

  const handleLogout = () => {
    Alert.alert('Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất?', [
      { text: 'Hủy' },
      { text: 'Đăng xuất', style: 'destructive', onPress: () => {
        logout();
        router.replace('/(auth)/login');
      }},
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarWrap}>
          <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
          <TouchableOpacity
            style={styles.cameraIcon}
            onPress={() => Alert.alert('Đổi Avatar', 'Chọn ảnh từ thư viện thiết bị...')}>
            <Ionicons name="camera" size={14} color="#FFF" />
          </TouchableOpacity>
        </View>

        {isEditing ? (
          <View style={styles.editRow}>
            <TextInput
              style={styles.editInput}
              value={name}
              onChangeText={setName}
              autoFocus
            />
            <TouchableOpacity style={styles.saveBtn} onPress={handleSaveProfile}>
              <Text style={styles.saveBtnText}>Lưu</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={styles.name}>{name}</Text>
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Ionicons name="pencil" size={14} color="#888" />
              </TouchableOpacity>
            </View>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        )}
      </View>

      {/* VIP Status Card */}
      <TouchableOpacity
        style={styles.vipCard}
        activeOpacity={0.9}
        onPress={() => router.push('/vip/checkout')}>
        <LinearGradient
          colors={user.is_vip ? ['#B8860B', '#FFD700'] : ['#8B0000', '#FF2A38']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.vipGrad}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Ionicons name="diamond" size={18} color="#FFF" />
              <Text style={styles.vipTitle}>{user.is_vip ? 'TÀI KHOẢN VIP ĐANG HOẠT ĐỘNG' : 'NÂNG CẤP LÊN PLAYBOX VIP'}</Text>
            </View>
            <Text style={styles.vipSub}>
              {user.is_vip ? 'Hạn dùng: 30 ngày tới · Xem 4K không quảng cáo' : 'Chỉ từ 59.000đ/tháng · Tải offline không giới hạn'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#FFF" />
        </LinearGradient>
      </TouchableOpacity>

      {/* Thống kê thời gian xem (Watch Stats) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 THỐNG KÊ XEM TRONG TUẦN</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>12.5h</Text>
            <Text style={styles.statLabel}>Thời gian xem</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>48</Text>
            <Text style={styles.statLabel}>Video đã xem</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>Anime</Text>
            <Text style={styles.statLabel}>Thể loại mê nhất</Text>
          </View>
        </View>
      </View>

      {/* Menu Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CÀI ĐẶT & QUẢN LÝ</Text>
        <View style={styles.menuCard}>
          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => router.push('/(auth)/security')}>
            <View style={styles.rowLeft}>
              <Ionicons name="shield-checkmark-outline" size={20} color="#4A90E2" />
              <Text style={styles.rowText}>Bảo mật & Sinh trắc học</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#666" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => router.push('/vip/checkout')}>
            <View style={styles.rowLeft}>
              <Ionicons name="card-outline" size={20} color="#FFD700" />
              <Text style={styles.rowText}>Gói VIP & Lịch sử giao dịch</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#666" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => router.push('/notifications')}>
            <View style={styles.rowLeft}>
              <Ionicons name="notifications-outline" size={20} color="#30D158" />
              <Text style={styles.rowText}>Cài đặt thông báo</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#666" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => router.push('/(auth)/onboarding')}>
            <View style={styles.rowLeft}>
              <Ionicons name="options-outline" size={20} color="#FF6B00" />
              <Text style={styles.rowText}>Sở thích & Chủ đề gợi ý</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={18} color="#FF453A" />
        <Text style={styles.logoutText}>Đăng xuất tài khoản</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0E' },
  header: { alignItems: 'center', paddingTop: 48, paddingBottom: 20 },
  avatarWrap: { position: 'relative' },
  avatar: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: '#262636' },
  cameraIcon: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#FF2A38', width: 26, height: 26, borderRadius: 13, justifyContent: 'center', alignItems: 'center' },
  name: { color: '#FFF', fontSize: 18, fontWeight: '800', marginTop: 10 },
  email: { color: '#777', fontSize: 13, marginTop: 2 },
  editRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8 },
  editInput: { backgroundColor: '#181822', color: '#FFF', fontSize: 15, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: '#333' },
  saveBtn: { backgroundColor: '#FF2A38', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  saveBtnText: { color: '#FFF', fontSize: 12, fontWeight: '700' },
  vipCard: { marginHorizontal: 16, borderRadius: 14, overflow: 'hidden' },
  vipGrad: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  vipTitle: { color: '#FFF', fontSize: 14, fontWeight: '800' },
  vipSub: { color: '#EEE', fontSize: 11, marginTop: 3 },
  section: { marginTop: 24, paddingHorizontal: 16, gap: 8 },
  sectionTitle: { color: '#666', fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  statsRow: { flexDirection: 'row', gap: 10 },
  statBox: { flex: 1, backgroundColor: '#14141C', padding: 14, borderRadius: 12, alignItems: 'center' },
  statNumber: { color: '#FFF', fontSize: 18, fontWeight: '800' },
  statLabel: { color: '#777', fontSize: 11, marginTop: 4 },
  menuCard: { backgroundColor: '#14141C', borderRadius: 14, overflow: 'hidden' },
  menuRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rowText: { color: '#DDD', fontSize: 14, fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#1F1F2A', marginHorizontal: 16 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginHorizontal: 16, marginTop: 28, padding: 14, backgroundColor: '#1A1112', borderWidth: 1, borderColor: '#3A181A', borderRadius: 12 },
  logoutText: { color: '#FF453A', fontSize: 14, fontWeight: '700' },
});

