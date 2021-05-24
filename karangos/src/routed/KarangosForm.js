import { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import InputMask from 'react-input-mask'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    maxWidth: '80%',
    margin: '0 auto',
    '& .MuiFormControl-root': {
      minWidth: '200px',
      maxWidth: '500px',
      margin: '0 24px 24px 0'
    }
  }
}))

export default function KarangosForm() {
const classes = useStyles()

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

    // Expressao regular definindo a mascara de entrada para a placa
    const placaMask = /[A-Z]{3}-[0-9][0-9|A-J][0-9]{3}/

    const [karango, setKarango] = useState({
      id: null,
      marca: '',
      modelo: '',
      cor: '',
      ano_fabricacao: (new Date()).getUTCFullYear(),     // Ano corrente
      importado: '0',
      placa: '',
      preco: 0
    })
    const [currentId, setCurrentId] = useState()

    const [importadoChecked, setImportadoChecked] = useState(false)

    function handleInputChange(event, property) {
      setCurrentId(event.target.id)
      if(event.target.id) property = event.target.id
        
      if(property === 'importado') {
        const newState = ! importadoChecked // Inverte o valor
        if(newState) setKarango({...karango, importado: '1'})
        else setKarango({...karango, importado:'0'})
        setImportadoChecked(newState)
      }
      else {
      // Quando o nome de uma propriedade de objeto aparece entre [],
      // significa que o nome da propriedade sera determinado pela
      // variavel ou expressao 
      setKarango({...karango, [property]: event.target.value})
      }
    }

    return (
      <>
        <h1>Cadastrar Novo Karango</h1>
        <form className={classes.form}>

          <TextField
             id="marca"
             label="Marca"
             variant="filled"
             value={karango.marca}
             onChange={handleInputChange}
             required /* Not Null, precisa ser preenchido */
             placeholder="Informe a marca do veiculo"            
             fullWidth
          />

          <TextField
             id="modelo"
             label="Modelo"
             variant="filled"
             value={karango.modelo}
             onChange={handleInputChange}
             required /* Not Null, precisa ser preenchido */
             placeholder="Informe o modelo do veiculo"            
             fullWidth
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
             fullWidth
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
             fullWidth
          >
            { years.map(year => <MenuItem value={year}>{year}</MenuItem>)}
          </TextField>

        <FormControl fullWidth>
            <FormControlLabel control ={
            <Checkbox
              id="importado"
              checked={importadoChecked}
              onChange={handleInputChange}
              color="primary"
            />
            }
            label="Importado?"
           />
        </FormControl>

        <InputMask
          id="placa"
          mask={placaMask}
          value={karango.placa}
          onChange={handleInputChange}
        >
        {() => <TextField
          label="Placa"
          variant="filled"
          required /* not null, precisa ser preenchido */
          placeholder="Informe a placa do veiculo"
          fullWidth
        />}
        </InputMask>

        <div>
          {JSON.stringify(karango)}
          <br />
          currentId: {currentId}
        </div>
        </form>
      </>
    )
}