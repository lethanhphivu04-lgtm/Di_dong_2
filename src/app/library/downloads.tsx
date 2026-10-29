import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/auth-context';
import { MOCK_VIDEOS } from '@/constants/mock-data';

interface DownloadedVideo {
  id: string;
  title: string;
  size: string;
  quality: string;
  thumbnail: string;
}

const INITIAL_DOWNLOADS: DownloadedVideo[] = [
  {
    id: 'v1',
    title: 'Hành Trình Xuyên Việt Bằng Xe Máy - Tập 1',
    size: '420 MB',
    quality: '1080p',
    thumbnail: MOCK_VIDEOS[0].thumbnail,
  },
  {
    id: 'v3',
    title: 'Nấu Bữa Cơm Gia Đình 3 Món Chỉ Với 70.000đ',
    size: '180 MB',
    quality: '720p',
    thumbnail: MOCK_VIDEOS[2].thumbnail,
  },
];

export default function DownloadsScreen() {
  const { user } = useAuth();
  const [downloads, setDownloads] = useState<DownloadedVideo[]>(INITIAL_DOWNLOADS);

  const handleDelete = (id: string, title: string) => {
    Alert.alert('Xóa bản tải', `Xóa video "${title}" khỏi bộ nhớ máy?`, [
      { text: 'Hủy' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: () => setDownloads(downloads.filter((d) => d.id !== id)),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Storage Bar */}
      <View style={styles.storageCard}>
        <View style={styles.storageHeader}>
          <Text style={styles.storageTitle}>Bộ nhớ thiết bị</Text>
          <Text style={styles.storageMeta}>Đã dùng 600 MB / 64 GB khả dụng</Text>
        </View>
        <View style={styles.storageTrack}>
          <View style={styles.storageFill} />
        </View>
      </View>

      {/* Non-VIP Banner Notice */}
      {!user.is_vip && (
        <View style={styles.vipNotice}>
          <Ionicons name="sparkles" size={24} color="#FFD700" />
          <View style={{ flex: 1 }}>
            <Text style={styles.vipNoticeTitle}>Mở khóa tải Offline với VIP 👑</Text>
            <Text style={styles.vipNoticeSub}>
              Tải không giới hạn các bộ phim 4K để xem mượt mà trên máy bay, tàu xe khi không có mạng.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.upgradeBtn}
            onPress={() => router.push('/vip/checkout')}>
            <Text style={styles.upgradeBtnText}>Nâng cấp</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* List */}
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Video đã tải về máy ({downloads.length})</Text>
      </View>

      <FlatList
        data={downloads}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <TouchableOpacity
              style={styles.itemMain}
              onPress={() => router.push(`/watch/${item.id}`)}>
              <Image source={{ uri: item.thumbnail }} style={styles.thumb} />
              <View style={styles.info}>
                <Text style={styles.videoTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <View style={styles.metaRow}>
                  <View style={styles.qualityBadge}>
                    <Text style={styles.qualityText}>{item.quality}</Text>
                  </View>
                  <Text style={styles.sizeText}>{item.size}</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => handleDelete(item.id, item.title)}>
              <Ionicons name="trash-outline" size={20} color="#FF453A" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0E' },
  storageCard: { margin: 16, padding: 14, backgroundColor: '#14141C', borderRadius: 12, gap: 8 },
  storageHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  storageTitle: { color: '#FFF', fontSize: 13, fontWeight: '700' },
  storageMeta: { color: '#888', fontSize: 12 },
  storageTrack: { height: 6, backgroundColor: '#252532', borderRadius: 3, overflow: 'hidden' },
  storageFill: { width: '12%', height: '100%', backgroundColor: '#30D158' },
  vipNotice: {
    marginHorizontal: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E170A',
    borderWidth: 1,
    borderColor: '#66521A',
    borderRadius: 12,
    padding: 14,
    gap: 12,
  },
  vipNoticeTitle: { color: '#FFD700', fontSize: 14, fontWeight: '700' },
  vipNoticeSub: { color: '#D4C19C', fontSize: 11, marginTop: 2, lineHeight: 16 },
  upgradeBtn: { backgroundColor: '#FFD700', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  upgradeBtnText: { color: '#000', fontSize: 12, fontWeight: '800' },
  listHeader: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 6 },
  listTitle: { color: '#FFF', fontSize: 15, fontWeight: '700' },
  list: { padding: 16, gap: 12 },
  itemCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#14141C', borderRadius: 10, padding: 8 },
  itemMain: { flex: 1, flexDirection: 'row', gap: 10 },
  thumb: { width: 110, height: 65, borderRadius: 6 },
  info: { flex: 1, justifyContent: 'center' },
  videoTitle: { color: '#FFF', fontSize: 13, fontWeight: '600', lineHeight: 18 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  qualityBadge: { backgroundColor: '#252532', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  qualityText: { color: '#AAA', fontSize: 10, fontWeight: '700' },
  sizeText: { color: '#777', fontSize: 11 },
  deleteBtn: { padding: 10 },
});

