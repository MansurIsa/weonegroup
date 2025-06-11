import React from 'react'
import "./css/contact.css"
import MainLayout from '../../layouts/mainLayout/MainLayout'
import OtherBanner from '../../components/banner/otherBanner/OtherBanner'
import ContactForm from '../../components/main/contact/ContactForm'


const Contact = () => {
  return (
    <MainLayout>
      <OtherBanner bannerTitle="Bizimlə əlaqə" />
      <section>
        <ContactForm />
      </section>
      <div className="map_container">
 <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193939.79871934312!2d49.46592066300258!3d40.57892648422095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x403096dcd0923f6b%3A0xdf4767c369322a71!2zU3VtcWF5xLF0!5e0!3m2!1saz!2saz!4v1749596717457!5m2!1saz!2saz"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
      ></iframe>
      </div>
     
    </MainLayout>
  )
}

export default Contact