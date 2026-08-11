import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Seed grounded in the real rallymovement.com catalogue (Shop all):
 * retro-chic ready-to-wear, denim, knitwear + the icon bag. Prices in USD.
 * Colorways use the brand’s poetic naming (Tropicana, Porcelain, Sepia, Terracotta).
 * Photos are Unsplash mockups (swap for the client’s real product shots).
 */
const U = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

type SeedVariant = { colorway: string; hex: string; gradient: string; stock: number };
type SeedProduct = {
  slug: string;
  name: string;
  category: string;
  subtitle?: string;
  description: string;
  material?: string;
  price: number;
  compareAt?: number;
  badge?: string;
  featured?: boolean;
  image?: string;
  variants: SeedVariant[];
};

const products: SeedProduct[] = [
  {
    slug: "duo-leather-tag",
    name: "Duo Leather Tag",
    category: "Bags",
    subtitle: "The Icon",
    material: "Microfiber leather",
    price: 48,
    badge: "Icon",
    featured: true,
    image: U("1548036328-c9fa89d128fa"),
    description:
      "A duo leather tag bag with an adjustable strap, in three patterns including Vase, Coral and Fish — small figures that remind you of vacation time. The Rälly icon, instantly recognisable.",
    variants: [
      { colorway: "Coral", hex: "#F9544C", gradient: "g-scarlet", stock: 14 },
      { colorway: "Vase", hex: "#C9BCA6", gradient: "g-holly", stock: 10 },
    ],
  },
  {
    slug: "patina-blouse",
    name: "Patina Blouse — Sepia",
    category: "Tops",
    subtitle: "Signature",
    material: "Sandwashed silk",
    price: 59,
    badge: "New",
    featured: true,
    image: U("1485462537746-965f33f7f6a7"),
    description:
      "A loose shirt detailed with a pleated shoulder and silver buttons stamped with an iconic Rälly logo. Embroidered Patina at the sleeve cuff — worn daily or as a bikini cover-up.",
    variants: [
      { colorway: "Sepia", hex: "#B08A5A", gradient: "g-terracotta", stock: 12 },
      { colorway: "Porcelain", hex: "#EFE7D8", gradient: "g-holly", stock: 9 },
    ],
  },
  {
    slug: "athena-midi-dress",
    name: "Athena Midi Dress",
    category: "Ready-to-Wear",
    subtitle: "Resort Summer",
    material: "Crochet cotton",
    price: 120,
    featured: true,
    image: U("1515372039744-b8f02a3ae446"),
    description:
      "An open-knit midi that drapes and moves with the day — from the harbour to the evening. Layer over swim or wear alone.",
    variants: [{ colorway: "Ecru", hex: "#E7DECB", gradient: "g-holly", stock: 8 }],
  },
  {
    slug: "symbolic-blazer",
    name: "Symbolic blazer",
    category: "Denim",
    subtitle: "Tailoring",
    material: "Rigid denim",
    price: 157,
    featured: true,
    image: U("1591047139829-d91aecb6caea"),
    description:
      "A double-breasted denim blazer with a monogram button. Masculine tailoring, feminine line — the Rälly tension in one piece.",
    variants: [{ colorway: "Indigo", hex: "#33507C", gradient: "g-denim", stock: 11 }],
  },
  {
    slug: "denim-corset",
    name: "Denim corset",
    category: "Denim",
    subtitle: "SS · Buckle",
    material: "Washed denim",
    price: 65,
    badge: "Sold Out",
    image: U("1529903384028-929ae5dccdf1"),
    description:
      "An eye-catching front-clasp buckle anchors this structured denim corset. Our most-wanted silhouette, back in limited numbers.",
    variants: [{ colorway: "Indigo", hex: "#3C5A86", gradient: "g-denim", stock: 0 }],
  },
  {
    slug: "generation-pockets-shirt",
    name: "Generation pockets shirt",
    category: "Tops",
    subtitle: "Two colorways",
    material: "Ribbed knit",
    price: 52,
    featured: true,
    image: U("1503342217505-b0a15ec3261c"),
    description:
      "A cropped ribbed shirt with utility pockets and mother-of-pearl buttons. Shown in Tropicana and Porcelain.",
    variants: [
      { colorway: "Tropicana", hex: "#F2872F", gradient: "g-tropicana", stock: 16 },
      { colorway: "Porcelain", hex: "#EFE7D8", gradient: "g-holly", stock: 13 },
    ],
  },
  {
    slug: "spining-top",
    name: "Spining top",
    category: "Tops",
    subtitle: "Cut-out",
    material: "Stretch jersey",
    price: 52,
    image: U("1554568218-0f1715e72254"),
    description:
      "Patterned cut-outs trace the body in the Spining top — boundary-pushing but wearable, exactly where Rälly likes to sit.",
    variants: [
      { colorway: "Domino", hex: "#E6DDCF", gradient: "g-holly", stock: 12 },
      { colorway: "Rosa", hex: "#C86E9A", gradient: "g-ido", stock: 7 },
    ],
  },
  {
    slug: "catalans-bralette",
    name: "Catalans Bralette",
    category: "Tops",
    subtitle: "Swim & Sun",
    material: "Knit cotton",
    price: 52,
    image: U("1469334031218-e382a71b716b"),
    description: "A striped knit bralette made for the harbour wall and the long lunch after.",
    variants: [{ colorway: "Noir", hex: "#26221C", gradient: "g-noir", stock: 15 }],
  },
  {
    slug: "gypset-vest",
    name: "Gypset vest",
    category: "Tops",
    subtitle: "Resort",
    material: "Linen blend",
    price: 52,
    image: U("1496747611176-843222e1e57c"),
    description: "A deep-V linen vest that dresses up or down — the quiet-cool answer to summer evenings.",
    variants: [{ colorway: "Sand", hex: "#D8C7A8", gradient: "g-holly", stock: 10 }],
  },
  {
    slug: "smooth-move-tee",
    name: "Smooth move Slim-fit T-shirt",
    category: "Tops",
    subtitle: "Graphic",
    material: "Cotton jersey",
    price: 38,
    badge: "New",
    image: U("1503341504253-dff4815485f1"),
    description: "A slim graphic tee stamped with the Smooth Move mark — the everyday Rälly staple.",
    variants: [{ colorway: "White", hex: "#EDE7DB", gradient: "g-holly", stock: 24 }],
  },
  {
    slug: "shore-shorts",
    name: "shore shorts — Porcelain",
    category: "Ready-to-Wear",
    subtitle: "Knit",
    material: "Knit cotton",
    price: 52,
    image: U("1487222477894-8943e31ef7b2"),
    description: "High-waisted knit shorts with a patch pocket — beach to bar in one move.",
    variants: [{ colorway: "Porcelain", hex: "#EFE7D8", gradient: "g-holly", stock: 14 }],
  },
  {
    slug: "mosaic-slacks",
    name: "Mosaic Slacks — Terracotta",
    category: "Ready-to-Wear",
    subtitle: "Fluid",
    material: "Cupro",
    price: 75,
    featured: true,
    image: U("1490481651871-ab68de25d43d"),
    description: "Fluid wide-leg slacks in a sun-baked terracotta — pure movement in fabric form.",
    variants: [
      { colorway: "Terracotta", hex: "#B5552B", gradient: "g-terracotta", stock: 12 },
      { colorway: "Noir", hex: "#26221C", gradient: "g-noir", stock: 9 },
    ],
  },
  {
    slug: "4-pockets-jeans",
    name: "4 Pockets jeans",
    category: "Denim",
    subtitle: "Flare",
    material: "Rigid denim",
    price: 76,
    image: U("1541099649105-f69ad21f3246"),
    description: "A high-rise flare with utility pockets and a lived-in wash. The Rälly denim signature.",
    variants: [
      { colorway: "Light Wash", hex: "#9FB2CE", gradient: "g-blue2", stock: 18 },
      { colorway: "Indigo", hex: "#3C5A86", gradient: "g-denim", stock: 12 },
    ],
  },
  {
    slug: "boundary-jeans",
    name: "Boundary jeans",
    category: "Denim",
    subtitle: "Two-tone",
    material: "Rigid denim",
    price: 83,
    image: U("1542272604-787c3835535d"),
    description: "Two-tone panelled jeans that push the line — boundary-pushing, but authentically Rälly.",
    variants: [{ colorway: "Two-tone", hex: "#2E3A4C", gradient: "g-noir", stock: 10 }],
  },
  {
    slug: "terrace-knitband",
    name: "Terrace Knitband",
    category: "Knitwear",
    subtitle: "Accessory",
    material: "Crochet cotton",
    price: 21,
    image: U("1445205170230-053b83016050"),
    description: "A crochet head-band to finish the look — the smallest way into the Rälly world.",
    variants: [{ colorway: "Ivory", hex: "#EFE7D8", gradient: "g-holly", stock: 30 }],
  },
];

