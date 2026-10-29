import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES, MOCK_VIDEOS } from '@/constants/mock-data';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const currentCategory = CATEGORIES.find((c) => c.id === id) || { id: 'all', name: 'Tất cả thể loại' };
  const videos = id === 'all' ? MOCK_VIDEOS : MOCK_VIDEOS.filter((v) => v.category === id);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{currentCategory.name}</Text>
        <Text style={styles.subtitle}>Tuyển chọn những nội dung đặc sắc nhất thuộc thể loại này</Text>
      </View>

      <FlatList
        data={videos.length > 0 ? videos : MOCK_VIDEOS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => router.push(`/detail/${item.id}`)}>
            <View style={styles.thumbWrapper}>
              <Image source={{ uri: item.thumbnail }} style={styles.thumb} />
              <View style={styles.durationBadge}>
                <Text style={styles.durationText}>{item.duration}</Text>
              </View>
              {item.isVipOnly && (
                <View style={styles.vipTag}>
                  <Text style={styles.vipTagText}>VIP</Text>
                </View>
              )}
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.videoTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.creator}>{item.creator.name}</Text>
              <Text style={styles.meta}>
                {item.views} lượt xem · ★ {item.rating}
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
  header: { padding: 16, borderBottomWidth: 1, borderColor: '#1F1F2A' },
  title: { color: '#FFF', fontSize: 24, fontWeight: '800' },
  subtitle: { color: '#888', fontSize: 13, marginTop: 4 },
  list: { padding: 16, gap: 16 },
  card: { backgroundColor: '#14141C', borderRadius: 12, overflow: 'hidden' },
  thumbWrapper: { width: '100%', height: 190, position: 'relative' },
  thumb: { width: '100%', height: '100%' },
  durationBadge: { position: 'absolute', bottom: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.8)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  durationText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
  vipTag: { position: 'absolute', top: 8, left: 8, backgroundColor: '#FFD700', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  vipTagText: { color: '#000', fontSize: 10, fontWeight: '800' },
  cardInfo: { padding: 12 },
  videoTitle: { color: '#FFF', fontSize: 15, fontWeight: '700', lineHeight: 20 },
  creator: { color: '#AAA', fontSize: 13, marginTop: 4 },
  meta: { color: '#666', fontSize: 12, marginTop: 4 },
});

