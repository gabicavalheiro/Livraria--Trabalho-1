import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";

function ListaDeLivros() {
  const [livros, setLivros] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ordenacao, setOrdenacao] = useState('id'); // Estado para o critério de ordenação
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    async function getLivros() {
      try {
        const response = await fetch("http://localhost:3005/livros");
        if (!response.ok) {
          throw new Error('Erro ao buscar livros');
        }
        const dados = await response.json();
        setLivros(dados);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
        setIsLoading(false);
      }
    }

    getLivros();
  }, []);

  // Função para ordenar a lista de livros com base no critério selecionado
  const ordenarLivros = () => {
    const listaOrdenada = [...livros];

    if (ordenacao === 'id') {
      listaOrdenada.sort((a, b) => a.id - b.id); // Ordenar por ID
    } else if (ordenacao === 'nome') {
      listaOrdenada.sort((a, b) => a.titulo.localeCompare(b.titulo)); // Ordenar por nome (título)
    }

    setLivros(listaOrdenada); // Atualiza o estado com a lista ordenada
  };

  const filtraDados = (data) => {
    // Implemente a lógica de filtragem com base nos dados do formulário aqui
    console.log('Filtrar dados:', data);
  };

  const mostraTodos = () => {
    // Implemente a lógica para mostrar todos os dados aqui
    console.log('Mostrar todos os dados');
  };

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h2>Lista de Livros</h2>

      {/* Campo de seleção para o critério de ordenação */}
      <div className="form-group">
        <label htmlFor="ordenacao">Ordenar por:</label>
        <select
          id="ordenacao"
          className="form-control"
          value={ordenacao}
          onChange={(e) => setOrdenacao(e.target.value)}
        >
          <option value="id">ID</option>
          <option value="nome">Nome</option>
        </select>
      </div>

      {/* Botão de ordenação */}
      <button
        type="button"
        className="btn btn-primary"
        onClick={ordenarLivros}
      >
        Ordenar
      </button>

      {/* Formulário de pesquisa */}
      <form
        className="row row-cols-lg-auto g-3 align-items-center"
        onSubmit={handleSubmit(filtraDados)}
        onReset={mostraTodos}
      >
       
          
      </form>

      {/* Lista de livros ordenada */}
      <ul className="list-group">
        {livros.map((livro) => (
          <li key={livro.id} className="list-group-item">
            Título: {livro.titulo}, Autor: {livro.autor}, Gênero: {livro.genero}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaDeLivros;
