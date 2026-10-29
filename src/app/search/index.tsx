import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES } from '@/constants/mock-data';

export default function SearchIndexScreen() {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(['Xuyên việt xe máy', 'Anime 4K', 'Cơm 70k']);

  const popularKeywords = ['Hài Tết', 'Thần Thú', 'Khoai Đi Dạo', 'Series trọ sinh viên', 'Nhạc Chill'];

  const handleSearch = (text: string) => {
    if (!text.trim()) return;
    if (!recentSearches.includes(text)) {
      setRecentSearches([text, ...recentSearches.slice(0, 4)]);
    }
    router.push({ pathname: '/search/results', params: { q: text } });
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm video, series, diễn viên, creator..."
          placeholderTextColor="#666"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => handleSearch(query)}
          returnKeyType="search"
          autoFocus
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={18} color="#888" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Lịch sử tìm kiếm gần đây */}
        {recentSearches.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Tìm kiếm gần đây</Text>
              <TouchableOpacity onPress={() => setRecentSearches([])}>
                <Text style={styles.clearText}>Xóa tất cả</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.tagsWrapper}>
              {recentSearches.map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.historyChip}
                  onPress={() => handleSearch(item)}>
                  <Ionicons name="time-outline" size={14} color="#888" />
                  <Text style={styles.historyText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Từ khóa thịnh hành */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔥 Tìm kiếm thịnh hành</Text>
          <View style={styles.tagsWrapper}>
            {popularKeywords.map((kw, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.keywordChip}
                onPress={() => handleSearch(kw)}>
                <Text style={styles.keywordText}>{kw}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Khám phá theo danh mục */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Danh mục nổi bật</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={styles.catCard}
                onPress={() => router.push(`/category/${cat.id}`)}>
                <Ionicons name="film-outline" size={20} color="#FF2A38" />
                <Text style={styles.catName}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0E' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181822',
    margin: 16,
    paddingHorizontal: 14,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A38',
    gap: 10,
  },
  searchInput: { flex: 1, color: '#FFF', fontSize: 15 },
  content: { paddingHorizontal: 16, paddingBottom: 30, gap: 24 },
  section: { gap: 10 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { color: '#FFF', fontSize: 15, fontWeight: '700' },
  clearText: { color: '#888', fontSize: 12 },
  tagsWrapper: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  historyChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#181822', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16 },
  historyText: { color: '#BBB', fontSize: 13 },
  keywordChip: { backgroundColor: 'rgba(255, 42, 56, 0.12)', borderWidth: 1, borderColor: 'rgba(255, 42, 56, 0.3)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16 },
  keywordText: { color: '#FF737D', fontSize: 13, fontWeight: '600' },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  catCard: { width: '48%', backgroundColor: '#14141C', padding: 14, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  catName: { color: '#DDD', fontSize: 13, fontWeight: '600' },
});

