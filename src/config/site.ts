export const siteConfig = {
  name: 'Electric Link Pan Africa Limited',
  shortName: 'Electric Link',
  tagline: "Kenya's Top Choice for a Wide Range of Readily Available Electrical and Mechanical Products",
  subtitle: 'Your Trusted Electrical and Mechanical Partner',
  description:
    'Our company boasts a wide range and readily available electrical and mechanical products all under one roof, displayed in modern showrooms.',
  about:
    'Electric Link Pan Africa Limited is a renowned firm managed by experienced professionals overseeing a team of 90 employees. The Company boasts a wide range and readily available electrical and mechanical products all under one roof, displayed in modern showrooms, strategically located in Nairobi CBD and Industrial Area, supported by a well-equipped in-house service center with trained technicians providing timely support to clients.',
  mission:
    "Electric Link Pan Africa Limited strives to meet all clients' electrical and mechanical needs and expectations by ensuring consistency in quality, availability, competitive pricing, exemplary service, integrity, and continuous development of new and innovative products.",
  vision:
    "Electric Link Pan Africa Limited will endeavor to focus on exceeding clients' expectations by continuously providing the critical LINK between reputable manufacturers and the ever-demanding regional marketplace.",
  logo: 'https://v2website.electriclink.co.ke/wp-content/uploads/2024/05/logo-1.png',
  address: {
    line1: 'DSM Place, Kijabe Street',
    line2: 'City Centre, Nairobi, Kenya',
    mapQuery: 'Electric Link PAN Africa Limited Nairobi',
  },
  phone: ['0722 552 969', '0720 133 691', '0771 727 972'],
  tel: ['020 682 4415', '020 682 4419'],
  email: 'sales@electriclink.co.ke',
  showroom: {
    title: 'Showroom',
    phone: '+254 722 552 969',
    phoneTel: '254722552969',
    address: 'DSM Place, Kijabe Street, Nairobi',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7977.655689646692!2d36.81303999203492!3d-1.2767090242132564!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f172db4e42347%3A0x458d8779cdfb818b!2sElectric%20Link%20PAN%20Africa%20Limited!5e0!3m2!1sen!2sus!4v1727781578437!5m2!1sen!2sus',
  },
  serviceCenter: {
    title: 'Service Center',
    phone: '+254 720 133 691',
    phoneTel: '254720133691',
    address: 'Behind DSM Place, Kijabe Street, Nairobi',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7977.655689646692!2d36.81303999203492!3d-1.2767090242132564!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f172db4e42347%3A0x458d8779cdfb818b!2sElectric%20Link%20PAN%20Africa%20Limited!5e0!3m2!1sen!2sus!4v1727781578437!5m2!1sen!2sus',
    description:
      'Our well-equipped in-house service center is staffed with trained technicians who provide timely support for electrical and mechanical products. From installations and repairs to after-sales assistance, we keep your equipment running.',
  },
  whatsapp: {
    number: '254725090695',
    display: '0725 090 695',
    message: 'Hello, I would like to inquire about your products.',
  },
  social: {
    facebook: 'https://www.facebook.com/electriclinkpanafrika',
    instagram: 'https://www.instagram.com/electriclinkpanafrika',
    linkedin: 'https://www.linkedin.com/company/electric-link-pan-africa-limited',
  },
  heroSlides: [
    {
      id: 1,
      image: 'https://electriclink.co.ke/assets/sliders/4.jpg',
      description:
        'Welcome to Electric Link Pan Africa Limited. Our Company boasts a wide range and readily available electrical and mechanical products all under one roof, displayed in modern showrooms.',
      layout: 'fullscreen' as const,
    },
    {
      id: 2,
      image: 'https://electriclink.co.ke/assets/sliders/1.png',
      description:
        'Fans from RR offer a wide range which is premium looking, high on performance and priced economically for various residential, commercial, institutional, and industrial purposes.',
      layout: 'split' as const,
    },
    {
      id: 3,
      image: 'https://electriclink.co.ke/assets/sliders/2.png',
      description:
        'We bring to you an exceptional and extensive range of LED Lighting products to suit every requirement across Residential, Commercial, Institutional & Industrial sectors.',
      layout: 'split' as const,
    },
    {
      id: 4,
      image: 'https://electriclink.co.ke/assets/sliders/3.png',
      description:
        'Introducing our range of MCB, RCCB, Isolator, MCB Changeover & Distribution Board for both residential and commercial use.',
      layout: 'split' as const,
    },
  ],
  partners: [
    'https://electriclink.co.ke/assets/partners/partner1.png',
    'https://electriclink.co.ke/assets/partners/partner8.png',
    'https://electriclink.co.ke/assets/partners/partner3.png',
    'https://electriclink.co.ke/assets/partners/partner4.png',
    'https://electriclink.co.ke/assets/partners/partner5.png',
    'https://electriclink.co.ke/assets/partners/partner6.png',
    'https://electriclink.co.ke/assets/partners/partner7.png',
  ],
} as const

export function whatsappUrl(message?: string) {
  const text = encodeURIComponent(message ?? siteConfig.whatsapp.message)
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${text}`
}

export function googleMapsUrl() {
  return `https://maps.google.com/?q=${encodeURIComponent(siteConfig.address.mapQuery)}`
}
