import React from 'react';  
import { Table,Button } from 'react-bootstrap';  
import axios from 'axios';  
class ServicesList extends React.Component{  
    constructor(props){  
        super(props);  
        this.state = {  
           error:null,  
           servicearray:[]  ,
           providerarray:[]      
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

                  <Table>  
                    <thead className="btn-primary">  
                      <tr>  
                        <th>Provider Name</th>  
                        
                      </tr>  
                    </thead>  
                    <tbody>  
                    {providerarray.map(provider => (  
                        <tr key={provider.id}>  
                   
                          <td>{provider.id}</td>  
                         
                        </tr>  
                        ))}  
                    </tbody>  
                  </Table>  
                </div>  

                 

              )  
        }  
    }  
}  
  
export default ServicesList;  