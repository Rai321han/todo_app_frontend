
export default function Modal({ children }) {
  return (
    <div className='h-screen w-screen fixed top-0 left-0 z-100 bg-gray-800/50 backdrop-blur-sm flex items-center justify-center p-5'>
        {children}
    </div>
  )
}

