export interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  accent: string;
}

export const SLIDES: Slide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=3840&h=2160&fit=crop&q=90",
    title: "Vịnh Hạ Long",
    subtitle: "Di sản thiên nhiên thế giới giữa ngàn đảo đá",
    accent: "#3ec9d1",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1555921015-5532091f6026?w=3840&h=2160&fit=crop&q=90",
    title: "Phố Cổ Hội An",
    subtitle: "Đèn lồng lung linh bên dòng sông Thu Bồn",
    accent: "#e6a855",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=3840&h=2160&fit=crop&q=90",
    title: "Ruộng Bậc Thang",
    subtitle: "Mùa lúa chín vàng trên đỉnh Mù Cang Chải",
    accent: "#a8c44a",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=3840&h=2160&fit=crop&q=90",
    title: "Sapa",
    subtitle: "Bản làng ẩn hiện trong sương mù Tây Bắc",
    accent: "#6aab73",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=3840&h=2160&fit=crop&q=90",
    title: "Ninh Bình",
    subtitle: "Tràng An hùng vĩ — Hạ Long trên cạn",
    accent: "#7aaa8a",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=3840&h=2160&fit=crop&q=90",
    title: "Đà Lạt",
    subtitle: "Thành phố ngàn hoa giữa cao nguyên mộng mơ",
    accent: "#c97bb5",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1573455494060-c5595004fb6c?w=3840&h=2160&fit=crop&q=90",
    title: "Phong Nha",
    subtitle: "Hang động kỳ vĩ nhất hành tinh",
    accent: "#5b9fc9",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1540611025311-01df3cef54b5?w=3840&h=2160&fit=crop&q=90",
    title: "Phú Quốc",
    subtitle: "Hoàng hôn rực rỡ trên đảo ngọc phương Nam",
    accent: "#e07345",
  },
];
