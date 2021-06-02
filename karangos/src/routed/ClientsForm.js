import { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import InputMask from 'react-input-mask'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import React from 'react'
import ConfirmDialog from '../ui/ConfirmDialog'

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
  },
  toolbar: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: '36px'
  }
}))

export default function ClientsForm() {
  const classes = useStyles()

  const estados = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO'
  ]

  // Classes de caracters para a máscara da placa
  // 1) Três primeiras posições, somente letras (maiúsculas ou minúsculas) ~> [A-Za-z]
  // 2) Quinta, sétima e oitava posições, somente dígitos ~> [0-9]
  // 3) Sexta posição: dígitos ou letras (maiúsculas ou minúsculas) de A a J ~> [0-9A-Ja-j]
  const formatChars = {
    'A': '[A-Za-z]',
    '0': '[0-9]',
    '#': '[0-9A-Ja-j]'
  }

  const cpfMask = '000.000.000-00'
  const telMask = '(00)00000-0000'
  const rgMask = '00.000.000-0'
  // Máscara para CPF: '000.000.000-00'
  // Máscara para CNPJ: '00.000.000/0000-00'

  const [client, setClient] = useState({
    id: null,
    nome: '',
    cpf: '',
    rg: '',
    logradouro: '',
    num_imovel: '',
    complemento: '',
    bairro: '',
    municipio: '',
    uf: '',
    telefone: '',
    email:''
  })

  const [sendBtnStatus, setSendBtnStatus] = useState({
    disabled: false,
    label: 'Enviar'
  })

  const [sbStatus, setSbStatus] = useState({
    open: false,
    severity: 'success',
    message: '' 
  })

  const [error, setError] = useState({
    nome: '',
    cpf: '',
    rg: '',
    logradouro: '',
    num_imovel: '',
    bairro: '',
    municipio: '',
    uf: '',
    telefone: '',
    email:''
  })

  const [isModified, setIsModified] = useState(false)

  const [dialogOpen, setDialogOpen] = useState(false) // O diálogo de confirmação está aberto?

  const [title, setTitle] = useState('Cadastrar novo Cliente')

  const history = useHistory()
  const params = useParams()

  // useEffect() para quando o formulário for carregado (só na inicialização)
  useEffect(() => {
    // Verificamos se a rota atual contém o parâmetro id
    // Em caso positivo, buscamos os dados no back-end e carregamos o formulário para edição
    if(params.id) {
      setTitle('Editar Cliente')
      getData(params.id)
    }
  }, [])

  async function getData(id) {
    try {
      let response = await axios.get(`https://api.faustocintra.com.br/clientes/${id}`)
      setClient(response.data)
    }
    catch(error) {
      setSbStatus({
        open: true,
        severity: 'error',
        message: 'Não foi possível carregar os dados para edição.'
      })
    }
  }

  function handleInputChange(event, property) {
    
    const clientTemp = {...client}


    if(event.target.id) property = event.target.id

    clientTemp[property] = event.target.value

    setClient(clientTemp)
    setIsModified(true)   // O formulário foi modificado
    validate(clientTemp)  // Dispara a validação
  }

  function validate(data) {
    let isValid = true

    const errorTemp = {
      nome: '',
      cpf: '',
      rg: '',
      logradouro: '',
      num_imovel: '',
      bairro: '',
      municipio: '',
      uf: '',
      telefone: '',
      email:''
    }

    // trim(): retira espaços em branco do início e do final de uma string
    if(data.nome.trim() === '') {
      errorTemp.nome = 'O nome do cliente deve ser preenchido!'
      isValid = false
    }     

    if(data.cpf.trim() === '' || data.cpf.includes('_')) {
      errorTemp.cpf = 'O cpf deve ser preenchido corretamente!'
      isValid = false
    }

    if(data.rg.trim() === '' || data.rg.includes('_')) {
      errorTemp.rg = 'O rg deve ser preenchido corretamente!'
      isValid = false
    }

    if(data.logradouro.trim() === '') {
      errorTemp.logradouro = 'O logradouro do cliente deve ser informado!'
      isValid = false
    }

    if(data.num_imovel.trim() === '') {
      errorTemp.num_imovel = 'O número da casa deve ser informado!'
      isValid = false
    }

    if(data.bairro.trim() === '') {
      errorTemp.bairro = 'O bairro deve ser informado!'
      isValid = false
    }


    if(data.municipio.trim() === '') {
      errorTemp.municipio = 'O múnicipio deve ser informado!'
      isValid = false
    }

    if(data.uf.trim() === '') {
      errorTemp.uf = 'O estado deve ser informado!'
      isValid = false
    }

    // O telefone não pode ser uma string vazia
    if(data.telefone.trim() === '' || data.telefone.includes('_')) {
      errorTemp.telefone = 'O telefone deve ser preenchido corretamente!'
      isValid = false
    }

    if(data.email.trim() === '') {
      errorTemp.email = 'O email deve ser informado!'
      isValid = false
    }

    setError(errorTemp)
    return isValid
  }

  async function saveData() {
    try {
      // Desabilita o botão de enviar para evitar envios duplicados
      setSendBtnStatus({disabled: true, label: 'Enviando...'})
      
      // Se estivermos editando, precisamos enviar os dados com o verbo HTTP PUT
      if(params.id) await axios.put(`https://api.faustocintra.com.br/clientes/${params.id}`, client)
      // Senão, estaremos criando um novo registro, e o verbo HTTP a ser usado é o POST
      await axios.post('https://api.faustocintra.com.br/clientes', client)
      
      // Mostra a SnackBar
      setSbStatus({open: true, severity: 'success', message: 'Dados salvos com sucesso!'})
      
    }
    catch(error) {
      // Mostra a SnackBar
      setSbStatus({open: true, severity: 'error', message: 'ERRO: ' + error.message})
    }
    // Restaura o estado inicial do botão de envio
    setSendBtnStatus({disabled: false, label: 'Enviar'})
  }

  function handleSubmit(event) {

    event.preventDefault()    // Evita que a página seja recarregada

    if(validate(client)) saveData()

  }

  function handleSbClose() {
    setSbStatus({...sbStatus, open: false})

    // Retorna para a página de listagem em caso de sucesso
    if(sbStatus.severity === 'success') history.push('/listc')
  }

  function handleDialogClose(result) {
    setDialogOpen(false)

    // Se o usuário concordou em voltar 
    if(result) history.push('/listc')
  }

  function handleGoBack() {
    // Se o formulário tiver sido modificado, exibimos o diálogo de confirmação
    if(isModified) setDialogOpen(true)
    // Senão, podemos voltar diretamente para a listagem
    else history.push('/listc')
  }

  return (
    <>

      <ConfirmDialog isOpen={dialogOpen} onClose={handleDialogClose}>
        Há dados não salvos. Deseja realmente sair?
      </ConfirmDialog>

      <Snackbar open={sbStatus.open} autoHideDuration={6000} onClose={handleSbClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSbClose} severity={sbStatus.severity}>
          {sbStatus.message}
        </MuiAlert>
      </Snackbar>

      <h1>{title}</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        
        <TextField 
          id="nome" 
          label="Nome" 
          variant="filled"
          value={client.nome}
          onChange={handleInputChange}
          required  /* not null, precisa ser preenchido */
          placeholder="Informe o nome do cliente"
          fullWidth
          error={error.nome !== ''}
          helperText={error.nome}
        />

        <InputMask
          id="cpf" 
          mask={cpfMask}
          formatChars={formatChars}
          value={client.cpf}
          onChange={(event) => handleInputChange(event, 'cpf')}
        >
          {() => <TextField 
            label="CPF" 
            variant="filled"
            required  /* not null, precisa ser preenchido */
            placeholder="Informe o CPF do cliente"
            fullWidth
            error={error.cpf !== ''}
            helperText={error.cpf}
          />}
        </InputMask>

        <InputMask 
          id="rg"
          mask={rgMask}
          formatChars={formatChars} 
          value={client.rg}
          onChange={(event) => handleInputChange(event, 'rg')}
        >
          {() => <TextField
          label="RG" 
          variant="filled"
          required  /* not null, precisa ser preenchido */
          placeholder="Informe o RG do cliente"
          fullWidth
          error={error.rg !== ''}
          helperText={error.rg}
        />}
        </InputMask>

        <TextField 
          id="logradouro" 
          label="Logradouro" 
          variant="filled"
          value={client.logradouro}
          onChange={handleInputChange}
          required  /* not null, precisa ser preenchido */
          placeholder="Informe o nome da rua do cliente"
          fullWidth
          error={error.logradouro !== ''}
          helperText={error.logradouro}
        />

        <TextField 
          id="num_imovel" 
          label="Nº Imóvel" 
          variant="filled"
          value={client.num_imovel}
          onChange={handleInputChange}
          required  /* not null, precisa ser preenchido */
          placeholder="Informe o número da casa do cliente"
          fullWidth
          error={error.num_imovel !== ''}
          helperText={error.num_imovel}
        />

        <TextField 
          id="complemento" 
          label="Complemento" 
          variant="filled"
          value={client.complemento}
          onChange={handleInputChange}
          placeholder="Adicione um complemento ao endereço (opcional)."
          fullWidth
        />

        <TextField 
          id="bairro" 
          label="Bairro" 
          variant="filled"
          value={client.bairro}
          onChange={handleInputChange}
          required  /* not null, precisa ser preenchido */
          placeholder="Informe o bairro do cliente"
          fullWidth
          error={error.bairro !== ''}
          helperText={error.bairro}
        />

        <TextField 
          id="municipio" 
          label="Município" 
          variant="filled"
          value={client.municipio}
          onChange={handleInputChange}
          required  /* not null, precisa ser preenchido */
          placeholder="Informe a cidade do cliente"
          fullWidth
          error={error.municipio !== ''}
          helperText={error.municipio}
        />

        <TextField 
          id="uf" 
          label="Estado" 
          variant="filled"
          value={client.uf}
          onChange={event => handleInputChange(event, 'uf')}
          required  /* not null, precisa ser preenchido */
          placeholder="Informe o estado do cliente"
          select
          fullWidth
          error={error.uf !== ''}
          helperText={error.uf}
        >
          { estados.map(estado => <MenuItem value={estado}>{estado}</MenuItem>)}
        </TextField>

        <InputMask
          id="telefone" 
          mask={telMask}
          formatChars={formatChars}
          value={client.telefone}
          onChange={(event) => handleInputChange(event, 'telefone')}
        >
          {() => <TextField 
            label="Telefone" 
            variant="filled"
            required  /* not null, precisa ser preenchido */
            placeholder="Informe o telefone do cliente"
            fullWidth
            error={error.telefone !== ''}
            helperText={error.telefone}
          />}
        </InputMask>

        <TextField 
          id="email" 
          label="E-Mail" 
          variant="filled"
          value={client.email}
          onChange={handleInputChange}
          required  /* not null, precisa ser preenchido */
          placeholder="Informe o e-mail do cliente"
          fullWidth
          error={error.email !== ''}
          helperText={error.email}
        />

        <Toolbar className={classes.toolbar}>
          <Button type="submit" variant="contained" color="secondary" disabled={sendBtnStatus.disabled}>
            {sendBtnStatus.label}
          </Button>
          <Button variant="contained" onClick={handleGoBack}>Voltar</Button>
        </Toolbar>

        {/* <div>
          {JSON.stringify(client)}
          <br />
          currentId: {JSON.stringify(currentId)}
        </div> */}
      </form>
    </>
  )
}