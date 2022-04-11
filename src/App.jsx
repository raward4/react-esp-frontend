import { useState, useEffect } from 'react'
import { Route, Routes, NavLink, Navigate, useNavigate } from 'react-router-dom'
import './App.css'
import * as puppyService from './services/puppies'
import * as authService from './services/authService'
import AddPuppy from './pages/AddPuppy/AddPuppy'
import PuppyList from './pages/PuppyList/PuppyList'
import EditPuppy from './pages/EditPuppy/EditPuppy'
import LoginPage from './pages/Login/Login'
import Profiles from './pages/Profiles/Profiles'
import Signup from './pages/Signup/Signup'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import NavBar from './components/NavBar/NavBar'


function App() {
  const [puppies, setPuppies] = useState([])
  const navigate = useNavigate()
  const [user, setUser] = useState(authService.getUser())

  useEffect(()=> {
    if(user) {
      puppyService.getAll()
      .then(allPuppies => setPuppies(allPuppies))
    }
  }, [user])

  const handleAddPuppy = async newPuppyData => {
    const newPuppy = await puppyService.create(newPuppyData)
    setPuppies([...puppies, newPuppy])
    navigate('/')
  }

  const handleDeletePuppy = id => {
    puppyService.deleteOne(id)
    .then(deletedPuppy => setPuppies(puppies.filter(puppy => puppy._id !== deletedPuppy._id)))
  }

  const handleUpdatePuppy = updatedPuppyData => {
    puppyService.update(updatedPuppyData)
    .then(updatedPuppy => {
      const newPuppiesArray = puppies.map(puppy => puppy._id === updatedPuppy._id ? updatedPuppy : puppy)
      setPuppies(newPuppiesArray)
      navigate('/')
    })
  }

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  return (
    <div className="App">
      <NavBar user={user} handleLogout={handleLogout} />
      <main>
        <Routes>
          <Route 
            path='/add' 
            element={
              <AddPuppy 
                handleAddPuppy={handleAddPuppy} 
              />
            } 
          />
          <Route
            path='/'
            element={
              user ?
              <PuppyList
                handleDeletePuppy={handleDeletePuppy}
                puppies={puppies}
                user={user} 
              />
              :
              <Navigate to='/login' />
            }
          />
          <Route 
            path='/edit'
            element={
              <EditPuppy
                handleUpdatePuppy={handleUpdatePuppy}
              />
            }
          />
          <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
          />
          <Route
            path="/login"
            element={<LoginPage handleSignupOrLogin={handleSignupOrLogin} />}
          />
          <Route
            path="/changePassword"
            element={user ? <ChangePassword handleSignupOrLogin={handleSignupOrLogin}/> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App