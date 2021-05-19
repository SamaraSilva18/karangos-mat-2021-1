import { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

export default function KarangosForm() {

    const colors = [
        'Amarelo',
        'Azul',
        'Bege',
        'Branco',
        'Cinza',
        'Dourado',
        'Laranja',
        'Marrom',
        'Prata',
        'Preto',
        'Rosa',
        'Roxo',
        'Verde',
        'Vermelho',
        'Vinho'
    ]

    const years = []
    for(let i = (new Date()).getFullYear(); i >= 1900; i--) years.push(i)

    const [karango, setKarango] = useState({
      id: null,
      marca: '',
      modelo: '',
      cor: '',
      ano_fabricacao: (new Date()).getUTCFullYear(),     // Ano corrente
      importado: 0,
      placa: '',
      preco: 0
    })
    const [currentId, setCurrentId] = useState()

    function handleInputChange(event, property) {
      setCurrentId(event.target.id)
      if(event.target.id) property = event.target.id
      // Quando o nome de uma propriedade de objeto aparece entre [],
      // significa que o nome da propriedade sera determinado pela
      // variavel ou expressao 
      setKarango({...karango, [property]: event.target.value})
    }

    return (
      <>
        <h1>Cadastrar Novo Karango</h1>
        <form>

          <TextField
             id="marca"
             label="Marca"
             variant="filled"
             value={karango.marca}
             onChange={handleInputChange}
             required /* Not Null, precisa ser preenchido */
             placeholder="Informe a marca do veiculo"            
          />

          <TextField
             id="modelo"
             label="Modelo"
             variant="filled"
             value={karango.modelo}
             onChange={handleInputChange}
             required /* Not Null, precisa ser preenchido */
             placeholder="Informe o modelo do veiculo"            
          />

          <TextField
             id="cor"
             label="Cor"
             variant="filled"
             value={karango.cor}
             onChange={(event) => handleInputChange(event, 'cor')}
             required /* Not Null, precisa ser preenchido */
             placeholder="Informe a cor do veiculo"            
             select
          >
              { colors.map(color => <MenuItem value={color}>{color}</MenuItem>)}
          </TextField>

          <TextField
             id="ano_fabricacao"
             label="Ano de Fabricaçao"
             variant="filled"
             value={karango.ano_fabricacao}
             onChange={event => handleInputChange(event, 'ano_fabricacao')}
             required /* Not Null, precisa ser preenchido */
             placeholder="Informe o ano de fabricaçao do veiculo"            
             select
          >
              { years.map(year => <MenuItem value={year}>{year}</MenuItem>)}
          </TextField>

        <div>
          {JSON.stringify(karango)}
          <br />
          currentId: {currentId}
        </div>
        </form>
      </>
    )
}