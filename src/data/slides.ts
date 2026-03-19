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
    image: "/slide/da-lat.jpg",
    title: "Vịnh Hạ Long",
    subtitle: "Di sản thiên nhiên thế giới giữa ngàn đảo đá",
    accent: "#3ec9d1",
  },
  {
    id: 2,
    image: "/slide/ninh-binh.jpg",
    title: "Phố Cổ Hội An",
    subtitle: "Đèn lồng lung linh bên dòng sông Thu Bồn",
    accent: "#e6a855",
  },
  {
    id: 3,
    image: "/slide/pho-co-hoi-an.jpg",
    title: "Ruộng Bậc Thang",
    subtitle: "Mùa lúa chín vàng trên đỉnh Mù Cang Chải",
    accent: "#a8c44a",
  },
  {
    id: 4,
    image: "/slide/phong-nha.jpg",
    title: "Sapa",
    subtitle: "Bản làng ẩn hiện trong sương mù Tây Bắc",
    accent: "#6aab73",
  },
  {
    id: 5,
    image: "/slide/phu-quoc.jpg",
    title: "Ninh Bình",
    subtitle: "Tràng An hùng vĩ — Hạ Long trên cạn",
    accent: "#7aaa8a",
  },
  {
    id: 6,
    image: "/slide/ruong-bac-thang.jpg",
    title: "Đà Lạt",
    subtitle: "Thành phố ngàn hoa giữa cao nguyên mộng mơ",
    accent: "#c97bb5",
  },
  {
    id: 7,
    image: "/slide/sapa.jpg",
    title: "Phong Nha",
    subtitle: "Hang động kỳ vĩ nhất hành tinh",
    accent: "#5b9fc9",
  },
  {
    id: 8,
    image: "/slide/vinh-ha-long.jpg",
    title: "Phú Quốc",
    subtitle: "Hoàng hôn rực rỡ trên đảo ngọc phương Nam",
    accent: "#e07345",
  },
];
