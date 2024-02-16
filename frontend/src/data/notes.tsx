interface INota {
  id: number;
  source: string;
  image?: string;
  volume?: number;
  speed?: number;
}

const notes = [
  // {
  //   id: 0,
  //   source: "Давай закурим (Френкель, Табачников).xml",
  //   name: "Давай закурим (Френкель, Табачников)",
  //   image: "Давай закурим (Френкель, Табачников).png",
  //   speed: 1,
  //   volume: 50,
  // },

  // {
  //   id: 1,
  //   source: "До свидания, мальчики (Молчанов, Окуджава).xml",
  //   name: "До свидания, мальчики (Молчанов, Окуджава)",
  //   image: "До свидания, мальчики (Молчанов, Окуджава).png",
  //   speed: 2,
  //   volume: 60,
  // },
  {
    id: 4,
    source: 'n0002289.mvt1.xml',
    name: 'И. С. Бах',
    image: 'm1.png',
    volume: 50,
    speed: 0.7,
  },
  {
    id: 5,
    source: 'n0002220.xml',
    name: 'Крестьяночка',
    image: 'n0002220.jpg',
    volume: 100,
    speed: 1,
  },
  {
    id: 6,
    source: 'n0002318.xml',
    name: 'Жан Сибелиус. Баркарола',
    image: 'n0002318.jpg',
    volume: 100,
    speed: 1,
  },
  {
    id: 7,
    source: 'n0001119.mvt1.xml',
    name: 'Ой рано рано куры запели>',
    image: 'n0001119.jpg',
    volume: 60,
  },
  {
    id: 8,
    source: 'n0002384.xml',
    name: 'Игорь Стравинский. Пульчинелла',
    image: 'n0002384.jpg',
    speed: 1,
  },
  {
    id: 9,
    source: 'n0001646.xml',
    name: 'Слеза мой взор туманит',
    image: 'n0001646.jpg',
    volume: 100,
    speed: 1,
  },
  {
    id: 10,
    source: 'n0002382.mvt5.xml',
    name: 'Игорь Стравинский. les cinq doigts',
    image: 'n0002382.jpg',
    speed: 0.9,
    volume: 80,
  },
];

export default notes;
