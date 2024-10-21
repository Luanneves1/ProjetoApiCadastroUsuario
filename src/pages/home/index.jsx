import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'



function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef(null)
  const inputAge = useRef(null)
  const inputEmail = useRef(null)

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')
    setUsers(usersFromApi.data)
  }

  async function createUsers() {
    await api.post('/usuarios',{
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id} `)

    getUsers();
  }

  useEffect(() => {
    getUsers()
  }, [])


  return (

    <div className='container'>
      <form action="">
        <h1>Cadastro de Usuários</h1>
        <input type='text' placeholder='Nome' name="Nome" ref={inputName} />
        <input type='number' placeholder='Idade' name="idade" ref={inputAge} />
        <input type='email' placeholder='Email' name="email" ref={inputEmail} />
        <button type='submit' onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map((usuarios) => (
        <div className='card' key={usuarios.id} >
          <div>
            <p>Nome:{usuarios.name}</p>
            <p>Idade:{usuarios.age}</p>
            <p>Email:{usuarios.email}</p>
          </div>
          <button onClick={() => deleteUsers(usuarios.id)}>
            <img src={Trash} alt='Excluir' />
          </button>
        </div>
      ))}

    </div>
  )
}

export default Home