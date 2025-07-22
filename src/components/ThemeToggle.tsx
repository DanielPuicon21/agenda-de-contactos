interface ThemeToggleProps {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
}

function ThemeToggle({ darkMode, setDarkMode }: ThemeToggleProps) {
  const handleToggle = () => {
    setDarkMode(!darkMode)
  }

  return (
    <button onClick={handleToggle} className="theme-toggle">
      Cambiar a modo {darkMode ? 'Claro' : 'Oscuro'}
    </button>
  )
}

export default ThemeToggle
