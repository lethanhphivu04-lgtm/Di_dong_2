import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/auth-context';
import { MOCK_VIDEOS } from '@/constants/mock-data';

export default function WatchScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addToHistory, user } = useAuth();
  const video = MOCK_VIDEOS.find((v) => v.id === id) || MOCK_VIDEOS[0];

  const [quality, setQuality] = useState('1080p Full HD');
  const [speed, setSpeed] = useState(1.0);
  const [sleepTimer, setSleepTimer] = useState<number | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  // Initialize expo-video player
  const player = useVideoPlayer(video.videoUrl, (p) => {
    p.loop = true;
    p.play();
  });

  useEffect(() => {
    addToHistory(video.id);
  }, [video.id]);

  useEffect(() => {
    if (player) {
      player.playbackRate = speed;
    }
  }, [speed, player]);

  const handleSelectQuality = (q: string) => {
    if (q === '4K Ultra HD' && !user.is_vip) {
      Alert.alert('Chỉ dành cho VIP', 'Chất lượng 4K Ultra HD yêu cầu gói VIP.', [
        { text: 'Đóng' },
        { text: 'Nâng cấp VIP', onPress: () => router.push('/vip/checkout') },
      ]);
      return;
    }
    setQuality(q);
    setShowSettings(false);
  };

  const handleSetTimer = (minutes: number | null) => {
    setSleepTimer(minutes);
    setShowSettings(false);
    if (minutes) {
      Alert.alert('Hẹn giờ ngủ', `Trình phát sẽ tự động dừng sau ${minutes} phút.`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Video View */}
      <View style={styles.videoWrapper}>
        <VideoView style={styles.video} player={player} allowsPictureInPicture nativeControls />

        {/* Top Controls Overlay */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>

          <View style={styles.topRight}>
            <TouchableOpacity style={styles.iconBtn} onPress={() => setShowSettings(true)}>
              <Ionicons name="settings-outline" size={22} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Video Info under player */}
      <View style={styles.infoSection}>
        <Text style={styles.title}>{video.title}</Text>
        <Text style={styles.meta}>
          Đang phát: <Text style={{ color: '#FFD700' }}>{quality}</Text> · Tốc độ: {speed}x{' '}
          {sleepTimer && `· ⏱ Tắt sau ${sleepTimer}p`}
        </Text>

        <View style={styles.quickControls}>
          <TouchableOpacity style={styles.quickBtn} onPress={() => player.seekBy(-10)}>
            <Ionicons name="play-back" size={18} color="#FFF" />
            <Text style={styles.quickText}>-10s</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickBtn} onPress={() => player.seekBy(10)}>
            <Ionicons name="play-forward" size={18} color="#FFF" />
            <Text style={styles.quickText}>+10s</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickBtn} onPress={() => router.push(`/comments/${video.id}`)}>
            <Ionicons name="chatbubbles-outline" size={18} color="#FFF" />
            <Text style={styles.quickText}>Bình luận</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Settings Modal (Quality, Speed, Sleep Timer) */}
      <Modal visible={showSettings} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Cài đặt trình phát</Text>
              <TouchableOpacity onPress={() => setShowSettings(false)}>
                <Ionicons name="close" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>

            {/* Độ phân giải */}
            <Text style={styles.groupLabel}>CHẤT LƯỢNG VIDEO</Text>
            <View style={styles.optionsRow}>
              {['4K Ultra HD', '1080p Full HD', '720p', 'Tự động'].map((q) => (
                <TouchableOpacity
                  key={q}
                  style={[styles.optionChip, quality === q && styles.optionChipActive]}
                  onPress={() => handleSelectQuality(q)}>
                  <Text style={[styles.optionText, quality === q && styles.optionTextActive]}>
                    {q} {q === '4K Ultra HD' && '👑'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Tốc độ phát */}
            <Text style={styles.groupLabel}>TỐC ĐỘ PHÁT</Text>
            <View style={styles.optionsRow}>
              {[0.75, 1.0, 1.25, 1.5, 2.0].map((s) => (
                <TouchableOpacity
                  key={s}
                  style={[styles.optionChip, speed === s && styles.optionChipActive]}
                  onPress={() => {
                    setSpeed(s);
                    setShowSettings(false);
                  }}>
                  <Text style={[styles.optionText, speed === s && styles.optionTextActive]}>{s}x</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Hẹn giờ tắt */}
            <Text style={styles.groupLabel}>HẸN GIỜ TẮT NGỦ (SLEEP TIMER)</Text>
            <View style={styles.optionsRow}>
              {[
                { label: 'Tắt', val: null },
                { label: '15 phút', val: 15 },
                { label: '30 phút', val: 30 },
                { label: '60 phút', val: 60 },
              ].map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[styles.optionChip, sleepTimer === item.val && styles.optionChipActive]}
                  onPress={() => handleSetTimer(item.val)}>
                  <Text style={[styles.optionText, sleepTimer === item.val && styles.optionTextActive]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0E' },
  videoWrapper: { width: '100%', height: 260, backgroundColor: '#000', position: 'relative' },
  video: { width: '100%', height: '100%' },
  topBar: {
    position: 'absolute',
    top: 40,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRight: { flexDirection: 'row', gap: 10 },
  infoSection: { padding: 16 },
  title: { color: '#FFF', fontSize: 16, fontWeight: '700', lineHeight: 22 },
  meta: { color: '#888', fontSize: 12, marginTop: 6 },
  quickControls: { flexDirection: 'row', gap: 12, marginTop: 16 },
  quickBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#181822',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  quickText: { color: '#FFF', fontSize: 12, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#181824', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, gap: 14 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  modalTitle: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  groupLabel: { color: '#777', fontSize: 11, fontWeight: '700', letterSpacing: 0.5, marginTop: 10 },
  optionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionChip: { backgroundColor: '#222230', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  optionChipActive: { backgroundColor: '#FF2A38' },
  optionText: { color: '#AAA', fontSize: 13, fontWeight: '600' },
  optionTextActive: { color: '#FFF', fontWeight: '700' },
});

