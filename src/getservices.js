import React,{Fragment} from 'react';  

import { Table,Button } from 'react-bootstrap';  
import axios from 'axios';  
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import ReactHtmlParser from 'react-html-parser'; 

class ServicesList extends React.Component{  
    constructor(props){  
        super(props);  
        this.state = {  
           error:null,  
           servicearray:[]  ,
           providerarray:[]    ,
           provider:null  
        }  
    }  
  
    
    componentDidMount(){  
     
        axios.get('https://api.inquickerstaging.com/v3/winter.inquickerstaging.com/services')
            .then(response => 
            {  
                this.setState({  
                    servicearray: response.data.data
                });  
            })
            .catch(error =>{  
                this.setState({error});  
            }); 

            axios.get('https://api.inquickerstaging.com/v3/winter.inquickerstaging.com/providers?include=locations%2Cschedules.location&page%5Bnumber%5D=1&page%5Bsize%5D=10')
            .then(response => 
            {  
                this.setState({  
                    providerarray: response.data.data
                });  
            })
            .catch(error =>{  
                this.setState({error});  
            }); 
    };
    showDetails(props) {  
        this.setState({ provider: props }); 
      }  
      showProviderDetails = (props) => {
        return (
            <div  style={{float:"left" , padding:10 }}>
          <div  style={{float:"left" , padding:10 }}> 
         <img src={props.attributes["profile-image"]} height="190px" width="150px"/>
           </div>
           <div  style={{float:"left" , padding:5 , width:400 }}> 
           <p>{props.attributes.name}</p>
           <p>Subspecialties:</p>
           {props.attributes.subspecialties.map(subspecialty => (  
                        <h5>{subspecialty}</h5> 
                        ))}  
           <p>{props.attributes.affiliation}</p>
           <Fragment>
           {ReactHtmlParser(props.attributes.bio)}
           </Fragment>
            <p>{props.attributes["provider-type"]}</p>

             </div>
             </div>
          );
      }
    render(){        

        const{error,servicearray,providerarray}=this.state;  
        if(error){  
            return(  
                <div>Error:{error.message}</div>  
            )  
        }  
        else  
        {  
            return(  
                <div>  
                      
                  <Table>  
                    <thead className="btn-primary">  
                      <tr>  
                        <th>Service Name</th>  
                        
                      </tr>  
                    </thead>  
                    <tbody>  
                    {servicearray.map(service => (  
                        <tr key={service.id}>  
                   
                          <td>{service.id}</td>  
                         
                        </tr>  
                        ))}  
                    </tbody>  
                  </Table>  

                  <div>
                      <div className="btn-primary" style={{padding:5}} >
                       
                        <h4>Provider Name</h4>
                        <div style={{backgroundColor: "white",float:"left" , padding:10 ,margin:5 }} >
                        {providerarray.map(provider => (  
                        <p><Button variant="outline-primary" onClick={() => this.showDetails(provider)}>{provider.id}</Button>{' '}</p>   
                       
                        ))}  
                        </div>  
                        <div  style={{backgroundColor: "white" ,color: "blue" }}>
                      {this.state.provider ? this.showProviderDetails(this.state.provider) : null}
                     
                      </div>
                      </div>
                     
                  </div>

                </div>  

                 

              )  
        }  
    }  
}  
  
export default ServicesList;  