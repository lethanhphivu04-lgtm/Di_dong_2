import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Tự động chuyển trang sau 2s nếu user không ấn
      router.replace('/(tabs)');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={['#16161F', '#0B0B0E', '#000000']} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoCircle}>
          <Ionicons name="play" size={54} color="#FFF" style={{ marginLeft: 6 }} />
        </View>
        <Text style={styles.title}>PlayBox</Text>
        <Text style={styles.tagline}>Xem video mọi lúc, mọi nơi không giới hạn</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.btnStart} onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.btnText}>Bắt đầu trải nghiệm</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnLogin} onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.loginText}>Đã có tài khoản? Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-between', padding: 24 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logoCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#FF2A38',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF2A38',
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  title: { fontSize: 36, fontWeight: '800', color: '#FFF', marginTop: 20, letterSpacing: 1 },
  tagline: { fontSize: 15, color: '#A0A0B0', marginTop: 8, textAlign: 'center' },
  footer: { paddingBottom: 20, gap: 12 },
  btnStart: {
    backgroundColor: '#FF2A38',
    paddingVertical: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  btnLogin: { alignItems: 'center', paddingVertical: 8 },
  loginText: { color: '#BBB', fontSize: 14 },
});

