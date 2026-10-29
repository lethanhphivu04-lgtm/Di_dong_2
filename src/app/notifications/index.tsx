import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface NotificationItem {
  id: string;
  type: 'video' | 'reward' | 'vip' | 'system';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  route?: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    type: 'video',
    title: 'Tập mới đã phát sóng! 🎬',
    message: 'Kênh "Khoai Đi Dạo" vừa ra mắt tập 2 chuyến Xuyên Việt: Vượt Đèo Ngang.',
    time: '30 phút trước',
    isRead: false,
    route: '/detail/v1',
  },
  {
    id: 'n2',
    type: 'reward',
    title: 'Duy trì chuỗi ngày xem 🔥',
    message: 'Bạn đã đạt chuỗi 5 ngày liên tiếp! Xem thêm 15 phút hôm nay để nhận +50 điểm.',
    time: '3 giờ trước',
    isRead: false,
    route: '/library/rewards',
  },
  {
    id: 'n3',
    type: 'vip',
    title: 'Ưu đãi thành viên VIP cuối tuần 👑',
    message: 'Giảm 30% khi nâng cấp gói 1 năm PlayBox VIP. Xem thả ga không lo quảng cáo.',
    time: '1 ngày trước',
    isRead: true,
    route: '/vip/checkout',
  },
  {
    id: 'n4',
    type: 'system',
    title: 'Bảo mật tài khoản',
    message: 'Thiết bị mới vừa đăng nhập vào tài khoản của bạn tại TP. Hồ Chí Minh.',
    time: '2 ngày trước',
    isRead: true,
    route: '/(auth)/security',
  },
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'video':
        return { name: 'play-circle', color: '#FF2A38' };
      case 'reward':
        return { name: 'flame', color: '#FF6B00' };
      case 'vip':
        return { name: 'diamond', color: '#FFD700' };
      default:
        return { name: 'shield-checkmark', color: '#4A90E2' };
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Thông báo</Text>
        <TouchableOpacity onPress={markAllRead}>
          <Text style={styles.markReadText}>Đánh dấu đã đọc</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const icon = getIcon(item.type);
          return (
            <TouchableOpacity
              style={[styles.card, !item.isRead && styles.cardUnread]}
              activeOpacity={0.8}
              onPress={() => {
                if (item.route) router.push(item.route as any);
              }}>
              <View style={[styles.iconWrap, { backgroundColor: icon.color + '22' }]}>
                <Ionicons name={icon.name as any} size={22} color={icon.color} />
              </View>

              <View style={{ flex: 1, gap: 2 }}>
                <View style={styles.cardHeader}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  {!item.isRead && <View style={styles.redDot} />}
                </View>
                <Text style={styles.itemMessage}>{item.message}</Text>
                <Text style={styles.itemTime}>{item.time}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0E' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#1F1F2A' },
  title: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  markReadText: { color: '#FF2A38', fontSize: 13, fontWeight: '600' },
  list: { padding: 16, gap: 12 },
  card: { flexDirection: 'row', backgroundColor: '#14141C', borderRadius: 12, padding: 14, gap: 12 },
  cardUnread: { backgroundColor: '#1C1924', borderWidth: 1, borderColor: '#2F2642' },
  iconWrap: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemTitle: { color: '#FFF', fontSize: 14, fontWeight: '700' },
  redDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF2A38' },
  itemMessage: { color: '#AAA', fontSize: 13, lineHeight: 18 },
  itemTime: { color: '#666', fontSize: 11, marginTop: 4 },
});

