'use client'
import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import styles from './page.module.css'

function Grafico() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    async function fetchLivros() {
      try {
        const response = await fetch("http://localhost:3005/livros");
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados.");
        }

        const data = await response.json();
        setLivros(data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    }

    fetchLivros();
  }, []);

  // Função para preparar os dados para o gráfico
  const prepararDados = () => {
    const generoContagem = {};

    // Contagem do número de livros por gênero
    livros.forEach(livro => {
      if (generoContagem[livro.genero]) {
        generoContagem[livro.genero]++;
      } else {
        generoContagem[livro.genero] = 1;
      }
    });

    // Formata os dados para o formato de entrada do gráfico
    const dadosFormatados = [['Gênero', 'Número de Livros']];
    for (const genero in generoContagem) {
      dadosFormatados.push([genero, generoContagem[genero]]);
    }

    return dadosFormatados;
  };

  const chartData = prepararDados();

  return (
    <div className={styles.container}>
      <Chart
        width={'100%'}
        height={'400px'}
        chartType="BarChart"
        loader={<div className={styles.title}>Carregando gráfico...</div>}
        data={chartData}
        options={{
          title: 'Número de Livros por Gênero',
          chartArea: { width: '50%' },
          hAxis: {
            title: 'Número de Livros',
            minValue: 0,
          },
          vAxis: {
            title: 'Gênero',
          },
        }}
        legendToggle
      />
    </div>
  );
}

export default Grafico;
