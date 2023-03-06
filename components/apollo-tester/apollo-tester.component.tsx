import React, { FunctionComponent } from 'react'; // importing FunctionComponent
import gql from "graphql-tag";
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, useMutation } from "@apollo/client";
import dummyData from './dummy-data'; 

const client = new ApolloClient({
    uri: 'https://api.esocna.soolid.tech/graphql',
    cache: new InMemoryCache(),
  });

//ALL_THIRD_PARTIES uses gql from @apollo/client to allow us send nested queries 
const ALL_THIRD_PARTIES = gql`
query GetAllThirdParties {
    allThirdParties {
      _id
      contactInfo {
        email
        website
      }
    }
  }
`;

export const ApolloTester:FunctionComponent  = ()=>{

    // client
    // .query({
    //     query: ALL_THIRD_PARTIES
    // })
    // .then((result) => console.log(result));
  
    // const thirdParies = useQuery(ALL_THIRD_PARTIES);
    // console.log("thirdParies", thirdParies);


    return(
        <ApolloProvider client={client}>
            {
                dummyData.data.allThirdParties.map((value, index) =>{
                return <div key={index}>
                    {value._id.toString()}
                    </div>
                 })
            }
        </ApolloProvider>);
}

export default ApolloTester;