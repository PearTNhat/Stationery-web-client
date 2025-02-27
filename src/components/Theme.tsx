import { useEffect, useState } from 'react'

const ThemeToggle: React.FC = () => {
  // Lấy theme từ localStorage hoặc mặc định là "light"
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'light')

  // Cập nhật theme khi user thay đổi
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button className='d-btn d-btn-primary text-2xl' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}

export default ThemeToggle