function sku(slug: string, colorway: string) {
  return `RM-${slug.toUpperCase().replace(/[^A-Z0-9]+/g, "-")}-${colorway
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "")}`.slice(0, 40);
}

async function main() {
  console.log("Seeding Rälly catalogue…");

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  for (const p of products) {
    await prisma.product.create({
      data: {
        slug: p.slug,
        name: p.name,
        category: p.category,
        subtitle: p.subtitle,
        description: p.description,
        material: p.material,
        price: p.price,
        compareAt: p.compareAt,
        image: p.image,
        badge: p.badge,
        featured: p.featured ?? false,
        variants: {
          create: p.variants.map((v) => ({
            colorway: v.colorway,
            hex: v.hex,
            gradient: v.gradient,
            stock: v.stock,
            sku: sku(p.slug, v.colorway),
          })),
        },
      },
    });
  }

  // Sample orders so the admin dashboard has data on first run (USD).
  const blazer = await prisma.product.findUnique({ where: { slug: "symbolic-blazer" } });
  const dress = await prisma.product.findUnique({ where: { slug: "athena-midi-dress" } });
  const bag = await prisma.product.findUnique({ where: { slug: "duo-leather-tag" } });
  if (blazer && dress && bag) {
    await prisma.order.create({
      data: {
        number: "RM-1001",
        email: "chosita.p@example.com",
        firstName: "Chosita",
        lastName: "P.",
        address1: "128 Sukhumvit Soi 24",
        city: "Bangkok",
        postalCode: "10110",
        subtotal: 168,
        shipping: 0,
        total: 168,
        status: "paid",
        items: {
          create: [
            { productId: dress.id, name: dress.name, colorway: "Ecru", price: 120, quantity: 1 },
            { productId: bag.id, name: bag.name, colorway: "Coral", price: 48, quantity: 1 },
          ],
        },
      },
    });
    await prisma.order.create({
      data: {
        number: "RM-1002",
        email: "tanya.w@example.com",
        firstName: "Tanya",
        lastName: "W.",
        address1: "The Commons, Thonglor Soi 17",
        city: "Bangkok",
        postalCode: "10110",
        subtotal: 157,
        shipping: 0,
        total: 157,
        status: "shipped",
        items: {
          create: [{ productId: blazer.id, name: blazer.name, colorway: "Indigo", price: 157, quantity: 1 }],
        },
      },
    });
  }

  const count = await prisma.product.count();
  console.log(`Done. ${count} products seeded.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
