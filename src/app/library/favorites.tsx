import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/auth-context';
import { MOCK_VIDEOS } from '@/constants/mock-data';

export default function FavoritesScreen() {
  const { user, toggleFavorite } = useAuth();

  const savedVideos = MOCK_VIDEOS.filter((v) => user.saved_ids.includes(v.id));

  return (
    <View style={styles.container}>
      {savedVideos.length > 0 ? (
        <View style={{ flex: 1 }}>
          <View style={styles.topBar}>
            <Text style={styles.countText}>{savedVideos.length} video đã lưu</Text>
            <TouchableOpacity
              style={styles.playAllBtn}
              onPress={() => router.push(`/watch/${savedVideos[0].id}`)}>
              <Ionicons name="play" size={16} color="#000" />
              <Text style={styles.playAllText}>Phát tất cả</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={savedVideos}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <TouchableOpacity
                  style={styles.cardMain}
                  onPress={() => router.push(`/detail/${item.id}`)}>
                  <Image source={{ uri: item.thumbnail }} style={styles.thumb} />
                  <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.creator}>{item.creator.name}</Text>
                    <Text style={styles.meta}>{item.views} lượt xem</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => toggleFavorite(item.id)}>
                  <Ionicons name="trash-outline" size={20} color="#FF453A" />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      ) : (
        <View style={styles.emptyWrap}>
          <Ionicons name="bookmark-outline" size={60} color="#444" />
          <Text style={styles.emptyTitle}>Chưa có video yêu thích</Text>
          <Text style={styles.emptySub}>
            Lưu các video bạn muốn xem sau để tìm lại dễ dàng bất kỳ lúc nào.
          </Text>
          <TouchableOpacity style={styles.exploreBtn} onPress={() => router.push('/(tabs)')}>
            <Text style={styles.exploreText}>Khám phá video ngay</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0E' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#1F1F2A' },
  countText: { color: '#888', fontSize: 13, fontWeight: '600' },
  playAllBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#FFF', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  playAllText: { color: '#000', fontSize: 13, fontWeight: '700' },
  list: { padding: 16, gap: 14 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#14141C', borderRadius: 12, padding: 8 },
  cardMain: { flex: 1, flexDirection: 'row', gap: 10 },
  thumb: { width: 110, height: 68, borderRadius: 8 },
  info: { flex: 1, justifyContent: 'center' },
  title: { color: '#FFF', fontSize: 13, fontWeight: '600', lineHeight: 18 },
  creator: { color: '#888', fontSize: 11, marginTop: 4 },
  meta: { color: '#666', fontSize: 10, marginTop: 2 },
  removeBtn: { padding: 10 },
  emptyWrap: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30, gap: 12 },
  emptyTitle: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  emptySub: { color: '#777', fontSize: 13, textAlign: 'center', lineHeight: 20 },
  exploreBtn: { backgroundColor: '#FF2A38', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12, marginTop: 8 },
  exploreText: { color: '#FFF', fontSize: 14, fontWeight: '700' },
});

