import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn, FiUser, FiImage } from 'react-icons/fi'
import api from '../../services/api'
import './styles.css'

export default () => {
  const [id, setId] = useState('')
  const history = useHistory()

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const response = await api.post('sessions', { id })
      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', response.data.name)
      history.push('/profile')
    } catch (err) {
      alert('Falha no login, tente novamente!')
    }
  }

  return (
    <div className='logon-container'>
      <section className='form'>
        <FiUser size={50} color='#E02041' />
        <form onSubmit={handleLogin}>
          <h1>Logon</h1>
          <input
            placeholder='Sua ID'
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className='button' type='submit'>
            Entrar
          </button>
          <Link className='back-link' to='/register'>
            <FiLogIn size={16} color='#E02041' />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <FiImage size={100} color='#E02041' />
    </div>
  )
}
