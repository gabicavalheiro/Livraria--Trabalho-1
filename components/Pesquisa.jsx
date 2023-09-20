import { useForm } from "react-hook-form"

export default function Pesquisa(props) {

  const { register, handleSubmit } = useForm()

  const handleOrdenacaoChange = (event) => {
    // Aqui você pode chamar a função ordenarLivros com a opção selecionada
    const ordenacaoSelecionada = event.target.value;
    props.ordena(ordenacaoSelecionada);
  };
  return (
    <form className="row row-cols-lg-auto g-3 align-items-center"
      onSubmit={handleSubmit(props.filtra)}
      onReset={props.mostra}>
      <div className="col-12">
        <input type="text" className="form-control"
          placeholder="Pesquisa livro ou gênero"
          {...register("pesq")}
        />
      </div>
      <div className="col-12">
        <button className="btn btn-primary" type="submit">Pesquisar</button>
      </div>
      <div className="col-12">
        <button className="btn btn-warning" type="reset">Ver Todos</button>
      </div>
      <div className="col-12">
        <select
          className="form-select"
          onChange={handleOrdenacaoChange}
        >
          <option value="nome">Ordenar por Nome</option>
          <option value="id">Ordenar por ID</option>
        </select>
      </div>
    </form>
  )
}