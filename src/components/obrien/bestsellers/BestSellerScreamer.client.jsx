import {Image} from '@shopify/hydrogen';
import {Link} from '@shopify/hydrogen';
import {useEffect, useRef} from 'react';
import {gsap} from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

export default function BestSellerScreamer() {
  let animateThis1 = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(animateThis1, {
      scrollTrigger: {
        trigger: animateThis1,
        //markers: true,
        start: '100 bottom',
        end: 'end -100%',
        toggleClass: 'enable',
      },
      duration: 2,
    });
  });

  return (
    <div
      className="bestSeller fadeIn"
      ref={(el1) => {
        animateThis1 = el1;
      }}
    >
      <Image
        src="/BestSellers/ObrienBestSellersScreamer.jpg"
        alt="Screamer Best Seller"
        width={768}
        height={768}
      />
      <div className="white-back text-center">
        <h3>Screamer Series</h3>
        <div className="links">
          <Link to="/collections/screamer-series">Screamer Series</Link>
        </div>
      </div>
    </div>
  );
}
