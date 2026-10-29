export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  views: string;
  publishedAt: string;
  category: string;
  isVipOnly?: boolean;
  creator: {
    id: string;
    name: string;
    avatar: string;
    subscribers: string;
    verified?: boolean;
  };
  episodes?: {
    id: string;
    title: string;
    duration: string;
    thumbnail: string;
    videoUrl: string;
  }[];
  rating: number;
  tags: string[];
}

export interface ShortItem {
  id: string;
  title: string;
  videoUrl: string;
  creator: {
    name: string;
    avatar: string;
  };
  likes: string;
  comments: string;
  shares: string;
  songName: string;
}

export const CATEGORIES = [
  { id: 'all', name: 'Tất cả' },
  { id: 'film', name: 'Phim & Series' },
  { id: 'anime', name: 'Anime & Hoạt hình' },
  { id: 'comedy', name: 'Hài kịch' },
  { id: 'lifestyle', name: 'Đời sống & Vlog' },
  { id: 'food', name: 'Ẩm thực & Nấu ăn' },
  { id: 'tech', name: 'Công nghệ' },
  { id: 'gaming', name: 'Game & Esports' },
  { id: 'music', name: 'Âm nhạc' },
];

export const MOCK_VIDEOS: VideoItem[] = [
  {
    id: 'v1',
    title: 'Hành Trình Xuyên Việt Bằng Xe Máy - Tập 1: Khởi Hành Từ Hà Nội',
    description: 'Chuyến phiêu lưu 30 ngày khám phá từng cung đường, ẩm thực và con người dọc dải đất hình chữ S. Tập đầu tiên xuất phát trong sương sớm Hà Nội đi Ninh Bình.',
    thumbnail: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: '24:15',
    views: '1.2M',
    publishedAt: '2 ngày trước',
    category: 'lifestyle',
    rating: 4.9,
    tags: ['Du lịch', 'Xuyên Việt', 'Vlog', 'Trải nghiệm'],
    creator: {
      id: 'c1',
      name: 'Khoai Đi Dạo',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
      subscribers: '1.8M',
      verified: true,
    },
    episodes: [
      { id: 'e1', title: 'Tập 1: Xuất phát Hà Nội - Tràng An', duration: '24:15', thumbnail: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=400', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
      { id: 'e2', title: 'Tập 2: Vượt Đèo Ngang vào Quảng Bình', duration: '28:40', thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
      { id: 'e3', title: 'Tập 3: Cơm gà Hội An & Phố Cổ đêm rằm', duration: '21:10', thumbnail: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
    ],
  },
  {
    id: 'v2',
    title: 'Thần Thú Thức Tỉnh - Series Hoạt Hình Huyền Bí (Tập 1 - 4K)',
    description: 'Một thế giới nơi con người và các linh thú cùng chung sống. Cậu bé Kai vô tình đánh thức Bạch Hổ thần thú và gánh vác sứ mệnh cứu lấy lục địa.',
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: '22:00',
    views: '840K',
    publishedAt: '1 tuần trước',
    category: 'anime',
    isVipOnly: true,
    rating: 4.8,
    tags: ['Anime', 'Hành động', '4K VIP', 'Phép thuật'],
    creator: {
      id: 'c2',
      name: 'Anime Studio VN',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200',
      subscribers: '620K',
      verified: true,
    },
    episodes: [
      { id: 'e1', title: 'Tập 1: Giấc mộng ngàn năm', duration: '22:00', thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
      { id: 'e2', title: 'Tập 2: Phong ấn bị phá vỡ (VIP)', duration: '23:15', thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
    ],
  },
  {
    id: 'v3',
    title: 'Nấu Bữa Cơm Gia Đình 3 Món Chỉ Với 70.000đ Trong 30 Phút',
    description: 'Thực đơn: Canh chua cá lóc, Thịt ba chỉ kho tiêu thơm nức, và Rau muống xào tỏi giòn rụm. Tiết kiệm, ngon cơm chuẩn vị mẹ nấu.',
    thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '14:20',
    views: '2.5M',
    publishedAt: '3 ngày trước',
    category: 'food',
    rating: 5.0,
    tags: ['Món ngon', 'Bữa cơm', 'Tiết kiệm', 'Dễ làm'],
    creator: {
      id: 'c3',
      name: 'Bếp Của Mẹ',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
      subscribers: '3.1M',
      verified: true,
    },
  },
  {
    id: 'v4',
    title: 'Gặp Gỡ Cuối Tuần: Tiểu Phẩm Hài Chuyện Xóm Trọ Sinh Viên',
    description: 'Cười ra nước mắt với những tình huống dở khóc dở cười khi chung trọ: tranh nhau nhà tắm, canh chừng nồi cơm điện và ngày đóng tiền trọ.',
    thumbnail: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    duration: '35:45',
    views: '3.9M',
    publishedAt: '5 ngày trước',
    category: 'comedy',
    rating: 4.7,
    tags: ['Hài hước', 'Sinh viên', 'Giải trí', 'Gia đình'],
    creator: {
      id: 'c4',
      name: 'FAP TV Hài',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      subscribers: '5.2M',
      verified: true,
    },
  },
];

export const MOCK_SHORTS: ShortItem[] = [
  {
    id: 's1',
    title: 'Khi mẹ nhờ thái hành và cái kết nước mắt đầm đìa 😭',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    creator: { name: 'Thánh Hài Hước', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200' },
    likes: '142.5K',
    comments: '1,230',
    shares: '4,520',
    songName: 'Âm thanh gốc - Thánh Hài Hước',
  },
  {
    id: 's2',
    title: 'Góc chill: Một buổi chiều ngắm hoàng hôn bên bờ sông Sài Gòn ✨',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
    creator: { name: 'Sài Gòn Trong Mắt Tôi', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200' },
    likes: '89.2K',
    comments: '584',
    shares: '1,890',
    songName: 'Cơn Mưa Rào - Chill Acoustic',
  },
  {
    id: 's3',
    title: 'Mẹo luộc trứng lòng đào chuẩn đét 6 phút không bao giờ trượt 🥚',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    creator: { name: 'Bếp Của Mẹ', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
    likes: '310K',
    comments: '3,410',
    shares: '12.8K',
    songName: 'Kitchen Vibes - Lofi Beat',
  },
];

export const MOCK_REWARDS = {
  currentStreak: 5,
  points: 480,
  badges: [
    { id: 'b1', title: 'Tín đồ Phim Ảnh', desc: 'Xem trên 10 giờ video', icon: 'film', unlocked: true },
    { id: 'b2', title: 'Chuỗi 7 Ngày', desc: 'Đăng nhập xem video 7 ngày liên tiếp', icon: 'flame', unlocked: true },
    { id: 'b3', title: 'Nhà Đánh Giá', desc: 'Viết 5 bình luận chất lượng', icon: 'star', unlocked: false },
    { id: 'b4', title: 'Thành viên VIP', desc: 'Nâng cấp gói xem không quảng cáo', icon: 'diamond', unlocked: false },
  ],
  tasks: [
    { id: 't1', title: 'Điểm danh hằng ngày', points: 20, done: true },
    { id: 't2', title: 'Xem 15 phút video bất kỳ', points: 50, done: true },
    { id: 't3', title: 'Chia sẻ 1 video cho bạn bè', points: 30, done: false },
    { id: 't4', title: 'Viết 1 bình luận nhận xét', points: 40, done: false },
  ],
  redeemOptions: [
    { id: 'r1', title: '1 Ngày VIP Xem Phim 4K', pointsCost: 300 },
    { id: 'r2', title: '3 Ngày VIP Không Quảng Cáo', pointsCost: 800 },
    { id: 'r3', title: '7 Ngày VIP Trọn Gói', pointsCost: 1500 },
  ],
};

