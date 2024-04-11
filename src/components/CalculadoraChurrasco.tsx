import { useNavigate } from "react-router-dom"
import { nomesAlimentos } from "../types"
import { Formik, Field, Form } from "formik"
import * as Yup from "Yup"

const CalculadoraChurrasco = () => {
  const navigate = useNavigate()

  return (
    <div>
      <Formik initialValues={{pessoas: 0, selecaoAlimentos: []}} onSubmit={() => {
        navigate("/resultado")
        console.log("teste")
      }}>
        <Form>
          <div>
            <label htmlFor="pessoas">Número de pessoas:</label>
            <Field name="pessoas" type="number" />
          </div>
          <h2>Selecione os alimentos para o churrasco:</h2>
          {Object.keys(nomesAlimentos).map((alimento) => (
            <div>
              <Field type="checkbox" name="selecaoAlimentos" value={alimento} />
              <label htmlFor="selecaoAlimentos">{nomesAlimentos[alimento]}</label>
            </div>
          ))}
          <button type="submit">Calcular</button>
        </Form>
      </Formik>
    </div>
  )
}

export default CalculadoraChurrasco