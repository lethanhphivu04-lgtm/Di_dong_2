import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/context/auth-context';

export default function VipCheckoutScreen() {
  const { user, upgradeVip } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<'month' | 'year'>('month');
  const [paymentMethod, setPaymentMethod] = useState<'vnpay' | 'momo' | 'card'>('vnpay');
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = [
    {
      id: 'month' as const,
      name: 'Gói VIP 1 Tháng',
      price: '59.000đ',
      sub: '59k/tháng · Gia hạn tự động',
      tag: null,
    },
    {
      id: 'year' as const,
      name: 'Gói VIP 1 Năm (Tiết kiệm)',
      price: '499.000đ',
      sub: '~41k/tháng · Tiết kiệm 30%',
      tag: 'HOT NHẤT',
    },
  ];

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      upgradeVip(selectedPlan === 'year' ? 'Gói Năm' : 'Gói Tháng');
      Alert.alert(
        'Thanh toán thành công! 🎉',
        `Chúc mừng bạn đã nâng cấp thành công ${selectedPlan === 'year' ? 'Gói VIP 1 Năm' : 'Gói VIP 1 Tháng'}. Trải nghiệm xem phim 4K không quảng cáo đã được kích hoạt!`,
        [{ text: 'Trải nghiệm ngay', onPress: () => router.replace('/(tabs)') }]
      );
    }, 1500);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16, paddingBottom: 40, gap: 20 }}>
      {/* Header Banner */}
      <LinearGradient colors={['#D4AF37', '#FFD700', '#FFA500']} style={styles.vipBanner}>
        <Ionicons name="diamond" size={32} color="#000" />
        <View style={{ flex: 1 }}>
          <Text style={styles.bannerTitle}>Đặc Quyền PlayBox VIP</Text>
          <Text style={styles.bannerSub}>Xem phim 4K không quảng cáo, mở khóa toàn bộ series</Text>
        </View>
      </LinearGradient>

      {/* Select Plan */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. CHỌN GÓI THÀNH VIÊN</Text>
        <View style={styles.planList}>
          {plans.map((p) => {
            const active = selectedPlan === p.id;
            return (
              <TouchableOpacity
                key={p.id}
                style={[styles.planCard, active && styles.planCardActive]}
                onPress={() => setSelectedPlan(p.id)}>
                {p.tag && (
                  <View style={styles.planTag}>
                    <Text style={styles.planTagText}>{p.tag}</Text>
                  </View>
                )}
                <View style={{ flex: 1 }}>
                  <Text style={[styles.planName, active && { color: '#FFF' }]}>{p.name}</Text>
                  <Text style={styles.planSub}>{p.sub}</Text>
                </View>
                <Text style={styles.planPrice}>{p.price}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Benefits Table */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. QUYỀN LỢI SO SÁNH</Text>
        <View style={styles.benefitsCard}>
          <View style={styles.benefitRow}>
            <Text style={styles.benefitText}>Quảng cáo gây gián đoạn</Text>
            <Text style={styles.benefitValVIP}>Không quảng cáo</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.benefitRow}>
            <Text style={styles.benefitText}>Chất lượng hình ảnh</Text>
            <Text style={styles.benefitValVIP}>4K Ultra HD</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.benefitRow}>
            <Text style={styles.benefitText}>Tải về xem Offline</Text>
            <Text style={styles.benefitValVIP}>Không giới hạn</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.benefitRow}>
            <Text style={styles.benefitText}>Số thiết bị cùng lúc</Text>
            <Text style={styles.benefitValVIP}>4 thiết bị</Text>
          </View>
        </View>
      </View>

      {/* Payment Methods */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. PHƯƠNG THỨC THANH TOÁN</Text>
        <View style={styles.methodsList}>
          <TouchableOpacity
            style={[styles.methodCard, paymentMethod === 'vnpay' && styles.methodCardActive]}
            onPress={() => setPaymentMethod('vnpay')}>
            <Ionicons name="qr-code-outline" size={20} color="#FF2A38" />
            <Text style={styles.methodName}>Cổng VNPay QR / Thẻ ATM nội địa</Text>
            {paymentMethod === 'vnpay' && <Ionicons name="checkmark-circle" size={18} color="#FF2A38" />}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.methodCard, paymentMethod === 'momo' && styles.methodCardActive]}
            onPress={() => setPaymentMethod('momo')}>
            <Ionicons name="wallet-outline" size={20} color="#D82D8B" />
            <Text style={styles.methodName}>Ví điện tử MoMo</Text>
            {paymentMethod === 'momo' && <Ionicons name="checkmark-circle" size={18} color="#FF2A38" />}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.methodCard, paymentMethod === 'card' && styles.methodCardActive]}
            onPress={() => setPaymentMethod('card')}>
            <Ionicons name="card-outline" size={20} color="#4A90E2" />
            <Text style={styles.methodName}>Thẻ Quốc tế (Visa / Mastercard)</Text>
            {paymentMethod === 'card' && <Ionicons name="checkmark-circle" size={18} color="#FF2A38" />}
          </TouchableOpacity>
        </View>
      </View>

      {/* Pay Action Button */}
      <TouchableOpacity
        style={[styles.payBtn, isProcessing && { opacity: 0.6 }]}
        disabled={isProcessing}
        onPress={handlePay}>
        <Text style={styles.payBtnText}>
          {isProcessing ? 'Đang xử lý giao dịch...' : `Thanh toán ngay · ${selectedPlan === 'year' ? '499.000đ' : '59.000đ'}`}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0E' },
  vipBanner: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 14, gap: 12 },
  bannerTitle: { color: '#000', fontSize: 16, fontWeight: '800' },
  bannerSub: { color: '#222', fontSize: 12, marginTop: 2 },
  section: { gap: 10 },
  sectionTitle: { color: '#777', fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },
  planList: { gap: 10 },
  planCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#14141C', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#222230', position: 'relative' },
  planCardActive: { borderColor: '#FFD700', backgroundColor: '#1C1910' },
  planTag: { position: 'absolute', top: -10, right: 16, backgroundColor: '#FF2A38', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  planTagText: { color: '#FFF', fontSize: 10, fontWeight: '800' },
  planName: { color: '#DDD', fontSize: 15, fontWeight: '700' },
  planSub: { color: '#777', fontSize: 12, marginTop: 4 },
  planPrice: { color: '#FFD700', fontSize: 16, fontWeight: '800' },
  benefitsCard: { backgroundColor: '#14141C', borderRadius: 12, padding: 14 },
  benefitRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  benefitText: { color: '#AAA', fontSize: 13 },
  benefitValVIP: { color: '#FFD700', fontSize: 13, fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#20202C' },
  methodsList: { gap: 8 },
  methodCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#14141C', padding: 14, borderRadius: 10, gap: 12, borderWidth: 1, borderColor: '#20202C' },
  methodCardActive: { borderColor: '#FF2A38' },
  methodName: { flex: 1, color: '#FFF', fontSize: 13, fontWeight: '600' },
  payBtn: { backgroundColor: '#FF2A38', height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  payBtnText: { color: '#FFF', fontSize: 16, fontWeight: '800' },
});

