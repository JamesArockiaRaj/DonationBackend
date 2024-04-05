import React from 'react'
import './Footer.css';

function Footer() {
  return (
    <div className='footer-exterior'>
        <div className='footer'>
        <div className='footer-info'>
            <h1>The Human</h1>
            <h4>Helping the needful people at the right time</h4>
            <div className='contact-icons'>
                <img src='https://cdn-icons-png.flaticon.com/512/3670/3670051.png'></img>
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1200px-Instagram_icon.png'></img>
            </div>
        </div>

        <div className='footer-contact'>
            <h2>Contact</h2>
            <h4>📍 Chennai</h4>
            <h4>📧 test@gmail.com</h4>
            <h4>📞 +91 9342395791</h4>
        </div>

        <div className='footer-contact'>
            <h2>Contact</h2>
            <h4>📍 Chennai</h4>
            <h4>📧 test@gmail.com</h4>
            <h4>📞 +91 9342395791</h4>
        </div>
        
        </div>
        <div className='copyright'>
            <h5 id='colorwheat'>Copyright © {new Date().getFullYear()} JR. All rights reserved. </h5>
            {/* <img src='https://www.iconsdb.com/icons/preview/white/arrow-144-xxl.png'></img> */}
        </div>
    </div>
  )
}

export default Footer