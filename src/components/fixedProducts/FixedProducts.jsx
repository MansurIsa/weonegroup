import React from 'react'
import Marquee from "react-fast-marquee";
import Img1 from "../../assets/images/fixedPr1.png"
import Img2 from "../../assets/images/fixedPr2.png"
import Img3 from "../../assets/images/fixedPr3.png"
import Img4 from "../../assets/images/fixedPr4.png"
import Img5 from "../../assets/images/fixedPr5.png"


const products = [
  { id: 1, image: Img1 },
  { id: 2, image: Img2 },
  { id: 3, image: Img3 },
  { id: 4, image: Img4 },
  { id: 5, image: Img5 },
];
const FixedProducts = () => {
  return (
    <div style={{ position: 'fixed', bottom: 0, width: '100%', background: '#fff', zIndex: 1000 }}>
    <Marquee speed={50} gradient={false}>
      {products.map(product => (
        <img
          key={product.id}
          src={product.image}
          alt="product"
          style={{ height: 60, marginRight: 20 }}
        />
      ))}
    </Marquee>
  </div>
  )
}

export default FixedProducts