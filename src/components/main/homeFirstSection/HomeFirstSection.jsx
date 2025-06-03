import React from 'react'
import "./css/homeFirstSection.css";
import Img from "../../../assets/images/homeFirstSection.png"

const HomeFirstSection = () => {
  return (
    <div className='home_first_section_container project_container'>
        <img src={Img} alt="" />
        <div>
            <h2>Performansa sadiq brend</h2>
            <p>Azərbaycanda WEONE markasının rəsmi distribyutoru olaraq, yüksək keyfiyyətli avtomobil ehtiyat hissələrinin satışını və texniki dəstəyini həyata keçiririk. Məqsədimiz – ölkəmizdə avtomobil sektorunda etibarlı, davamlı və müasir həllər təqdim edərək müştəri məmnuniyyətini ən yüksək səviyyədə təmin etməkdir.</p>
            <button>Əlaqə Qurun</button>
        </div>
    </div>
  )
}

export default HomeFirstSection