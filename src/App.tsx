// import Navbar from '~/sections/Navbar'

import ThemeToggle from './components/Theme'

// import Hero from '~/sections/Hero'
function App() {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-baseBackground'>
      <ThemeToggle />
      <h1 className='text-baseText'>hhi</h1>
      <button className='btn d-btn-primary mt-4 text-primary'>Test Button</button>
    </div>
  )
}

export default App
