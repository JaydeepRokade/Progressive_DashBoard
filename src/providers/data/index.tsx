import graphqlDataProvider, { 
    GraphQLClient,
    liveProvider as graphLiveProvider,
} from "@refinedev/nestjs-query";
import { fetchWrapper } from "./fetch-wrapper";
import { createClient } from "graphql-ws";

export const API_BASE_URL = "https://api.crm.refine.dev"
export const API_URL = `${API_BASE_URL}/graphql`
export const WS_URL = "https://api.crm.refine.dev/graphql"

export const client = new GraphQLClient(API_URL, {
    fetch:(url:string, options: RequestInit) =>{
        try{
            return fetchWrapper(url, options);
        }catch(error){
            return Promise.reject(error as Error);
        }
    }
})

export const wsClient = typeof window !== "undefined"
 ?createClient({
    url: WS_URL,
    connectionParams:()=>{
        const accessToken = localStorage.getItem("access_token");

        return {
            headers: {
                Authorization : `Bearer ${accessToken}`,
            }
        }
    }
 })
 :undefined

 export const dataProvider = graphqlDataProvider(client);
 export const liveProvider =wsClient? graphLiveProvider(wsClient) : undefined;