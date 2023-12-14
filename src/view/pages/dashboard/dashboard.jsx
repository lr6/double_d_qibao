import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()
  function toRoleList() {
    navigate('/list')
  }
  return(
    <>
      <ul>
        <li onClick={toRoleList}>role.list</li>
      </ul>
    </>
  )
}

export default Dashboard
