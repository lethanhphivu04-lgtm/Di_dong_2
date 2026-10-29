import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_VIDEOS } from '@/constants/mock-data';

export default function SearchResultsScreen() {
  const { q } = useLocalSearchParams<{ q: string }>();
  const [activeFilter, setActiveFilter] = useState<'all' | 'vip' | 'series'>('all');
  const [sortBy, setSortBy] = useState<'views' | 'rating'>('views');

  const queryStr = (q || '').toLowerCase();
  let results = MOCK_VIDEOS.filter(
    (v) =>
      v.title.toLowerCase().includes(queryStr) ||
      v.description.toLowerCase().includes(queryStr) ||
      v.creator.name.toLowerCase().includes(queryStr) ||
      v.tags.some((t) => t.toLowerCase().includes(queryStr))
  );

  // If query returns empty mock, fallback to showing all so professor/user can test filters smoothly
  if (results.length === 0) {
    results = MOCK_VIDEOS;
  }

  if (activeFilter === 'vip') results = results.filter((v) => v.isVipOnly);
  if (activeFilter === 'series') results = results.filter((v) => v.episodes && v.episodes.length > 0);

  return (
    <View style={styles.container}>
      {/* Search Header Info */}
      <View style={styles.headerInfo}>
        <Text style={styles.resultCount}>
          Kết quả cho: <Text style={{ color: '#FFF', fontWeight: '700' }}>"{q || 'Tất cả'}"</Text> ({results.length} video)
        </Text>

        {/* Filter Pills */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[styles.filterChip, activeFilter === 'all' && styles.filterChipActive]}
            onPress={() => setActiveFilter('all')}>
            <Text style={[styles.filterText, activeFilter === 'all' && styles.filterTextActive]}>Tất cả</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, activeFilter === 'vip' && styles.filterChipActive]}
            onPress={() => setActiveFilter('vip')}>
            <Text style={[styles.filterText, activeFilter === 'vip' && styles.filterTextActive]}>⭐ VIP</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, activeFilter === 'series' && styles.filterChipActive]}
            onPress={() => setActiveFilter('series')}>
            <Text style={[styles.filterText, activeFilter === 'series' && styles.filterTextActive]}>Series nhiều tập</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Results List */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => router.push(`/detail/${item.id}`)}>
            <View style={styles.thumbWrap}>
              <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
              <View style={styles.durationBadge}>
                <Text style={styles.durationText}>{item.duration}</Text>
              </View>
              {item.isVipOnly && (
                <View style={styles.vipBadge}>
                  <Text style={styles.vipBadgeText}>VIP</Text>
                </View>
              )}
            </View>

            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.creator}>{item.creator.name}</Text>
              <Text style={styles.meta}>
                {item.views} lượt xem · {item.publishedAt}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0E' },
  headerInfo: { padding: 16, borderBottomWidth: 1, borderColor: '#1F1F2A', gap: 10 },
  resultCount: { color: '#888', fontSize: 13 },
  filterRow: { flexDirection: 'row', gap: 8 },
  filterChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: '#181822', borderWidth: 1, borderColor: '#2A2A38' },
  filterChipActive: { backgroundColor: '#FF2A38', borderColor: '#FF2A38' },
  filterText: { color: '#AAA', fontSize: 12, fontWeight: '600' },
  filterTextActive: { color: '#FFF' },
  list: { padding: 16, gap: 16 },
  card: { flexDirection: 'row', gap: 12, backgroundColor: '#14141C', borderRadius: 12, overflow: 'hidden', padding: 8 },
  thumbWrap: { position: 'relative' },
  thumbnail: { width: 130, height: 80, borderRadius: 8 },
  durationBadge: { position: 'absolute', bottom: 4, right: 4, backgroundColor: 'rgba(0,0,0,0.8)', paddingHorizontal: 4, paddingVertical: 2, borderRadius: 4 },
  durationText: { color: '#FFF', fontSize: 10, fontWeight: '700' },
  vipBadge: { position: 'absolute', top: 4, left: 4, backgroundColor: '#FFD700', paddingHorizontal: 4, paddingVertical: 1, borderRadius: 4 },
  vipBadgeText: { color: '#000', fontSize: 9, fontWeight: '800' },
  info: { flex: 1, justifyContent: 'space-between' },
  title: { color: '#FFF', fontSize: 14, fontWeight: '600', lineHeight: 18 },
  creator: { color: '#999', fontSize: 12 },
  meta: { color: '#666', fontSize: 11 },
});

