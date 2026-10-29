import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_VIDEOS } from '@/constants/mock-data';

interface Playlist {
  id: string;
  name: string;
  count: number;
  cover: string;
  isPrivate: boolean;
}

const INITIAL_PLAYLISTS: Playlist[] = [
  { id: 'p1', name: 'Phim & Series cuối tuần', count: 4, cover: MOCK_VIDEOS[0].thumbnail, isPrivate: false },
  { id: 'p2', name: 'Hài kịch xả stress đêm muộn', count: 2, cover: MOCK_VIDEOS[3].thumbnail, isPrivate: true },
  { id: 'p3', name: 'Món ngon mỗi ngày cần thử', count: 1, cover: MOCK_VIDEOS[2].thumbnail, isPrivate: false },
];

export default function PlaylistsScreen() {
  const [playlists, setPlaylists] = useState<Playlist[]>(INITIAL_PLAYLISTS);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleCreate = () => {
    if (!newTitle.trim()) return;
    const newPl: Playlist = {
      id: 'pl_' + Date.now(),
      name: newTitle.trim(),
      count: 0,
      cover: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400',
      isPrivate,
    };
    setPlaylists([newPl, ...playlists]);
    setNewTitle('');
    setShowModal(false);
    Alert.alert('Thành công', `Đã tạo danh sách phát "${newPl.name}"!`);
  };

  return (
    <View style={styles.container}>
      {/* Top action */}
      <View style={styles.topBar}>
        <Text style={styles.countText}>{playlists.length} Danh sách phát</Text>
        <TouchableOpacity style={styles.createBtn} onPress={() => setShowModal(true)}>
          <Ionicons name="add" size={18} color="#FFF" />
          <Text style={styles.createBtnText}>Tạo mới</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => router.push(`/watch/${MOCK_VIDEOS[0].id}`)}>
            <Image source={{ uri: item.cover }} style={styles.cover} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.name}</Text>
              <View style={styles.metaRow}>
                <Ionicons
                  name={item.isPrivate ? 'lock-closed' : 'globe-outline'}
                  size={12}
                  color="#777"
                />
                <Text style={styles.metaText}>
                  {item.isPrivate ? 'Riêng tư' : 'Công khai'} · {item.count} video
                </Text>
              </View>
            </View>
            <Ionicons name="play-circle-outline" size={28} color="#FFF" />
          </TouchableOpacity>
        )}
      />

      {/* Modal Tạo Playlist */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalBox}>
            <Text style={styles.modalHeading}>Tạo danh sách phát mới</Text>

            <TextInput
              style={styles.input}
              placeholder="Nhập tên playlist (ví dụ: Xem lúc rảnh)"
              placeholderTextColor="#666"
              value={newTitle}
              onChangeText={setNewTitle}
              autoFocus
            />

            <TouchableOpacity
              style={styles.privacyToggle}
              onPress={() => setIsPrivate(!isPrivate)}>
              <Ionicons
                name={isPrivate ? 'checkbox' : 'square-outline'}
                size={20}
                color={isPrivate ? '#FF2A38' : '#777'}
              />
              <Text style={styles.privacyText}>Đặt làm danh sách phát riêng tư</Text>
            </TouchableOpacity>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowModal(false)}>
                <Text style={styles.cancelText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmBtn} onPress={handleCreate}>
                <Text style={styles.confirmText}>Tạo danh sách</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0E' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#1F1F2A' },
  countText: { color: '#888', fontSize: 13, fontWeight: '600' },
  createBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#FF2A38', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  createBtnText: { color: '#FFF', fontSize: 13, fontWeight: '700' },
  list: { padding: 16, gap: 14 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#14141C', borderRadius: 12, padding: 10, gap: 12 },
  cover: { width: 70, height: 70, borderRadius: 8 },
  info: { flex: 1 },
  title: { color: '#FFF', fontSize: 15, fontWeight: '700' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  metaText: { color: '#777', fontSize: 12 },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', padding: 24 },
  modalBox: { backgroundColor: '#181824', borderRadius: 16, padding: 20, gap: 16 },
  modalHeading: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  input: { height: 48, backgroundColor: '#20202E', borderRadius: 10, paddingHorizontal: 14, color: '#FFF', fontSize: 14 },
  privacyToggle: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  privacyText: { color: '#BBB', fontSize: 13 },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12, marginTop: 8 },
  cancelBtn: { paddingHorizontal: 14, paddingVertical: 8 },
  cancelText: { color: '#888', fontSize: 14, fontWeight: '600' },
  confirmBtn: { backgroundColor: '#FF2A38', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  confirmText: { color: '#FFF', fontSize: 14, fontWeight: '700' },
});

