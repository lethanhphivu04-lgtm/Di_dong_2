import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_VIDEOS } from '@/constants/mock-data';

export default function TrendingScreen() {
  const [filter, setFilter] = useState<'all' | 'film' | 'anime' | 'food'>('all');

  const filtered = MOCK_VIDEOS.filter((v) => filter === 'all' || v.category === filter);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons name="flame" size={26} color="#FF2A38" />
          <Text style={styles.title}>Bảng Xếp Hạng Thịnh Hành</Text>
        </View>
        <Text style={styles.subtitle}>Top video thu hút hàng triệu lượt xem trong 24h qua</Text>

        <View style={styles.tabsRow}>
          {(['all', 'film', 'anime', 'food'] as const).map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.tabBtn, filter === t && styles.tabBtnActive]}
              onPress={() => setFilter(t)}>
              <Text style={[styles.tabText, filter === t && styles.tabTextActive]}>
                {t === 'all' ? 'Tất cả' : t === 'film' ? 'Phim & Series' : t === 'anime' ? 'Anime' : 'Ẩm thực'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => {
          const rank = index + 1;
          const rankColor = rank === 1 ? '#FFD700' : rank === 2 ? '#C0C0C0' : rank === 3 ? '#CD7F32' : '#777';

          return (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => router.push(`/detail/${item.id}`)}>
              <View style={styles.rankCol}>
                <Text style={[styles.rankNum, { color: rankColor }]}>#{rank}</Text>
              </View>

              <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />

              <View style={styles.info}>
                <Text style={styles.videoTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.creator}>{item.creator.name}</Text>
                <View style={styles.metaRow}>
                  <Text style={styles.metaText}>{item.views} views</Text>
                  <Text style={styles.dot}>•</Text>
                  <Text style={styles.metaText}>★ {item.rating}</Text>
                </View>
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
  header: { paddingTop: 48, paddingHorizontal: 16, paddingBottom: 12, borderBottomWidth: 1, borderColor: '#1F1F2A' },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { color: '#FFF', fontSize: 22, fontWeight: '800' },
  subtitle: { color: '#888', fontSize: 13, marginTop: 4 },
  tabsRow: { flexDirection: 'row', gap: 8, marginTop: 14 },
  tabBtn: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, backgroundColor: '#181822' },
  tabBtnActive: { backgroundColor: '#FF2A38' },
  tabText: { color: '#888', fontSize: 13, fontWeight: '600' },
  tabTextActive: { color: '#FFF' },
  list: { padding: 16, gap: 14 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#14141B', borderRadius: 12, padding: 10, gap: 10 },
  rankCol: { width: 32, alignItems: 'center' },
  rankNum: { fontSize: 20, fontWeight: '900' },
  thumbnail: { width: 110, height: 68, borderRadius: 8 },
  info: { flex: 1, justifyContent: 'center' },
  videoTitle: { color: '#FFF', fontSize: 14, fontWeight: '600', lineHeight: 18 },
  creator: { color: '#999', fontSize: 12, marginTop: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  metaText: { color: '#666', fontSize: 11 },
  dot: { color: '#444' },
});

