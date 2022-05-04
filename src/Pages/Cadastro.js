import { Component, Fragment, React } from "react";
import EnderecoApi from "../Services/EnderecoApi"; 
import CadastroApi from "../Services/CadastroApi";

class Cadastro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listaEstados: [],
            formCadastro: {
                aceito: false, 
                nomeCompleto: "", 
                dataNascimento: "", 
                cpf: "", 
                cep: "",
                logradouro: "", 
                numeroLogradouro: "", 
                email: "",
                cidade: ""
            },
            erros: {
                nomeCompleto: [],
                dataNascimento: [], 
                cpf: [],
                cep: [], 
                logradouro: [], 
                numeroLogradouro: [],
                email: [], 
                cidade: []
            }

        }
    } 

   aceitarTermo = () => {
       this.setState({
           formCadastro:{ 
               ...this.state.formCadastro, ...{ aceito: !this.state.formCadastro.aceito}
           }
       })
   }

    componentDidMount(){
        EnderecoApi.getEstados()
            .then(resp =>  this.setState( {listaEstados: resp.data}) );
    }


    escutadorDeInputFormCadastro = event => {
        const { name, value } = event.target;
        this.setState({
            formCadastro: {...this.state.formCadastro, ...{[name]: value} }
        });
    } 


    enviarFormulario = ( ) => {
        CadastroApi.cadastrar(this.state.formCadastro)
        .then(r => {
            alert("Deu certo")
        })
        .catch(e => {
            if(e.response && e.response.status === 422){
                let errosFormCadastro = {};
                Object.entries(e.response.data.errors).forEach((obj, index) => {
                    console.log(obj);
                    index === 0 && document.querySelector(`[name=${[obj[0]]}`).focus();
                    errosFormCadastro = {...errosFormCadastro, [obj[0]]: [obj[1]]};
                })

                this.setState({ 'erros': {...this.state.erros, ...errosFormCadastro}});
            }
        })
    }


    render() { 
        const formCadastro = this.state.formCadastro;
        return (
            <Fragment>
                <hr />
                <section className="cadastro" id="sessaoCadastro">
                    <h3 className="display-4 text-center text-info">Cadastro</h3>
                    <span className="texto-formulario">
                        Você quer ter uma <strong>vida saudável</strong>, com muito mais <strong>vigor</strong> e <strong>longevidade</strong>?
                        Preencha o formulário abaixo e um de nossos especialistas entrará em contato com você.
                    </span>
                    <form id="formCadastro" className="mt-5">
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <label htmlFor="cadastroNomeCompleto">Nome Completo:</label>
                                <input type="text" 
                                id="cadastroNomeCompleto" 
                                value={formCadastro.nomeCompleto} 
                                onChange={this.escutadorDeInputFormCadastro} 
                                className={"form-control" +  (this.state.erros.nomeCompleto.length > 0 ? " is-invalid"  : "")} 
                                name="nomeCompleto"
                                placeholder="Nome Completo" />
                                <div className="invalid-feedback">
                                     {this.state.erros.nomeCompleto.map( (item, index) => <div key={index} >{item}</div>)}
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="cadastroDataNascimento">Data de Nascimento:</label>
                                <input type="date" id="cadastroDataNascimento" 
                                  value={formCadastro.dataNascimento} 
                                  onChange={this.escutadorDeInputFormCadastro} 
                                  className={"form-control" +  (this.state.erros.dataNascimento.length > 0 ? " is-invalid"  : "")} 
                                  name="dataNascimento"
                                  placeholder="data Nascimento" />
                                  <div className="invalid-feedback">
                                     {this.state.erros.dataNascimento.map( (item, index) => <div key={index} >{item}</div>)}
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className="row">
                                    <fieldset>
                                        <legend className="col-form-label col-sm-2 pt-0">Sexo:</legend>
                                        <div className="col-sm-10">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="cadastroSexo" id="cadastroFeminino" value="F" defaultChecked={true}/>
                                                    <label className="form-check-label" htmlFor="cadastroFeminino">
                                                        Feminino
                                                    </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="cadastroSexo" id="cadastroMasculino" value="M" />
                                                    <label className="form-check-label" htmlFor="cadastroMasculino">
                                                        Masculino
                                                    </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="cadastroSexo" id="cadastroOutro" value="O" />
                                                    <label className="form-check-label" htmlFor="cadastroOutro">
                                                        Outro
                                                    </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="cadastroCpf">CPF:</label>
                                <input type="text"  className={"form-control" +  (this.state.erros.cpf.length > 0 ? " is-invalid"  : "")} 
                                 id="cadastroCpf" placeholder="000.000.000-00" data-mask="000.000.000-00" name="cpf" onChange={this.escutadorDeInputFormCadastro} value={formCadastro.cpf} />
                                 <div className="invalid-feedback"> 
                                 {this.state.erros.cpf.map( (item, index) => <div key={index} > {item}</div>)}
                                 </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="cadastroCep">CEP:</label>
                                <input type="text" className={"form-control" +  (this.state.erros.cep.length > 0 ? " is-invalid"  : "")} 
                                 id="cadastroCep" placeholder="00000-000" data-mask="00000-000" name="cep" onChange={this.escutadorDeInputFormCadastro} value={formCadastro.cep} />
                                 <div className="invalid-feedback"> 
                                 {this.state.erros.cep.map( (item, index) => <div key={index} > {item}</div>)}
                                 </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="cadastroLogradouro">Logradouro:</label>
                                <input type="text" className={"form-control" +  (this.state.erros.logradouro.length > 0 ? " is-invalid"  : "")}  
                                id="cadastroLogradouro" placeholder="Logradouro" name="logradouro" onChange={this.escutadorDeInputFormCadastro} value={formCadastro.logradouro}/>
                                 <div className="invalid-feedback"> 
                                 {this.state.erros.logradouro.map( (item, index) => <div key={index} > {item}</div>)}
                                 </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="cadastroNumeroLogradouro">Número Logradouro:</label>
                                <input type="text" className={"form-control" +  (this.state.erros.numeroLogradouro.length > 0 ? " is-invalid"  : "")}
                                  id="cadastroNumeroLogradouro" placeholder="Número Logradouro" name="numeroLogradouro" onChange={this.escutadorDeInputFormCadastro} value={formCadastro.numeroLogradouro}/>
                                   <div className="invalid-feedback"> 
                                 {this.state.erros.numeroLogradouro.map( (item, index) => <div key={index} > {item}</div>)}
                                 </div>
                            </div>
                            <div className="col-md-12 mb-3">
                                <label htmlFor="cadastroEmail">Endereço de email:</label>
                                <input type="email" className="form-control" id="cadastroEmail" aria-describedby="emailHelp" placeholder="Seu email" 
                                  name="email" onChange={this.escutadorDeInputFormCadastro} value={formCadastro.email}/> 
                                    <small id="emailHelp" className={"form-control" +  (this.state.erros.email.length > 0 ? " is-invalid"  : "")}>Nunca vamos compartilhar seu email, com ninguém.</small> 
                                <div className="invalid-feedback"> 
                                  {this.state.erros.email.map( (item, index) => <div key={index} > {item}</div>)}
                                </div>
                                   
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="mr-sm-2" htmlFor="cadastroUf">Estado:</label>
                                <select className={"form-control custom-select mr-sm-2" +  (this.state.erros.email.length > 0 ? " is-invalid"  : "")} id="cadastroUf" name="estado" onChange={this.componentDidMount} value={formCadastro.estado}>
                                    <option value={formCadastro.estado}> Selecione...</option> 
                                    {this.state.listaEstados.map( item => <option key={item.uf} value={item.uf}>{item.nome}</option>)}
                                </select> 
                              
                            </div>
                            <div className="col-md-8 mb-3">
                                <label htmlFor="cadastroCidade">Cidade:</label>
                                <input type="text" className={"form-control" +  (this.state.erros.cidade.length > 0 ? " is-invalid"  : "")} 
                                id="cadastroCidade" placeholder="Cidade" 
                                name="cidade" onChange={this.escutadorDeInputFormCadastro} value={formCadastro.cidade}/>
                                <div className="invalid-feedback"> 
                                  {this.state.erros.cidade.map( (item, index) => <div key={index} > {item}</div>)}
                                </div>
                            </div>
                            <div className="col-md-12 mb-3">
                                <label htmlFor="cadastroExpectativa">Qual sua expectativa?</label>
                                <textarea className="form-control" id="cadastroExpectativa" rows="5"></textarea>
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="cadastroDeAcordo" onChange={this.aceitarTermo} />
                                    <label className="form-check-label" htmlFor="cadastroDeAcordo">Estou de acordo com os termos</label>
                            </div>
                            <div className="col-md-12 mb-3">
                                <button id="btnSubmitCadastro" type="button" className="btn btn-primary" onClick={this.enviarFormulario} disabled={!this.state.formCadastro.aceito}>Enviar</button>
                            </div>
                        </div>
                    </form>
                </section>
            </Fragment>
        )
    }
    
};

export default Cadastro;