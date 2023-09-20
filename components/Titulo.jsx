import Link from "next/link";
import styles from './Titulo.module.css'

export default function Titulo() {
  return (
  <div className={styles.nav}>
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" href="/">
          {/* <img src="../cinema.png" alt="Logo" width="72" height="60" className="d-inline-block align-text-top" /> */}
          <h2 className="float-end mt-2 ms-2">Livraria: Controle de Livros</h2>
        </Link>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" href="/cadastro">Cadastro</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/listagem">Listagem</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/grafico">Relatório</Link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
  )
}