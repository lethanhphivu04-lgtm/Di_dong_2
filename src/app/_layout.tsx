import { DarkTheme, DefaultTheme, ThemeProvider, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { AuthProvider } from '@/context/auth-context';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="detail/[id]" options={{ headerShown: true, title: 'Chi tiết phim', headerTintColor: '#fff', headerStyle: { backgroundColor: '#111' } }} />
          <Stack.Screen name="watch/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="comments/[id]" options={{ presentation: 'modal', headerShown: true, title: 'Bình luận & Đánh giá' }} />
          <Stack.Screen name="creator/[id]" options={{ headerShown: true, title: 'Kênh tác giả' }} />
          <Stack.Screen name="search/index" options={{ headerShown: true, title: 'Tìm kiếm' }} />
          <Stack.Screen name="search/results" options={{ headerShown: true, title: 'Kết quả tìm kiếm' }} />
          <Stack.Screen name="category/[id]" options={{ headerShown: true, title: 'Danh mục' }} />
          <Stack.Screen name="library/favorites" options={{ headerShown: true, title: 'Xem sau & Yêu thích' }} />
          <Stack.Screen name="library/playlists" options={{ headerShown: true, title: 'Playlist của tôi' }} />
          <Stack.Screen name="library/history" options={{ headerShown: true, title: 'Lịch sử xem' }} />
          <Stack.Screen name="library/downloads" options={{ headerShown: true, title: 'Tải về xem Offline (VIP)' }} />
          <Stack.Screen name="library/rewards" options={{ headerShown: true, title: 'Điểm thưởng & Chuỗi xem' }} />
          <Stack.Screen name="vip/checkout" options={{ headerShown: true, title: 'Gói VIP & Thanh toán' }} />
          <Stack.Screen name="notifications/index" options={{ headerShown: true, title: 'Thông báo' }} />
        </Stack>
      </ThemeProvider>
    </AuthProvider>
  );
}
