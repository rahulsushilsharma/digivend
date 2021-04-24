const firebase = require("firebase");

var firebaseConfig = {
  apiKey: "AIzaSyBucEoNVsF9DMVY5WjH7xHuJK29TPJkdNM",
  authDomain: "digivend-beta.firebaseapp.com",
  databaseURL:
    "https://digivend-beta-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "digivend-beta",
  storageBucket: "digivend-beta.appspot.com",
  messagingSenderId: "841346946498",
  appId: "1:841346946498:web:6290b958c487701711b25b",
  measurementId: "G-D52LPKXD3Q",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function writeInDb(doc, data) {
  db.collection(doc)
    .doc()
    .set(data)
    .then(() => {
      console.log(`Document successfully written!`, doc);
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}

let data = [
  {
    img:
      "https://rukminim1.flixcart.com/image/200/200/jx7uykw0/blanket/c/m/5/swaddle-bag-pink-swaddle-bag-pink-miss-chief-original-imafhqdvhxmh87ym.jpeg?q=70",
    disc_line: "Baby Care",
    promo_line: "Baby Mat, Bedding & More",
    offer_line: "Min 30% Off",
  },
];

// let n = 10;
// while (n--) writeInDb("main_page", data);

// // andra.forEach(ele=>{
// //   writeInDb('anaa', ele);
// // })

let dummyData = [
  {
    img:
      "https://images-na.ssl-images-amazon.com/images/I/81cBECZNHGL._SL1500_.jpg",
    title:
      "Pampers All round Protection Pants, Large size baby diapers (LG), 64 Count",
    disc: `
  Choosing the right diaper size based on baby weight is important. The diaper capacity may vary among babies depending on the volume of pee and posture
  India's #1 Selling Diaper trusted by Doctors and Moms*.New Pampers all round-protection pants – best diapers for 2X Protection for your baby
  Anti Rash – India’s only diapers containing Lotion with Aloe Vera that prevents rashes
  Ultra Absorb Magic gel – Locks in wetness with an inner layer of super absorbent Magic Gel keeping your baby dry for up to 12 hours
  Double Leak Guards – Provides up to 100% protection from leakage even after 12 hours of use`,
    price: 999,
    discount: 10,
    tags: ["babyproducts", "pampers", "pants"],
  },
  {
    img:
      "https://images-na.ssl-images-amazon.com/images/I/6111CA4IPeL._SL1000_.jpg",
    title:
      "MY NEWBORN Baby Boys and Baby Girls 3 in 1 Baby Blanket-Wrapper-Sleeping Bag Pack of 2 pcs",
    disc: `
  Pack of 2 Pc. Very Soft and Attractive Baby Blanket cum Wrapper by MY NEWBORN
Age 1-6 months- Can also be used loosely for newborn babies
Very soft sherpa Material
USE: Baby Blanket, baby wrapper, baby sleep bag
Hood To Toe 30 Inches, WIDTH: 14", FULL SPREAD: 31 Inches`,
    price: 1800,
    discount: 71,
    tags: ["babyproducts", "blanket", "baby"],
  },
  {
    img:
      "https://images-na.ssl-images-amazon.com/images/I/513zJLLcEiL._SL1000_.jpg",
    title: "Johnson's Baby Top to Toe Bath Wash, 500ml",
    disc: `
  Johnson's Baby Top to Toe bath is as mild as pure water
Johnson's baby bath is Hospital's choice for baby's 1st bath
Perfectly pH balanced for newborn skin
Johnson's baby bath is 100% soap free
Hypoallergenic and clinically mildness proven
Recommended by doctors
No Parabens, No Sulfates, No Dye`,
    price: 290,
    discount: 12,
    tags: ["babyproducts", "johnsons", "body wash"],
  },
  {
    img:
      "https://images-na.ssl-images-amazon.com/images/I/81ayvLHoANL._SL1500_.jpg",
    title:
      "Johnson's Baby Top to Toe Bath Wash, 500mA Baby Cherry - Baby Swaddle Wrap || Adjustable Infant Soft Muslin Cloth || Newborn Blanket for 0-6 Months - Pack of 2 (Multi Color)l",
    disc: `
  Johnson's Baby Top to Toe bath is as mild as pure water
Johnson's baby bath is Hospital's choice for baby's 1st bath
Perfectly pH balanced for newborn skin
Johnson's baby bath is 100% soap free
Hypoallergenic and clinically mildness proven
Recommended by doctors
No Parabens, No Sulfates, No Dye`,
    price: 999,
    discount: 20,
    tags: ["babyproducts", "cloth", "baby"],
  },
  {
    img: "https://images-na.ssl-images-amazon.com/images/I/51UwxLLvRQL.jpg",
    title: "BabyGo Baby Cradle Cot and Stroller Blue",
    disc: `
  Johnson's Baby Top to Toe bath is as mild as pure water
Johnson's baby bath is Hospital's choice for baby's 1st bath
Perfectly pH balanced for newborn skin
Johnson's baby bath is 100% soap free
Hypoallergenic and clinically mildness proven
Recommended by doctors
No Parabens, No Sulfates, No Dye`,
    price: 2300,
    discount: 30,
    tags: ["babyproducts", "cot", "baby"],
  },
  {
    img:
      "https://images-na.ssl-images-amazon.com/images/I/61y3mRVvIHL._SL1280_.jpg",
    title: `
      Little Chime New Born Baby Window Cradle Hanger/jhula/jhoola/Cot Metal Hanger/Baby Hanging Swing Cradle/Cradle for Baby Window Cradle Metal Hanger(Black)e`,
    disc: `
  Capacity - 20 kg
  Very Strong and High Quality GP Pipe in used this Window Cradle and Black powder coating done
  Supports this cradle almost all type windows and Grill With Portable Design You Can Carry anyware any Time`,
    price: 1299,
    discount: 35,
    tags: ["babyproducts", "hanger", "baby"],
  },
  {
    img: "https://images-na.ssl-images-amazon.com/images/I/5189QAHawQL.jpg",
    title: `
      
Amardeep Toddler Mosquito and Insect Protection Net/Mattress Pink Teddy Print 70 * 40 cms`,
    disc: `
  Allows fresh air to breeze in, while blocks out insects and mosquitoes and dust.
Supported by strong plastic Wire Frame.
Ideal for newborns till 3 months.
Light weighted, Convenient to carry and flat foldable.
Easy to put inside your backpack and bring it along to wherever you and your baby go.`,
    price: 1300,
    discount: 73,
    tags: ["babyproducts", "Net/Mattress", "baby"],
  },
  {
    img: "https://images-na.ssl-images-amazon.com/images/I/51NK4T1mN4L.jpg",
    title: `
      Uspech Waterproof Double Sided Baby Play mat | Carpet for Baby to Crawl | (Multicolour, 6x4 feet)`,
    price: 1199,
    discount: 64,
    tags: ["babyproducts", "Mattress", "baby", "carpet"],
    disc: `
Decorate your little one's room starting with these cute play mats for a fun filled play time.
Portable baby play mat lets you travel with ease: foam floor mats for kids contain no BPA..`,
  },
  {
    img:
      "https://images-na.ssl-images-amazon.com/images/I/71jSv-cmuDL._SL1500_.jpg",
    title: `
      DearJoy Baby Elephant Pillow (Grey)`,
    price: 999,
    discount: 38,
    tags: ["babyproducts", "pillow", "baby"],
    disc: `
Great item for in-bed reading, TV-watching, sofa cushion, and back and head pillow-supply for a comfortable and cozy feeling in home`,
  },
  {
    img: "https://images-na.ssl-images-amazon.com/images/I/41s4TLr5NtL.jpg",
    title: `INTIME PVC Portable Inflatable Bathtub for Kids (Blue)`,
    price: 1790,
    discount: 39,
    tags: ["babyproducts", "bathtub", "baby"],
    disc: `
Made from BPA free European standard PVC materials, soft and smooth to protect your baby's skin. Out Size: 98*65*28cm fits 0-3 years old kids.
Slip resistant design for bottom of inside and outside. With an inflatable raised section to support the baby around the legs, suitable for girls and boys. 45 degree backrest design,can support the back of baby better. Inflatable section be separate. You could adjust the bathtub angle of head side through inflating more or less air into the separated section on bottom of backrest.
Practical, durable, easy to use and clean. Big size drain plug in the bottom for water release. A storagee`,
  },
  {
    img:
      "https://images-na.ssl-images-amazon.com/images/I/71iRWbMp2ZL._SL1268_.jpg",
    title: `BeyBee Waterproof Baby Dry Sheet (Small (50cm X 70cm), Salmon Rose)`,
    price: 199,
    discount: 32,
    tags: ["babyproducts", "drysheet", "baby"],
    disc: `BeyBee dry sheet is Comfortable and durable baby dry sheets, made from 100% leak-proof mattress protector and baby skin-friendly fabric. This baby dry sheet is best hygienic baby bed protectors for babies, protects your baby & bed from wetting.
`,
  },
  {
    img: "https://images-na.ssl-images-amazon.com/images/I/41TkXCpAZRL.jpg",
    title: `
      TRUMOM (USA) 3 in1 Baby Carrier for kids 0 to 36 months old ( Upto 12 Kg))`,
    price: 1900,
    discount: 32,
    tags: ["babyproducts", "babycarrier", "TRUMOM", "baby"],
    disc: `Side Impact Protection with deep, softly padded side wings, protects child's head, neck and spine; ensuring the best and safest fit.
adjustment and Soft-touch area on the handle for comfortable carrying and Chest pads for your child’s comfort
`,
  },
];

dummyData.forEach((disc,index)=>{

  writeInDb("Baby_Care",{disc, id :index})
})