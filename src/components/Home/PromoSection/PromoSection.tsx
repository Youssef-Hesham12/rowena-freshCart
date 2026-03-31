import React from 'react'
import PromoCard from './PromoCard'
import { promoArr } from './promo.data'

export default function PromoSection() {
  return (
    <section className='py-10'>
      <div className="container mx-auto">
        <div className='grid md:grid-cols-2 gap-6'>
            {promoArr.map((promo,index) => (
                <PromoCard key={index} promo={promo} />
            ))}
        </div>
      </div>
    </section>
  )
}
