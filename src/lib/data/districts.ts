export type District = {
  name: string;
  x: number;
  y: number;
  description: string;
};

export const DISTRICTS: District[] = [
  {
    name: "Nilüfer",
    x: 88,
    y: 150,
    description: "Merkez ekibimizin konuşlandığı, en hızlı yanıt verilen bölge.",
  },
  {
    name: "Osmangazi",
    x: 190,
    y: 130,
    description: "Konut ve işyerlerinde düzenli periyodik kontrol hizmeti.",
  },
  {
    name: "Yıldırım",
    x: 260,
    y: 110,
    description: "Sanayi ve depo bölgelerine yönelik geniş kapsamlı uygulamalar.",
  },
  {
    name: "Mudanya",
    x: 60,
    y: 60,
    description: "Sahil şeridi işletmeleri için mevsimsel haşere kontrolü.",
  },
  {
    name: "Gemlik",
    x: 290,
    y: 55,
    description: "Liman ve depolama tesislerinde fümigasyon ve genel ilaçlama.",
  },
  {
    name: "Karacabey",
    x: 40,
    y: 200,
    description: "Tarım ve hayvancılık işletmelerine özel haşere yönetimi.",
  },
];
