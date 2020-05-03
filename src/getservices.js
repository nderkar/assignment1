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
           service:null,
           providerarray:[]    ,
           provider:null,
           isserviceprovider:null  
        };
        
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
    setSelectedServiceState(props) {  
        this.setState({ service: props }); 
        this.setState({ isserviceprovider: null });  
        this.setState({ provider: null });  
      }  
    setSelectedProviderState(props) {  
        this.setState({ provider: props }); 
      } 
      
      showProvider = (myprovider) => {        
        return (
            this.state.service ?

                this.showServiceProviderRow(myprovider,this)
        
            :
            
                this.showProviderRow(myprovider) 
           
      );
    }
    showProviderRow = (myprovider) => {
        return (
        <p><Button variant="outline-primary" onClick={() => this.setSelectedProviderState(myprovider)}>{myprovider.attributes.name}</Button>{' '}</p>
               
            );
      }   
      showServiceProviderRow= (myprovider,thisobj) => {
        
        this.showServiceProviders(myprovider,thisobj);
        if(this.state.isserviceprovider == 'true')        
        {
            return thisobj.showProviderRow(myprovider) ; 
        }
        else
        {
            return '';
        }       
        
      }

      showServiceProviders = (myprovider,thisobj) => {           
         
        myprovider.relationships.schedules.data.map(schedule => (
            
            this.checkServiceProviders(schedule, thisobj)   
           
        )); 
         
      };     
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
    checkServiceProviders(schedule, thisobj) {        
        return axios.get('https://api.inquickerstaging.com/v3/winter.inquickerstaging.com/schedules/' + schedule.id)
            .then(function (response) {
                if (response.data.data.attributes.service.toString().toLowerCase() == thisobj.state.service.attributes.name.toString().toLowerCase()) {
                    thisobj.setState({ isserviceprovider: 'true' });
                }
            })
            .catch(function (error) {
            });
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
                   
                  <div>
                      <div className="btn-primary" style={{padding:5}} >
                       
                        <h4>Service Name</h4>
                        <div style={{backgroundColor: "white" , padding:10 ,margin:5 }} >
                        {servicearray.map(myservice => (  
                        <p><Button variant="outline-primary" onClick={() => this.setSelectedServiceState(myservice)}>{myservice.attributes.name}</Button>{' '}</p>   
                       
                        ))}  
                        </div>  
                        
                      </div>
                     
                  </div>

                  <div>
                      <div className="btn-primary" style={{padding:5}} >
                       
                        <h4>Provider Name</h4>
                        <div style={{backgroundColor: "white",float:"left" , padding:10 ,margin:5 }} >
                        {providerarray.map(myprovider => (  
                            this.showProvider(myprovider) 
                       
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