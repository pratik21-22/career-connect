import { useTheme } from '../context/ThemeContext';
import { HiSun, HiMoon } from 'react-icons/hi';

export default function ThemeToggle() {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative p-2 rounded-xl transition-all duration-300 hover:bg-surface-100 dark:hover:bg-surface-800"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle theme"
        >
            <div className="relative w-5 h-5">
                <HiSun
                    size={20}
                    className={`absolute inset-0 text-amber-500 transition-all duration-300 ${darkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                        }`}
                />
                <HiMoon
                    size={20}
                    className={`absolute inset-0 text-blue-400 transition-all duration-300 ${darkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                        }`}
                />
            </div>
        </button>
    );
}
