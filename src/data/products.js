import noWeaponImg from '../assets/no-weapon.JPEG'
import mosesSplittingImg from '../assets/moses-splittig-sea.JPEG'
import davidGoliathImg from '../assets/david-goliath.JPEG'

export const products = [
  {
    id: 'tee-nwfam',
    name: 'No Weapons Formed Against Me',
    category: 'T-Shirt',
    //color: 'Black',
    price: '$40',
    tag: 'Popular',
    weight: 0.25, // kg
    dimensions: { length: 30, width: 25, height: 5 }, // cm
    description:
      'A bold statement tee designed to reflect faith, resilience, and confidence in every setting.',
    details: [
      'Premium cotton feel for everyday wear',
      'Statement front graphic with scripture-inspired messaging',
      'Relaxed fit built for layering or solo wear',
    ],
    images: [
      { id: 'front', label: 'Front Graphic', src: noWeaponImg },
      { id: 'detail', label: 'Print Detail' },
      { id: 'back', label: 'Back View' },
    ],
  },
  {
    id: 'tee-mstrs',
    name: 'Moses Splitting The Red Sea',
    category: 'T-Shirt',
    //color: 'Sand',
    price: '$40',
    tag: 'Popular',
    weight: 0.25, // kg
    dimensions: { length: 30, width: 25, height: 5 }, // cm
    description:
      'A scripture-led design inspired by one of the most iconic moments of faith and obedience.',
    details: [
      'Soft everyday fabric with premium structure',
      'Large visual design inspired by Exodus',
      'Designed to stand out while staying wearable',
    ],
    images: [
      { id: 'front', label: 'Front Graphic', src: mosesSplittingImg },
      { id: 'detail', label: 'Artwork Detail' },
      { id: 'back', label: 'Back View' },
    ],
  },
  {
    id: 'tee-dagf',
    name: 'David & Goliath Fight',
    category: 'T-Shirt',
    //color: 'Black',
    price: '$40',
    tag: 'Popular',
    weight: 0.25, // kg
    dimensions: { length: 30, width: 25, height: 5 }, // cm
    description:
      'A heavyweight faith-forward tee inspired by courage, conviction, and trusting God against the odds.',
    details: [
      'Structured silhouette with bold graphic placement',
      'Story-driven design inspired by David and Goliath',
      'Made to pair easily with everyday streetwear fits',
    ],
    images: [
      { id: 'front', label: 'Front Graphic', src: davidGoliathImg },
      { id: 'detail', label: 'Texture Detail' },
      { id: 'back', label: 'Back View' },
    ],
  },
]

export const featuredProductIds = ['tee-nwfam', 'tee-mstrs']

export function getProductById(productId) {
  return products.find((product) => product.id === productId)
}
