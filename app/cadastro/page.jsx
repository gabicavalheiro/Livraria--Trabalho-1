'use client'
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import styles from './page.module.css'

import 'react-toastify/dist/ReactToastify.css'

export default function Cadastro() {
  const { register, handleSubmit, reset } = useForm();

  async function enviaDados(data) {
    //    console.log(data);    
    const filme = await fetch("http://localhost:3005/livros",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...data })
      },
    )
    if (filme.status == 201) {
      // alert("Ok! Filme cadastrado com sucesso")
      toast.success("Ok! Filme cadastrado com sucesso")
      reset()
    } else {
      // alert("Erro...")
      toast.error("Erro... Não foi possível concluir o cadastro")
    }
  }

  return (
    <div className={styles.container}>
      <h2 className="mt-2">Cadastro de Livros</h2>
      <form onSubmit={handleSubmit(enviaDados)}>
        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="titulo" className="form-label">Título do Livro</label>
            <input type="text" className="form-control" id="titulo" {...register("titulo")} required />
          </div>
          <div className="col-sm-2">
            <label htmlFor="preco" className="form-label">Preço R$</label>
            <input type="number" step="0.10" className="form-control" id="preco" {...register("preco")} required />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-4">
            <label htmlFor="paginas" className="form-label">Quantidade de Páginas</label>
            <input type="text" className="form-control" id="paginas" {...register("paginas")} required />
          </div>
          <div className="col-sm-4">
            <label htmlFor="data" className="form-label">Data Lançamento</label>
            <input type="date" className="form-control" id="data" {...register("data")} required />
          </div>
          <div className="col-sm-4">
            <label htmlFor="genero" className="form-label">Gênero</label>
            <select id="genero" className="form-select" {...register("genero")} required>
              <option value="livre">Escolha</option>
              <option value="Auto-ajuda">Auto-ajuda</option>
              <option value="Romance">Romance</option>
              <option value="Infantil">Infantil</option>
              <option value="Suspense">Suspense</option>
            </select>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-6">
            <label htmlFor="autor" className="form-label">Autor</label>
            <input type="text" className="form-control" id="autor" {...register("autor")} required />
          </div>
          <div className="col-sm-6">
            <label htmlFor="capa" className="form-label">Capa do Livro</label>
            <input type="url" className="form-control" id="capa" {...register("capa")} required />
          </div>
        </div>

        <div className="mb-3 mt-3">
          <label htmlFor="sinopse" className="form-label">Sinopse</label>
          <textarea className="form-control" id="sinopse" rows="3" {...register("sinopse")} required></textarea>
        </div>

        <input type="submit" value="Enviar" className="btn btn-success me-3" />
        <input type="button" value="Limpar" className="btn btn-danger"
          onClick={() => reset()} />

      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}