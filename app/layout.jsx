import 'bootstrap/dist/css/bootstrap.css'
import Titulo from '@/components/Titulo'

export const metadata = {
  title: 'Controle de Livros',
  description: 'Sistema de Controle de Livros',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">  
    <head>
      {/* <link rel="shortcut icon" href="../cinema2.png" type="image/x-icon" />   */}
    </head>    
      <body>
        <Titulo />
        {children}
      </body>
    </html>
  )
}
