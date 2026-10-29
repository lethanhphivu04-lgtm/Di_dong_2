import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/auth-context';

export default function LibraryTabScreen() {
  const { user } = useAuth();

  const libraryItems = [
    {
      id: 'history',
      title: 'Lịch sử xem',
      subtitle: `${user.history.length} video đã xem gần đây`,
      icon: 'time-outline',
      color: '#4A90E2',
      route: '/library/history',
    },
    {
      id: 'favorites',
      title: 'Xem sau & Yêu thích',
      subtitle: `${user.saved_ids.length} video đã lưu`,
      icon: 'bookmark-outline',
      color: '#FF2A38',
      route: '/library/favorites',
    },
    {
      id: 'playlists',
      title: 'Playlist của tôi',
      subtitle: '3 danh sách phát tự tạo',
      icon: 'list-outline',
      color: '#30D158',
      route: '/library/playlists',
    },
    {
      id: 'downloads',
      title: 'Tải về xem Offline (VIP)',
      subtitle: user.is_vip ? '2 video đã tải sẵn' : 'Nâng cấp VIP để mở khóa',
      icon: 'download-outline',
      color: '#FFD700',
      route: '/library/downloads',
      isVip: true,
    },
    {
      id: 'rewards',
      title: 'Điểm thưởng & Chuỗi xem',
      subtitle: `${user.points} điểm · Chuỗi ${user.streak} ngày liên tiếp 🔥`,
      icon: 'gift-outline',
      color: '#FF6B00',
      route: '/library/rewards',
      badge: 'Đổi ngày VIP',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thư Viện Của Tôi</Text>
        <Text style={styles.headerSubtitle}>Quản lý video, lịch sử và điểm thưởng cá nhân</Text>
      </View>

      <View style={styles.menuList}>
        {libraryItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => router.push(item.route as any)}>
            <View style={[styles.iconWrap, { backgroundColor: item.color + '22' }]}>
              <Ionicons name={item.icon as any} size={22} color={item.color} />
            </View>

            <View style={styles.textWrap}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                {item.isVip && !user.is_vip && (
                  <View style={styles.vipTag}><Text style={styles.vipTagText}>VIP</Text></View>
                )}
                {item.badge && (
                  <View style={styles.hotTag}><Text style={styles.hotTagText}>{item.badge}</Text></View>
                )}
              </View>
              <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
            </View>

            <Ionicons name="chevron-forward" size={18} color="#555" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0E' },
  header: { paddingTop: 48, paddingHorizontal: 16, paddingBottom: 16, borderBottomWidth: 1, borderColor: '#1F1F2A' },
  headerTitle: { color: '#FFF', fontSize: 24, fontWeight: '800' },
  headerSubtitle: { color: '#888', fontSize: 13, marginTop: 4 },
  menuList: { padding: 16, gap: 12 },
  menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#14141C', padding: 16, borderRadius: 14, gap: 14 },
  iconWrap: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  textWrap: { flex: 1 },
  itemTitle: { color: '#FFF', fontSize: 15, fontWeight: '700' },
  itemSubtitle: { color: '#777', fontSize: 12, marginTop: 4 },
  vipTag: { backgroundColor: '#FFD700', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  vipTagText: { color: '#000', fontSize: 9, fontWeight: '800' },
  hotTag: { backgroundColor: '#FF6B00', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  hotTagText: { color: '#FFF', fontSize: 9, fontWeight: '700' },
});

