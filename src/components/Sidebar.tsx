import type React from "react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 transition-transform duration-300 ease-in-out bg-gray-800 text-white ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-6">
        {/* Sidebar content here */}
        <h2 className="text-2xl font-bold mb-4">Menu</h2>
        <ul>
          <li className="mb-2">
            <a href="#" className="hover:text-gray-300">
              Home
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="hover:text-gray-300">
              About
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="hover:text-gray-300">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <button className="absolute top-4 right-4 p-2 rounded-full bg-gray-700 hover:bg-gray-600" onClick={onClose}>
        &times;
      </button>
    </aside>
  )
}

export default Sidebar

