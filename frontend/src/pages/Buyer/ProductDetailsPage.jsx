import React from 'react'
import { Header } from '../../components'
import {ProductDetails} from '../../components'
const ProductDetailsPage = () => {
  return (
    <div className='w-full h-screen overflow-scroll flex flex-col'>
      <div className='w-full h-[20%]'> 
       <Header/>
      </div>
      <div className='w-full min-h-[80%]'>
      <ProductDetails
       data={{
        _id: 1,
        name: "Samsung Galaxy S8",
        description: `
        NETWORK	Technology	
        GSM / HSPA / LTE
        LAUNCH	Announced	2017, March 29. Released 2017, April 24
        Status	Discontinued
        BODY	Dimensions	148.9 x 68.1 x 8 mm (5.86 x 2.68 x 0.31 in)
        Weight	155 g (5.47 oz)
        Build	Glass front (Gorilla Glass 5), glass back (Gorilla Glass 5), aluminum frame
        SIM	Single SIM (Nano-SIM) or Hybrid Dual SIM (Nano-SIM, dual stand-by)
           IP68 dust/water resistant (up to 1.5m for 30 min)
        DISPLAY	Type	Super AMOLED, HDR10
        Size	5.8 inches, 84.8 cm2 (~83.6% screen-to-body ratio)
        Resolution	1440 x 2960 pixels, 18.5:9 ratio (~570 ppi density)
        Protection	Corning Gorilla Glass 5
           3D Touch (home button only)
        Always-on display
        PLATFORM	OS	Android 7.0 (Nougat), upgradable to Android 9.0 (Pie), One UI
        Chipset	Exynos 8895 (10 nm) - EMEA
        Qualcomm MSM8998 Snapdragon 835 (10 nm) - USA & China
        CPU	Octa-core (4x2.3 GHz Mongoose M2 & 4x1.7 GHz Cortex-A53) - EMEA
        Octa-core (4x2.35 GHz Kryo & 4x1.9 GHz Kryo) - USA & China
        GPU	Mali-G71 MP20 - EMEA
        Adreno 540 - USA & China
        MEMORY	Card slot	microSDXC (uses shared SIM slot) - dual SIM model only
        Internal	64GB 4GB RAM
           UFS 2.0 or UFS 2.1
        MAIN CAMERA	Single	12 MP, f/1.7, 26mm (wide), 1/2.55", 1.4µm, dual pixel PDAF, OIS
        Features	LED flash, auto-HDR, panorama
        Video	4K@30fps, 1080p@30/60fps, 720p@240fps, HDR, stereo sound rec., gyro-EIS, OIS
        SELFIE CAMERA	Dual	8 MP, f/1.7, 25mm (wide), 1/3.6", 1.22µm, AF
        2 MP (dedicated iris scanner camera)
        Features	Dual video call, Auto-HDR
        Video	1440p@30fps
        SOUND	Loudspeaker	Yes
        3.5mm jack	Yes
           32-bit/384kHz audio
        COMMS	WLAN	Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct
        Bluetooth	5.0, A2DP, LE, aptX
        Positioning	GPS, GLONASS, BDS, GALILEO
        NFC	Yes
        Radio	No
        USB	USB Type-C 3.1
        FEATURES	Sensors	Iris scanner, fingerprint (rear-mounted), accelerometer, gyro, proximity, compass, barometer, heart rate, SpO2
           Samsung DeX (desktop experience support)
        ANT+
        Bixby natural language commands and dictation
        Samsung Pay (Visa, MasterCard certified)
        BATTERY	Type	Li-Ion 3000 mAh, non-removable (11.55 Wh)
        Charging	15W wired, QC2
        Wireless (Qi/PMA) (market dependent)
        Talk time	Up to 20 h (3G)
        Music play	Up to 67 h
        MISC	Colors	Midnight Black, Orchid Gray, Arctic Silver, Coral Blue, Maple Gold, Rose Pink, Burgundy Red
        Models	SM-G950FD, SM-G950W, SM-G950S, SM-G950K, SM-G950L, SM-G9500, SM-G950A, SM-G950P, SM-G950T, SM-G950U, SM-G950V, SM-G950F, SM-G950U1, SM-G950N, SC-02J, SCV36, SM-G950, G950F
        SAR	0.44 W/kg (head)     0.75 W/kg (body)    
        SAR EU	0.32 W/kg (head)     1.27 W/kg (body)    
        Price	About 230 EUR
        TESTS	Performance	AnTuTu: 199022 (v7)
        GeekBench: 6656 (v4.4)
        GFXBench: 13fps (ES 3.1 onscreen)
        Display	Contrast ratio: Infinite (nominal), 4.768 (sunlight)
        Camera	Photo / Video
        Loudspeaker	Voice 66dB / Noise 70dB / Ring 72dB
        Audio quality	Noise -92.5dB / Crosstalk -92.8dB
        ` ,
        originalPrice: 30000,
        ratings: 3.5,
        shop: {
          _id: 1,
          name:"Apple Inc.",
          avatar:{
            url:"https://images.samsung.com/is/image/samsung/assets/pk/about-us/brand/logo/mo/256_144_1.png?$512_N_PNG$"
          },
          description:"One point for all your tech solutions"
        },
        discountPrice: 30000,
        sold_out: 12,
        images:[
          {
            url:"https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s8-.jpg"

          },
          {
            url:"data:image/jpeg;base64,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"

          },
          {
            url:"data:image/jpeg;base64,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"
          }
        ],
        reviews:[
          {
            user:{
              name:"zack",
              avatar:{
                url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa3NWFTvpJappeCEsGzbG2jZpSo_5gNp5UKQ&usqp=CAU"
              }
            },
            comment:"This is awesome product. Recommend this seller"
          }
        ]
      }}
      />
      </div>
    </div>
  )
}

export default ProductDetailsPage