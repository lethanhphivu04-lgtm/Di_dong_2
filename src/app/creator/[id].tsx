import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_VIDEOS } from '@/constants/mock-data';

export default function CreatorChannelScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [activeTab, setActiveTab] = useState<'videos' | 'about'>('videos');

  const creatorVideos = MOCK_VIDEOS.filter((v) => v.creator.id === id);
  const creator = creatorVideos[0]?.creator || MOCK_VIDEOS[0].creator;

  const handleToggleSub = () => {
    setIsSubscribed(!isSubscribed);
    Alert.alert(
      isSubscribed ? 'Đã hủy đăng ký' : 'Đăng ký thành công',
      isSubscribed ? `Đã hủy theo dõi kênh ${creator.name}` : `Bạn sẽ nhận thông báo khi ${creator.name} có video mới!`
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Cover Banner */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800' }}
        style={styles.cover}
      />

      {/* Creator Profile Header */}
      <View style={styles.profileHeader}>
        <Image source={{ uri: creator.avatar }} style={styles.avatar} />
        <View style={styles.nameRow}>
          <Text style={styles.name}>{creator.name}</Text>
          {creator.verified && <Ionicons name="checkmark-circle" size={16} color="#30D158" />}
        </View>
        <Text style={styles.meta}>{creator.subscribers} người đăng ký · 142 video</Text>

        <TouchableOpacity
          style={[styles.subBtn, isSubscribed && styles.subBtnActive]}
          onPress={handleToggleSub}>
          <Ionicons
            name={isSubscribed ? 'notifications' : 'add'}
            size={18}
            color={isSubscribed ? '#AAA' : '#FFF'}
          />
          <Text style={[styles.subText, isSubscribed && styles.subTextActive]}>
            {isSubscribed ? 'Đã đăng ký' : 'Đăng ký kênh'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Channel Tabs */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'videos' && styles.tabActive]}
          onPress={() => setActiveTab('videos')}>
          <Text style={[styles.tabText, activeTab === 'videos' && styles.tabTextActive]}>Video</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'about' && styles.tabActive]}
          onPress={() => setActiveTab('about')}>
          <Text style={[styles.tabText, activeTab === 'about' && styles.tabTextActive]}>Giới thiệu</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'videos' ? (
        <View style={styles.videoGrid}>
          {MOCK_VIDEOS.map((v) => (
            <TouchableOpacity
              key={v.id}
              style={styles.videoCard}
              onPress={() => router.push(`/detail/${v.id}`)}>
              <Image source={{ uri: v.thumbnail }} style={styles.videoThumb} />
              <View style={styles.videoCardInfo}>
                <Text style={styles.videoTitle} numberOfLines={2}>{v.title}</Text>
                <Text style={styles.videoMeta}>{v.views} views · {v.publishedAt}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>Mô tả kênh</Text>
          <Text style={styles.aboutText}>
            Kênh chính thức chia sẻ những thước phim tài liệu du lịch, ẩm thực và văn hóa Việt Nam.
            Được quay và sản xuất với chuẩn chất lượng 4K Ultra HD. Cảm ơn sự đồng hành của quý khán giả!
          </Text>
          <Text style={styles.aboutMeta}>Tham gia từ: 15/03/2023 · Tổng 28.5M lượt xem</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0E' },
  cover: { width: '100%', height: 120 },
  profileHeader: { alignItems: 'center', marginTop: -35, paddingHorizontal: 16 },
  avatar: { width: 70, height: 70, borderRadius: 35, borderWidth: 3, borderColor: '#0B0B0E' },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  name: { color: '#FFF', fontSize: 18, fontWeight: '800' },
  meta: { color: '#777', fontSize: 12, marginTop: 4 },
  subBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FF2A38',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 12,
  },
  subBtnActive: { backgroundColor: '#1E1E28' },
  subText: { color: '#FFF', fontSize: 14, fontWeight: '700' },
  subTextActive: { color: '#BBB' },
  tabsRow: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#1F1F2A', marginTop: 16 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 12 },
  tabActive: { borderBottomWidth: 2, borderColor: '#FF2A38' },
  tabText: { color: '#888', fontSize: 14, fontWeight: '600' },
  tabTextActive: { color: '#FFF', fontWeight: '700' },
  videoGrid: { padding: 16, gap: 14 },
  videoCard: { flexDirection: 'row', gap: 10, backgroundColor: '#14141C', borderRadius: 10, padding: 8 },
  videoThumb: { width: 120, height: 70, borderRadius: 6 },
  videoCardInfo: { flex: 1, justifyContent: 'center' },
  videoTitle: { color: '#FFF', fontSize: 13, fontWeight: '600', lineHeight: 18 },
  videoMeta: { color: '#666', fontSize: 11, marginTop: 4 },
  aboutSection: { padding: 20, gap: 10 },
  aboutTitle: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  aboutText: { color: '#AAA', fontSize: 14, lineHeight: 22 },
  aboutMeta: { color: '#666', fontSize: 12, marginTop: 10 },
});

