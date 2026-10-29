import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES } from '@/constants/mock-data';

export default function OnboardingScreen() {
  const [selected, setSelected] = useState<string[]>(['film', 'anime']);

  const toggleSelect = (id: string) => {
    if (id === 'all') return;
    if (selected.includes(id)) {
      setSelected(selected.filter((x) => x !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.step}>Bước 1 / 2</Text>
        <Text style={styles.title}>Chọn sở thích của bạn</Text>
        <Text style={styles.subtitle}>
          PlayBox sẽ cá nhân hóa nội dung trên trang chủ dựa theo những chủ đề bạn yêu thích.
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
          const isChosen = selected.includes(cat.id);
          return (
            <TouchableOpacity
              key={cat.id}
              style={[styles.chip, isChosen && styles.chipActive]}
              onPress={() => toggleSelect(cat.id)}>
              <Ionicons
                name={isChosen ? 'checkmark-circle' : 'add-circle-outline'}
                size={20}
                color={isChosen ? '#FFF' : '#888'}
              />
              <Text style={[styles.chipText, isChosen && styles.chipTextActive]}>{cat.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.btnNext, selected.length === 0 && { opacity: 0.5 }]}
          disabled={selected.length === 0}
          onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.btnText}>Hoàn tất ({selected.length} chủ đề)</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSkip} onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.skipText}>Bỏ qua bước này</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0E', padding: 24, justifyContent: 'space-between' },
  header: { marginTop: 40 },
  step: { color: '#FF2A38', fontSize: 13, fontWeight: '700', textTransform: 'uppercase' },
  title: { fontSize: 26, fontWeight: '800', color: '#FFF', marginTop: 8 },
  subtitle: { fontSize: 14, color: '#9E9EB2', marginTop: 6, lineHeight: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, paddingVertical: 24 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: '#181820',
    borderWidth: 1,
    borderColor: '#292936',
  },
  chipActive: { backgroundColor: '#FF2A38', borderColor: '#FF2A38' },
  chipText: { color: '#AAA', fontSize: 14, fontWeight: '600' },
  chipTextActive: { color: '#FFF' },
  footer: { paddingBottom: 16, gap: 10 },
  btnNext: {
    backgroundColor: '#FF2A38',
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  btnSkip: { alignItems: 'center', paddingVertical: 6 },
  skipText: { color: '#777', fontSize: 14 },
});

