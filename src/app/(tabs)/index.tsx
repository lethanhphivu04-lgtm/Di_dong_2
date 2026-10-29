import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/context/auth-context';
import { CATEGORIES, MOCK_VIDEOS, VideoItem } from '@/constants/mock-data';

export default function HomeScreen() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const featuredVideo = MOCK_VIDEOS[0];
  const continueWatching = MOCK_VIDEOS.slice(0, 2);
  const recommendedVideos = MOCK_VIDEOS.filter(
    (v) => selectedCategory === 'all' || v.category === selectedCategory
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <View style={styles.logoBadge}>
            <Ionicons name="play" size={16} color="#FFF" style={{ marginLeft: 2 }} />
          </View>
          <Text style={styles.brandText}>PlayBox</Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.streakBadge}
            onPress={() => router.push('/library/rewards')}>
            <Ionicons name="flame" size={16} color="#FF6B00" />
            <Text style={styles.streakText}>{user.streak} ngày</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/search')}>
            <Ionicons name="search" size={20} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/notifications')}>
            <Ionicons name="notifications-outline" size={20} color="#FFF" />
            <View style={styles.redDot} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}>
        {CATEGORIES.map((cat) => {
          const active = selectedCategory === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryChip, active && styles.categoryChipActive]}
              onPress={() => setSelectedCategory(cat.id)}>
              <Text style={[styles.categoryText, active && styles.categoryTextActive]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Hero Featured Video */}
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.heroCard}
        onPress={() => router.push(`/detail/${featuredVideo.id}`)}>
        <Image source={{ uri: featuredVideo.thumbnail }} style={styles.heroImage} />
        <LinearGradient colors={['transparent', 'rgba(11,11,14,0.95)']} style={styles.heroGradient}>
          <View style={styles.vipTag}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.vipTagText}>HOT NHẤT TUẦN</Text>
          </View>
          <Text style={styles.heroTitle} numberOfLines={2}>
            {featuredVideo.title}
          </Text>
          <Text style={styles.heroMeta}>
            {featuredVideo.creator.name} · {featuredVideo.views} lượt xem · ★ {featuredVideo.rating}
          </Text>

          <View style={styles.heroButtons}>
            <TouchableOpacity
              style={styles.btnWatch}
              onPress={() => router.push(`/watch/${featuredVideo.id}`)}>
              <Ionicons name="play" size={18} color="#000" />
              <Text style={styles.btnWatchText}>Xem ngay</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnInfo}
              onPress={() => router.push(`/detail/${featuredVideo.id}`)}>
              <Ionicons name="information-circle-outline" size={20} color="#FFF" />
              <Text style={styles.btnInfoText}>Chi tiết</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* Tiếp tục xem (Continue Watching) */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tiếp tục xem</Text>
          <TouchableOpacity onPress={() => router.push('/library/history')}>
            <Text style={styles.seeAllText}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={continueWatching}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 14 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.continueCard}
              onPress={() => router.push(`/watch/${item.id}`)}>
              <Image source={{ uri: item.thumbnail }} style={styles.continueImg} />
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: index === 0 ? '65%' : '30%' }]} />
              </View>
              <Text style={styles.continueTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.continueSubtitle}>Còn lại ~10 phút</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* VIP Promotion Banner */}
      {!user.is_vip && (
        <TouchableOpacity
          style={styles.vipPromo}
          onPress={() => router.push('/vip/checkout')}>
          <LinearGradient
            colors={['#8B0000', '#FF2A38']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.vipPromoGrad}>
            <View style={{ flex: 1 }}>
              <Text style={styles.vipPromoTitle}>Nâng cấp PlayBox VIP 👑</Text>
              <Text style={styles.vipPromoSub}>Xem phim 4K không quảng cáo, tải offline mọi lúc</Text>
            </View>
            <View style={styles.vipPromoBtn}>
              <Text style={styles.vipPromoBtnText}>Chỉ 59k</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      )}

      {/* Đề xuất cho bạn (Recommended) */}
      <View style={[styles.section, { marginBottom: 30 }]}>
        <Text style={styles.sectionTitle}>Đề xuất cho bạn</Text>
        <View style={styles.verticalList}>
          {recommendedVideos.map((video) => (
            <TouchableOpacity
              key={video.id}
              style={styles.videoItem}
              onPress={() => router.push(`/detail/${video.id}`)}>
              <View style={styles.thumbWrapper}>
                <Image source={{ uri: video.thumbnail }} style={styles.videoThumb} />
                <View style={styles.durationBadge}>
                  <Text style={styles.durationText}>{video.duration}</Text>
                </View>
                {video.isVipOnly && (
                  <View style={styles.vipBadge}>
                    <Text style={styles.vipBadgeText}>VIP</Text>
                  </View>
                )}
              </View>

              <View style={styles.videoInfo}>
                <Text style={styles.videoTitle} numberOfLines={2}>
                  {video.title}
                </Text>
                <View style={styles.creatorRow}>
                  <Image source={{ uri: video.creator.avatar }} style={styles.creatorAvatar} />
                  <Text style={styles.creatorName}>{video.creator.name}</Text>
                </View>
                <Text style={styles.videoMeta}>
                  {video.views} lượt xem · {video.publishedAt}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0E' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 12,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoBadge: { width: 30, height: 30, borderRadius: 8, backgroundColor: '#FF2A38', justifyContent: 'center', alignItems: 'center' },
  brandText: { color: '#FFF', fontSize: 20, fontWeight: '800', letterSpacing: 0.5 },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 0, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 14,
    gap: 4,
  },
  streakText: { color: '#FF6B00', fontSize: 12, fontWeight: '700' },
  iconBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#181822', justifyContent: 'center', alignItems: 'center' },
  redDot: { position: 'absolute', top: 7, right: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF2A38' },
  categoryScroll: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  categoryChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: '#181822' },
  categoryChipActive: { backgroundColor: '#FFF' },
  categoryText: { color: '#8E8E9F', fontSize: 13, fontWeight: '600' },
  categoryTextActive: { color: '#000', fontWeight: '700' },
  heroCard: { marginHorizontal: 16, height: 230, borderRadius: 16, overflow: 'hidden', marginTop: 10 },
  heroImage: { width: '100%', height: '100%' },
  heroGradient: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '80%', justifyContent: 'flex-end', padding: 16 },
  vipTag: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(0,0,0,0.6)', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, marginBottom: 6 },
  vipTagText: { color: '#FFD700', fontSize: 10, fontWeight: '800' },
  heroTitle: { color: '#FFF', fontSize: 18, fontWeight: '800', lineHeight: 22 },
  heroMeta: { color: '#B0B0C0', fontSize: 12, marginTop: 4 },
  heroButtons: { flexDirection: 'row', gap: 10, marginTop: 12 },
  btnWatch: { flex: 1, backgroundColor: '#FFF', height: 38, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6 },
  btnWatchText: { color: '#000', fontSize: 14, fontWeight: '700' },
  btnInfo: { flex: 1, backgroundColor: 'rgba(255,255,255,0.2)', height: 38, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6 },
  btnInfoText: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  section: { marginTop: 24, paddingHorizontal: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  seeAllText: { color: '#FF2A38', fontSize: 13, fontWeight: '600' },
  continueCard: { width: 180 },
  continueImg: { width: 180, height: 100, borderRadius: 10 },
  progressBar: { height: 3, backgroundColor: '#333', borderRadius: 2, marginTop: 6, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#FF2A38' },
  continueTitle: { color: '#FFF', fontSize: 13, fontWeight: '600', marginTop: 6 },
  continueSubtitle: { color: '#888', fontSize: 11, marginTop: 2 },
  vipPromo: { marginHorizontal: 16, marginTop: 24, borderRadius: 12, overflow: 'hidden' },
  vipPromoGrad: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  vipPromoTitle: { color: '#FFF', fontSize: 15, fontWeight: '700' },
  vipPromoSub: { color: '#FFE0E0', fontSize: 12, marginTop: 2 },
  vipPromoBtn: { backgroundColor: '#FFF', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  vipPromoBtnText: { color: '#FF2A38', fontSize: 13, fontWeight: '700' },
  verticalList: { marginTop: 12, gap: 16 },
  videoItem: { flexDirection: 'row', gap: 12 },
  thumbWrapper: { position: 'relative' },
  videoThumb: { width: 140, height: 80, borderRadius: 8 },
  durationBadge: { position: 'absolute', bottom: 4, right: 4, backgroundColor: 'rgba(0,0,0,0.8)', paddingHorizontal: 4, paddingVertical: 2, borderRadius: 4 },
  durationText: { color: '#FFF', fontSize: 10, fontWeight: '600' },
  vipBadge: { position: 'absolute', top: 4, left: 4, backgroundColor: '#FFD700', paddingHorizontal: 4, paddingVertical: 1, borderRadius: 4 },
  vipBadgeText: { color: '#000', fontSize: 9, fontWeight: '800' },
  videoInfo: { flex: 1, justifyContent: 'space-between' },
  videoTitle: { color: '#FFF', fontSize: 14, fontWeight: '600', lineHeight: 18 },
  creatorRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  creatorAvatar: { width: 16, height: 16, borderRadius: 8 },
  creatorName: { color: '#AAA', fontSize: 12 },
  videoMeta: { color: '#666', fontSize: 11 },
});

