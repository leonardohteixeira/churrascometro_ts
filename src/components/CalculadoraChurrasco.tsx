import { useNavigate } from "react-router-dom"
import { nomesAlimentos } from "../types"
import { Formik, Field, Form } from "formik"
import * as Yup from "Yup"

const esquemaValidacao = Yup.object().shape({
  pessoas: Yup.number().min(1, "Número de pessoas é obrigatório"),
  selecaoAlimentos: Yup.array().of(Yup.string()).test("check-selecaoAlimentos",
   "Selecione pelo menos um alimento", (array) => array !== null && array!.length > 0),
})

const CalculadoraChurrasco = () => {
  const navigate = useNavigate()

  return (
    <div>
      <Formik initialValues={{pessoas: 0, selecaoAlimentos: []}}
      validationSchema={esquemaValidacao}
      onSubmit={(values) => {
        navigate("/resultado", {
          state: {
            pessoas: values.pessoas,
            alimentosSelecionados: values.selecaoAlimentos,
          }
        })
      }}>
        {({errors, touched}) => (
          <Form>
          <div>
            <label htmlFor="pessoas">Número de pessoas:</label>
            <Field name="pessoas" type="number" />
            {errors.pessoas && touched.pessoas ? (<p>{errors.pessoas}</p>) : null}
          </div>
          <h2>Selecione os alimentos para o churrasco:</h2>

          {Object.keys(nomesAlimentos).map((alimento) => (
            <div>
              <Field type="checkbox" name="selecaoAlimentos" value={alimento} />
              <label htmlFor="selecaoAlimentos">{nomesAlimentos[alimento]}</label>
            </div>
          ))}
          {errors.selecaoAlimentos ? (<p>{errors.selecaoAlimentos}</p>) : null}
          <button type="submit">Calcular</button>
        </Form>
        )}
      </Formik>
    </div>
  )
}

export default CalculadoraChurrasco