'use client'
import { useEffect, useState } from "react"
import ItemLista from "@/components/ItemLista"
import { useRouter } from "next/navigation"
import Pesquisa from "@/components/Pesquisa"
import ListaDeLivros from "@/components/Ordena"
import styles from './page.module.css'

export default function Listagem() {
  const [livros, setLivros] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    async function getLivros() {
      const response = await fetch("http://localhost:3005/livros")
      const dados = await response.json()
      setLivros(dados)
      setIsLoading(false)
    }
    getLivros()
  }, [])

  async function excluiLivro(id) {
    const response = await fetch("http://localhost:3005/livros/" + id, {
      method: "DELETE"
    })
    const novosDados = livros.filter(livro => livro.id != id)
    setLivros(novosDados)
  }

  async function destacaLivro(id, status_atual) {
    await fetch("http://localhost:3005/livros/" + id,
      {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ destaque: !status_atual })
      })
    const indiceAlterado = livros.findIndex(livro => livro.id == id)
    const novosDados = [...livros]
    novosDados[indiceAlterado].destaque = !status_atual
    setLivros(novosDados)
  }

  const listaLivros = livros.map(livro => (
    <ItemLista key={livro.id}
      livro={livro}
      autor={livro.autor}
      genero={livro.genero}
      exclui={() => excluiLivro(livro.id)}
      altera={() => router.push('altera/' + livro.id)}
      consulta={() => router.push('consulta/' + livro.id)}
      destaca={() => destacaLivro(livro.id, livro.destaque)}
    />
  ))

  function filtraDados(data) {
    if (data && data.pesq) {
      const pesquisa = data.pesq.toUpperCase();
  
      async function getLivros() {
        const response = await fetch("http://localhost:3005/livros");
        const dados = await response.json();
  
        const novosDados = dados.filter(livro =>
          livro.titulo.toUpperCase().includes(pesquisa) || livro.genero.toUpperCase().includes(pesquisa)
        );
        
        setLivros(novosDados);
      }
      getLivros();
    }
  
  }

  function mostraTodos() {
    async function getLivros() {
      const response = await fetch("http://localhost:3005/livros")
      const dados = await response.json()
      setLivros(dados)
      setIsLoading(false)
    }
    getLivros()
  }

  const ordenarLivros = (ordenacao) => {
    const listaOrdenada = [...livros];
  
    if (ordenacao === 'id') {
      listaOrdenada.sort((a, b) => a.id - b.id); // Ordenar por ID
    } else if (ordenacao === 'nome') {
      listaOrdenada.sort((a, b) => a.titulo.localeCompare(b.titulo)); // Ordenar por nome (título)
    }
  
    setLivros(listaOrdenada); // Atualiza o estado com a lista ordenada
  };


  if (isLoading) {
    return (
      <div className={styles.container}>
        <h2>Listagem dos Livros</h2>
        <h5>Aguarde... Carregando os dados</h5>
      </div>
    )
  }

  
  return (
    <div className={styles.container}>
      <div className="row mt-2">
        <div className="col-sm-7">
          <h2 className="mt-2 mb-6">Listagem dos Livros</h2>
        </div>
        <div className="col-sm-5">
          <Pesquisa filtra={filtraDados} mostra={mostraTodos} ordena={ordenarLivros}/>
        </div>
        <div className="col-sm-5"> 
        {/* <ListaDeLivros/> */}
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Título do Livro</th>
            <th>Gênero</th>
            <th>Autor </th>
            <th>Número de páginas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {listaLivros}
        </tbody>
      </table>
    </div>
  )
}