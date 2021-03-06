import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiImage, FiTrash2, FiPower } from 'react-icons/fi'
import api from '../../services/api'
import './styles.css'

export default () => {
  const [incidents, setIncidents] = useState([])

  const ongId = localStorage.getItem('ongId')
  const ongName = localStorage.getItem('ongName')

  const history = useHistory()

  useEffect(() => {
    api
      .get('profile', {
        headers: {
          Authorization: ongId
        }
      })
      .then(response => {
        setIncidents(response.data)
      })
  }, [ongId])

  const handleDeleteIncident = async id => {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      })

      setIncidents(incidents.filter(incident => incident.id !== id))
    } catch (err) {
      alert('Error ao deletar o caso, tente novamente.')
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    history.push('/')
  }

  return (
    <div className='profile-container'>
      <header>
        <FiImage size={50} color='#E02041' />
        <span>Welcome, {ongName}</span>
        <Link className='button' to='/incidents/new'>
          Cadastrar novo caso
        </Link>
        <button type='button' onClick={handleLogout}>
          <FiPower size={18} color='#E02041' />
        </button>
      </header>
      <h1>Casos Cadastrados</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>R$ {incident.value}</p>

            <button
              type='button'
              onClick={() => handleDeleteIncident(incident.id)}
            >
              <FiTrash2 size={20} color='#a8a8b3' />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
