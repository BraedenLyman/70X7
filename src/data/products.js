export const products = [
  {
    id: 'tee-nwfam',
    name: 'No Weapons Formed Against Me',
    category: 'T-Shirt',
    //color: 'Black',
    price: '$40',
    tag: 'Popular',
    description:
      'A bold statement tee designed to reflect faith, resilience, and confidence in every setting.',
    details: [
      'Premium cotton feel for everyday wear',
      'Statement front graphic with scripture-inspired messaging',
      'Relaxed fit built for layering or solo wear',
    ],
    images: [
      { id: 'front', label: 'Front Graphic', src: '../assets/no-weapon.JPEG' },
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
    description:
      'A scripture-led design inspired by one of the most iconic moments of faith and obedience.',
    details: [
      'Soft everyday fabric with premium structure',
      'Large visual design inspired by Exodus',
      'Designed to stand out while staying wearable',
    ],
    images: [
      { id: 'front', label: 'Front Graphic', src: '../assets/moses-splitting-sea.JPEG' },
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
    description:
      'A heavyweight faith-forward tee inspired by courage, conviction, and trusting God against the odds.',
    details: [
      'Structured silhouette with bold graphic placement',
      'Story-driven design inspired by David and Goliath',
      'Made to pair easily with everyday streetwear fits',
    ],
    images: [
      { id: 'front', label: 'Front Graphic', src: '../assets/david-goliath.JPEG' },
      { id: 'detail', label: 'Texture Detail' },
      { id: 'back', label: 'Back View' },
    ],
  },
]

export const featuredProductIds = ['tee-nwfam', 'tee-mstrs']

export function getProductById(productId) {
  return products.find((product) => product.id === productId)
}
