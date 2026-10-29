import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/auth-context';
import { MOCK_VIDEOS } from '@/constants/mock-data';

export default function HistoryScreen() {
  const { user } = useAuth();
  const [historyList, setHistoryList] = useState(user.history);

  const handleClearAll = () => {
    Alert.alert('Xóa lịch sử', 'Bạn có chắc chắn muốn xóa toàn bộ lịch sử xem video?', [
      { text: 'Hủy' },
      { text: 'Xóa hết', style: 'destructive', onPress: () => setHistoryList([]) },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.countText}>{historyList.length} video đã xem</Text>
        {historyList.length > 0 && (
          <TouchableOpacity onPress={handleClearAll}>
            <Text style={styles.clearBtnText}>Xóa tất cả</Text>
          </TouchableOpacity>
        )}
      </View>

      {historyList.length > 0 ? (
        <FlatList
          data={historyList}
          keyExtractor={(item, idx) => `${item.videoId}_${idx}`}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const video = MOCK_VIDEOS.find((v) => v.id === item.videoId) || MOCK_VIDEOS[0];
            const progressPercent = Math.round(item.progress * 100);

            return (
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.8}
                onPress={() => router.push(`/watch/${video.id}`)}>
                <View style={styles.thumbWrapper}>
                  <Image source={{ uri: video.thumbnail }} style={styles.thumb} />
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
                  </View>
                </View>

                <View style={styles.info}>
                  <Text style={styles.title} numberOfLines={2}>{video.title}</Text>
                  <Text style={styles.creator}>{video.creator.name}</Text>
                  <Text style={styles.watchedTime}>Đã xem {progressPercent}% · {item.watchedAt}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <View style={styles.emptyWrap}>
          <Ionicons name="time-outline" size={60} color="#444" />
          <Text style={styles.emptyTitle}>Lịch sử xem đang trống</Text>
          <Text style={styles.emptySub}>Những video bạn đã xem sẽ được lưu lại tại đây.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0E' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#1F1F2A' },
  countText: { color: '#888', fontSize: 13, fontWeight: '600' },
  clearBtnText: { color: '#FF453A', fontSize: 13, fontWeight: '600' },
  list: { padding: 16, gap: 14 },
  card: { flexDirection: 'row', gap: 12, backgroundColor: '#14141C', borderRadius: 10, padding: 8 },
  thumbWrapper: { position: 'relative' },
  thumb: { width: 120, height: 70, borderRadius: 6 },
  progressBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, backgroundColor: '#333' },
  progressFill: { height: '100%', backgroundColor: '#FF2A38' },
  info: { flex: 1, justifyContent: 'center' },
  title: { color: '#FFF', fontSize: 13, fontWeight: '600', lineHeight: 18 },
  creator: { color: '#888', fontSize: 11, marginTop: 4 },
  watchedTime: { color: '#FF737D', fontSize: 11, marginTop: 4 },
  emptyWrap: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30, gap: 10 },
  emptyTitle: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  emptySub: { color: '#666', fontSize: 13, textAlign: 'center' },
});

