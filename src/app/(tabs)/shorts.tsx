import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useVideoPlayer, VideoView } from 'expo-video';
import { MOCK_SHORTS, ShortItem } from '@/constants/mock-data';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

function ShortVideoItem({ item, isActive }: { item: ShortItem; isActive: boolean }) {
  const [liked, setLiked] = useState(false);

  const player = useVideoPlayer(item.videoUrl, (p) => {
    p.loop = true;
    if (isActive) p.play();
  });

  React.useEffect(() => {
    if (player) {
      if (isActive) player.play();
      else player.pause();
    }
  }, [isActive, player]);

  const handleShare = () => {
    Share.share({ message: `Xem video ngắn "${item.title}" trên PlayBox!` });
  };

  return (
    <View style={styles.page}>
      <VideoView style={styles.video} player={player} contentFit="cover" nativeControls={false} />

      {/* Right Action Bar */}
      <View style={styles.rightActions}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => setLiked(!liked)}>
          <Ionicons name={liked ? 'heart' : 'heart-outline'} size={32} color={liked ? '#FF2A38' : '#FFF'} />
          <Text style={styles.actionText}>{liked ? '143K' : item.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="chatbubble-ellipses-outline" size={30} color="#FFF" />
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={handleShare}>
          <Ionicons name="share-social-outline" size={30} color="#FFF" />
          <Text style={styles.actionText}>{item.shares}</Text>
        </TouchableOpacity>

        <View style={styles.discWrap}>
          <Ionicons name="disc" size={28} color="#FFD700" />
        </View>
      </View>

      {/* Bottom Info */}
      <View style={styles.bottomInfo}>
        <View style={styles.creatorRow}>
          <Image source={{ uri: item.creator.avatar }} style={styles.creatorAvatar} />
          <Text style={styles.creatorName}>@{item.creator.name}</Text>
          <View style={styles.followBadge}>
            <Text style={styles.followText}>Theo dõi</Text>
          </View>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>

        <View style={styles.songRow}>
          <Ionicons name="musical-notes" size={14} color="#FFF" />
          <Text style={styles.songName} numberOfLines={1}>
            {item.songName}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function ShortsScreen() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_SHORTS}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.y / (SCREEN_HEIGHT - 60));
          setActiveIndex(index);
        }}
        renderItem={({ item, index }) => (
          <ShortVideoItem item={item} isActive={activeIndex === index} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  page: { width: '100%', height: SCREEN_HEIGHT - 60, position: 'relative' },
  video: { width: '100%', height: '100%' },
  rightActions: { position: 'absolute', right: 12, bottom: 80, alignItems: 'center', gap: 20 },
  actionBtn: { alignItems: 'center', gap: 4 },
  actionText: { color: '#FFF', fontSize: 12, fontWeight: '700' },
  discWrap: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#181822', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  bottomInfo: { position: 'absolute', left: 16, right: 80, bottom: 20, gap: 8 },
  creatorRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  creatorAvatar: { width: 34, height: 34, borderRadius: 17, borderWidth: 1, borderColor: '#FFF' },
  creatorName: { color: '#FFF', fontSize: 15, fontWeight: '700' },
  followBadge: { backgroundColor: '#FF2A38', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  followText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
  title: { color: '#FFF', fontSize: 14, lineHeight: 20 },
  songRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  songName: { color: '#DDD', fontSize: 12 },
});

