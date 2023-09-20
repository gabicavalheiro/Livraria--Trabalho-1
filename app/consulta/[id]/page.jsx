import Link from "next/link"

async function getFilme(id) {
  const response = await fetch("http://localhost:3005/livros/"+id)
  const dado = await response.json()
  return dado
}

export default async function Consulta({params}) {

  const livro = await getFilme(params.id)
  
  return (
    <div className="container">
      <h2 className="mt-2">Consulta de Filmes</h2>
      <form>
        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="titulo" className="form-label">Título do livro</label>
            <input type="text" className="form-control" id="titulo" value={livro.titulo} readOnly />
          </div>
          <div className="col-sm-4">
            <label htmlFor="genero" className="form-label">Gênero</label>
            <input type="text" className="form-control" id="genero" value={livro.genero} readOnly />
          </div>
          <div className="col-sm-2">
            <label htmlFor="preco" className="form-label">Preço R$</label>
            <input type="number" step="0.10" className="form-control" id="preco" value={livro.preco} readOnly />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-4">
            <label htmlFor="paginas" className="form-label">Quantidade de Páginas: </label>
            <input type="text" className="form-control" id="paginas" value={livro.paginas} readOnly />
          </div>
          <div className="col-sm-4">
            <label htmlFor="data" className="form-label">Data de lançamento:</label>
            <input type="date" className="form-control" id="data" value={livro.data} readOnly />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-6">
            <label htmlFor="autor" className="form-label">Autor</label>
            <input type="text" className="form-control" id="autor" value={livro.autor} readOnly />
          </div>
          <div className="col-sm-6">
            <p className="form-label">Capa do livro</p>
            <img src={livro.capa} alt={`Capa do livro ${livro.capa}`} width={150} height={210} className="mx-auto d-block"/>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="sinopse" className="form-label">Sinopse</label>
          <textarea className="form-control" id="sinopse" rows="3" value={livro.sinopse} readOnly></textarea>
        </div>

        <Link className="btn btn-success float-end" href="/listagem">Voltar</Link>

      </form>
    </div>
  )
}