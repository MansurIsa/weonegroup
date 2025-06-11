import React from 'react'
import "./css/login.css"
import MainLayout from '../../layouts/mainLayout/MainLayout'

const Login = () => {
  return (
    <MainLayout>
      <section style={{padding: "56px 0"}}>
        <div className="login_container project_container">
          <h1>Daxil olun</h1>
          <form>
            <div>
              <label htmlFor="">İstifadəçi adı</label>
              <input placeholder='İstifadəçi adınızı daxil edin' type="text" />
            </div>
            <div>
              <label htmlFor="">Parol</label>
              <input placeholder='Parolunuzu daxil edin' type="password" />
            </div>
            <button>Daxil ol</button>
          </form>
        </div>
      </section>
    </MainLayout>
  )
}

export default Login