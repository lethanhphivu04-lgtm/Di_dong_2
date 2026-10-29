import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/context/auth-context';
import { MOCK_REWARDS } from '@/constants/mock-data';

export default function RewardsScreen() {
  const { user, redeemVipWithPoints } = useAuth();

  const handleRedeem = (days: number, cost: number, title: string) => {
    if (user.points < cost) {
      Alert.alert('Chưa đủ điểm', `Bạn cần ${cost} điểm để đổi ${title}. Hãy hoàn thành thêm nhiệm vụ mỗi ngày nhé!`);
      return;
    }

    Alert.alert('Xác nhận đổi thưởng', `Dùng ${cost} điểm để nhận "${title}"?`, [
      { text: 'Hủy' },
      {
        text: 'Đổi ngay',
        onPress: () => {
          const success = redeemVipWithPoints(days, cost);
          if (success) {
            Alert.alert('Chúc mừng! 🎉', `Bạn đã đổi thành công "${title}". Tài khoản đã được kích hoạt VIP!`);
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16, paddingBottom: 40, gap: 20 }}>
      {/* Streak & Points Banner */}
      <LinearGradient
        colors={['#FF6B00', '#FF2A38']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroCard}>
        <View style={styles.heroTop}>
          <View>
            <Text style={styles.streakLabel}>CHUỖI NGÀY XEM LIÊN TIẾP</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
              <Ionicons name="flame" size={28} color="#FFD700" />
              <Text style={styles.streakCount}>{user.streak} ngày</Text>
            </View>
          </View>

          <View style={styles.pointsBadge}>
            <Text style={styles.pointsText}>{user.points}</Text>
            <Text style={styles.pointsSub}>Điểm thưởng</Text>
          </View>
        </View>

        <Text style={styles.streakNote}>
          Điểm danh ngày mai để duy trì chuỗi và nhận thêm +30 điểm thưởng!
        </Text>
      </LinearGradient>

      {/* Cửa hàng đổi ngày VIP */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🎁 Đổi Điểm Lấy Ngày VIP</Text>
          <Text style={styles.sectionSub}>Xem không giới hạn, không cần nạp tiền</Text>
        </View>

        <View style={styles.redeemList}>
          {MOCK_REWARDS.redeemOptions.map((opt) => {
            const canAfford = user.points >= opt.pointsCost;
            const days = opt.id === 'r1' ? 1 : opt.id === 'r2' ? 3 : 7;

            return (
              <View key={opt.id} style={styles.redeemCard}>
                <View style={styles.redeemInfo}>
                  <Ionicons name="diamond" size={22} color="#FFD700" />
                  <View>
                    <Text style={styles.redeemTitle}>{opt.title}</Text>
                    <Text style={styles.redeemCost}>{opt.pointsCost} điểm</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.redeemBtn, !canAfford && styles.redeemBtnDisabled]}
                  onPress={() => handleRedeem(days, opt.pointsCost, opt.title)}>
                  <Text style={[styles.redeemBtnText, !canAfford && { color: '#888' }]}>
                    {canAfford ? 'Đổi ngay' : 'Chưa đủ'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>

      {/* Nhiệm vụ hằng ngày */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 Nhiệm Vụ Hằng Ngày</Text>
        <View style={styles.taskList}>
          {MOCK_REWARDS.tasks.map((task) => (
            <View key={task.id} style={styles.taskCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text style={styles.taskPoints}>+{task.points} điểm thưởng</Text>
              </View>

              {task.done ? (
                <View style={styles.doneBadge}>
                  <Ionicons name="checkmark" size={14} color="#30D158" />
                  <Text style={styles.doneText}>Đã nhận</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.claimBtn}
                  onPress={() => Alert.alert('Nhiệm vụ', `Hãy thực hiện "${task.title}" để nhận ${task.points} điểm.`)}>
                  <Text style={styles.claimText}>Làm ngay</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Huy hiệu thành tựu */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏆 Huy Hiệu Thành Tựu</Text>
        <View style={styles.badgeGrid}>
          {MOCK_REWARDS.badges.map((badge) => (
            <View
              key={badge.id}
              style={[styles.badgeCard, !badge.unlocked && { opacity: 0.4 }]}>
              <Ionicons
                name={badge.icon as any}
                size={28}
                color={badge.unlocked ? '#FFD700' : '#666'}
              />
              <Text style={styles.badgeTitle}>{badge.title}</Text>
              <Text style={styles.badgeDesc}>{badge.desc}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0E' },
  heroCard: { borderRadius: 16, padding: 18, gap: 14 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  streakLabel: { color: '#FFE0B2', fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  streakCount: { color: '#FFF', fontSize: 26, fontWeight: '900' },
  pointsBadge: { backgroundColor: 'rgba(0,0,0,0.3)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, alignItems: 'center' },
  pointsText: { color: '#FFD700', fontSize: 20, fontWeight: '800' },
  pointsSub: { color: '#DDD', fontSize: 11 },
  streakNote: { color: '#FFF', fontSize: 12, lineHeight: 16 },
  section: { gap: 10 },
  sectionHeader: { gap: 2 },
  sectionTitle: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  sectionSub: { color: '#777', fontSize: 12 },
  redeemList: { gap: 10 },
  redeemCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#14141C', padding: 14, borderRadius: 12 },
  redeemInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  redeemTitle: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  redeemCost: { color: '#FFD700', fontSize: 12, fontWeight: '700', marginTop: 2 },
  redeemBtn: { backgroundColor: '#FF2A38', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  redeemBtnDisabled: { backgroundColor: '#20202A' },
  redeemBtnText: { color: '#FFF', fontSize: 12, fontWeight: '700' },
  taskList: { gap: 8 },
  taskCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#14141C', padding: 14, borderRadius: 10 },
  taskTitle: { color: '#EEE', fontSize: 13, fontWeight: '600' },
  taskPoints: { color: '#FF6B00', fontSize: 11, fontWeight: '700', marginTop: 2 },
  doneBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(48,209,88,0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  doneText: { color: '#30D158', fontSize: 11, fontWeight: '700' },
  claimBtn: { backgroundColor: '#20202E', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  claimText: { color: '#AAA', fontSize: 12, fontWeight: '600' },
  badgeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  badgeCard: { width: '48%', backgroundColor: '#14141C', padding: 14, borderRadius: 12, alignItems: 'center', gap: 6 },
  badgeTitle: { color: '#FFF', fontSize: 13, fontWeight: '700', textAlign: 'center' },
  badgeDesc: { color: '#777', fontSize: 11, textAlign: 'center', lineHeight: 14 },
});

