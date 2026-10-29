import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Share, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/auth-context';
import { MOCK_VIDEOS } from '@/constants/mock-data';

export default function VideoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user, toggleFavorite } = useAuth();

  const video = MOCK_VIDEOS.find((v) => v.id === id) || MOCK_VIDEOS[0];
  const isSaved = user.saved_ids.includes(video.id);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Xem video "${video.title}" trên ứng dụng PlayBox cực hay!`,
      });
    } catch (e) {
      console.warn(e);
    }
  };

  const handleDownload = () => {
    if (!user.is_vip) {
      Alert.alert(
        'Đặc quyền VIP',
        'Tính năng tải video xem offline không giới hạn chỉ dành cho thành viên VIP.',
        [
          { text: 'Để sau' },
          { text: 'Nâng cấp VIP', onPress: () => router.push('/vip/checkout') },
        ]
      );
    } else {
      router.push('/library/downloads');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Banner & Play Button */}
      <View style={styles.bannerWrap}>
        <Image source={{ uri: video.thumbnail }} style={styles.bannerImage} />
        <TouchableOpacity
          style={styles.playCenterBtn}
          onPress={() => router.push(`/watch/${video.id}`)}>
          <Ionicons name="play" size={32} color="#FFF" style={{ marginLeft: 4 }} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Title & Metadata */}
        <Text style={styles.title}>{video.title}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.ratingText}>★ {video.rating}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.metaText}>{video.views} lượt xem</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.metaText}>{video.publishedAt}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => toggleFavorite(video.id)}>
            <Ionicons
              name={isSaved ? 'bookmark' : 'bookmark-outline'}
              size={22}
              color={isSaved ? '#FF2A38' : '#FFF'}
            />
            <Text style={[styles.actionText, isSaved && { color: '#FF2A38' }]}>
              {isSaved ? 'Đã lưu' : 'Lưu lại'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} onPress={handleDownload}>
            <Ionicons name="download-outline" size={22} color="#FFF" />
            <Text style={styles.actionText}>Tải về</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={22} color="#FFF" />
            <Text style={styles.actionText}>Chia sẻ</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => router.push(`/comments/${video.id}`)}>
            <Ionicons name="chatbubble-ellipses-outline" size={22} color="#FFF" />
            <Text style={styles.actionText}>Đánh giá</Text>
          </TouchableOpacity>
        </View>

        {/* Creator Row */}
        <TouchableOpacity
          style={styles.creatorCard}
          onPress={() => router.push(`/creator/${video.creator.id}`)}>
          <Image source={{ uri: video.creator.avatar }} style={styles.creatorAvatar} />
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Text style={styles.creatorName}>{video.creator.name}</Text>
              {video.creator.verified && <Ionicons name="checkmark-circle" size={14} color="#30D158" />}
            </View>
            <Text style={styles.subCount}>{video.creator.subscribers} người đăng ký</Text>
          </View>
          <View style={styles.subBtn}>
            <Text style={styles.subBtnText}>Đăng ký</Text>
          </View>
        </TouchableOpacity>

        {/* Description */}
        <Text style={styles.description}>{video.description}</Text>

        {/* Episodes Section (Nếu có) */}
        {video.episodes && video.episodes.length > 0 && (
          <View style={styles.episodesSection}>
            <Text style={styles.sectionHeader}>Danh sách tập phim ({video.episodes.length} tập)</Text>
            <View style={{ gap: 10, marginTop: 10 }}>
              {video.episodes.map((ep, idx) => (
                <TouchableOpacity
                  key={ep.id}
                  style={styles.episodeCard}
                  onPress={() => router.push(`/watch/${video.id}`)}>
                  <Image source={{ uri: ep.thumbnail }} style={styles.epThumb} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.epTitle} numberOfLines={2}>{ep.title}</Text>
                    <Text style={styles.epDuration}>{ep.duration}</Text>
                  </View>
                  <Ionicons name="play-circle-outline" size={28} color="#FF2A38" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0E' },
  bannerWrap: { width: '100%', height: 220, position: 'relative', backgroundColor: '#000' },
  bannerImage: { width: '100%', height: '100%' },
  playCenterBtn: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF2A38',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF2A38',
    shadowOpacity: 0.7,
    shadowRadius: 15,
  },
  content: { padding: 16 },
  title: { color: '#FFF', fontSize: 18, fontWeight: '800', lineHeight: 24 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  ratingText: { color: '#FFD700', fontSize: 13, fontWeight: '700' },
  dot: { color: '#555' },
  metaText: { color: '#888', fontSize: 13 },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#1E1E28',
    marginTop: 16,
  },
  actionBtn: { alignItems: 'center', gap: 4 },
  actionText: { color: '#AAA', fontSize: 12, fontWeight: '600' },
  creatorCard: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, gap: 12, borderBottomWidth: 1, borderColor: '#1E1E28' },
  creatorAvatar: { width: 44, height: 44, borderRadius: 22 },
  creatorName: { color: '#FFF', fontSize: 15, fontWeight: '700' },
  subCount: { color: '#777', fontSize: 12, marginTop: 2 },
  subBtn: { backgroundColor: '#FF2A38', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  subBtnText: { color: '#FFF', fontSize: 13, fontWeight: '700' },
  description: { color: '#BBB', fontSize: 14, lineHeight: 22, marginTop: 14 },
  episodesSection: { marginTop: 24 },
  sectionHeader: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  episodeCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#14141C', padding: 8, borderRadius: 10, gap: 10 },
  epThumb: { width: 90, height: 55, borderRadius: 6 },
  epTitle: { color: '#FFF', fontSize: 13, fontWeight: '600' },
  epDuration: { color: '#777', fontSize: 11, marginTop: 4 },
});

