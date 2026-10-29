import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/auth-context';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  content: string;
  time: string;
  likes: number;
  liked?: boolean;
}

const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'c1',
    author: 'Trần Văn Hùng',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
    rating: 5,
    content: 'Cảnh quay flycam ở Tràng An đẹp mê hồn luôn! Xem mà muốn xách balo lên đi ngay.',
    time: '2 giờ trước',
    likes: 124,
  },
  {
    id: 'c2',
    author: 'Lê Thu Trang',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
    rating: 5,
    content: 'Âm thanh và màu phim xuất sắc quá, chất lượng 4K nét từng chi tiết!',
    time: '5 giờ trước',
    likes: 85,
  },
  {
    id: 'c3',
    author: 'Hoàng Nam',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    rating: 4,
    content: 'Tập này hơi ngắn, hóng tập 2 vượt Đèo Ngang tuần sau nha anh Khoai.',
    time: '1 ngày trước',
    likes: 32,
  },
];

export default function CommentsScreen() {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [newText, setNewText] = useState('');
  const [starCount, setStarCount] = useState(5);

  const handleSendComment = () => {
    if (!newText.trim()) return;
    const newCmt: Comment = {
      id: 'cmt_' + Date.now(),
      author: user.full_name || 'Tôi',
      avatar: user.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      rating: starCount,
      content: newText.trim(),
      time: 'Vừa xong',
      likes: 0,
    };
    setComments([newCmt, ...comments]);
    setNewText('');
    Alert.alert('Thành công', 'Đã gửi bình luận! Bạn nhận được +40 điểm thưởng nhiệm vụ.');
  };

  const toggleLike = (id: string) => {
    setComments(
      comments.map((c) =>
        c.id === id ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 } : c
      )
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Summary */}
      <View style={styles.header}>
        <View>
          <Text style={styles.avgRating}>4.9 ★</Text>
          <Text style={styles.ratingCount}>Dựa trên 1,240 đánh giá</Text>
        </View>
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((s) => (
            <Ionicons key={s} name="star" size={18} color="#FFD700" />
          ))}
        </View>
      </View>

      {/* Comment List */}
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.commentItem}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <View style={styles.authorRow}>
                <Text style={styles.authorName}>{item.author}</Text>
                <Text style={styles.commentTime}>{item.time}</Text>
              </View>

              <View style={styles.itemStars}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Ionicons
                    key={s}
                    name={s <= item.rating ? 'star' : 'star-outline'}
                    size={12}
                    color="#FFD700"
                  />
                ))}
              </View>

              <Text style={styles.commentContent}>{item.content}</Text>

              <TouchableOpacity style={styles.likeBtn} onPress={() => toggleLike(item.id)}>
                <Ionicons
                  name={item.liked ? 'heart' : 'heart-outline'}
                  size={16}
                  color={item.liked ? '#FF2A38' : '#777'}
                />
                <Text style={[styles.likeCount, item.liked && { color: '#FF2A38' }]}>{item.likes}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Input Box */}
      <View style={styles.inputSection}>
        <View style={styles.starSelectRow}>
          <Text style={styles.starSelectLabel}>Đánh giá của bạn: </Text>
          {[1, 2, 3, 4, 5].map((s) => (
            <TouchableOpacity key={s} onPress={() => setStarCount(s)}>
              <Ionicons
                name={s <= starCount ? 'star' : 'star-outline'}
                size={22}
                color="#FFD700"
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Viết nhận xét của bạn..."
            placeholderTextColor="#666"
            value={newText}
            onChangeText={setNewText}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSendComment}>
            <Ionicons name="send" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0E' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#1F1F2A' },
  avgRating: { color: '#FFF', fontSize: 24, fontWeight: '800' },
  ratingCount: { color: '#777', fontSize: 12, marginTop: 2 },
  starsRow: { flexDirection: 'row', gap: 4 },
  list: { padding: 16, gap: 16 },
  commentItem: { flexDirection: 'row', gap: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  authorRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  authorName: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  commentTime: { color: '#666', fontSize: 11 },
  itemStars: { flexDirection: 'row', gap: 2, marginVertical: 3 },
  commentContent: { color: '#CCC', fontSize: 13, lineHeight: 18 },
  likeBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  likeCount: { color: '#777', fontSize: 12 },
  inputSection: { padding: 12, backgroundColor: '#14141C', borderTopWidth: 1, borderColor: '#20202A' },
  starSelectRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8 },
  starSelectLabel: { color: '#AAA', fontSize: 12 },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  input: { flex: 1, height: 44, backgroundColor: '#1E1E2A', borderRadius: 22, paddingHorizontal: 16, color: '#FFF', fontSize: 14 },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FF2A38', justifyContent: 'center', alignItems: 'center' },
});

