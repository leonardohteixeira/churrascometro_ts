import { useLocation, useNavigate } from "react-router-dom"

import { Alimento, nomesAlimentos, quantidadePessoas } from "../types"

type ResultadosChurrasco = {
  pessoas: number,
  alimentosSelecionados: Alimento[],
}

const ResultadoChurrasco = () => {

  const location = useLocation()
  const navigate = useNavigate()

  const state = location.state as ResultadosChurrasco

  const totalPorAlimento = state.alimentosSelecionados.reduce((acc, alimento) => {
    acc[alimento] = (quantidadePessoas[alimento] * state.pessoas) / 1000
    return acc
  }, {} as Record<Alimento, number>)

  const reiniciar = () => {
    navigate("/")
  }

  return (
    <div>
      <h2>Resultado para {state.pessoas} pessoas:</h2>
      {state.alimentosSelecionados.map((alimento) => (
        <p key={alimento}>{nomesAlimentos[alimento]}: {totalPorAlimento[alimento]} kg</p>
      ))}
      <button onClick={reiniciar}>Reiniciar</button>
    </div>
  )
}

export default ResultadoChurrasco