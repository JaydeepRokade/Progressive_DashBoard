import { 
    Refine,
    GitHubBanner, 
    WelcomePage,
    Authenticated, 
} from '@refinedev/core';
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { AuthPage,ErrorComponent
,useNotificationProvider
,ThemedLayoutV2
,ThemedSiderV2} from '@refinedev/antd';
import "@refinedev/antd/dist/reset.css";
import { createClient } from 'graphql-ws';
// import dataProvider, { GraphQLClient, liveProvider } from "@refinedev/nestjs-query";
import { authProvider, dataProvider,liveProvider } from './providers';
import {Home,ForgotPassword,Login,Register, CompanyList} from "./pages"


import { App as AntdApp } from "antd"
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import routerBindings, { NavigateToResource, CatchAllNavigate, UnsavedChangesNotifier, DocumentTitleHandler } from "@refinedev/react-router-v6";
import Layout from './components/layout';
import { resources } from './config/resources';
import Create from './pages/company/create';
import Edit from './pages/company/edit';
import List from './pages/tasks/list';
import EditTask from './pages/tasks/edit';
import CreateTask from './pages/tasks/create';


// import { Login } from "./pages/login";
// import { Register } from "./pages/register";
// import { ForgotPassword } from "./pages/forgotPassword";
// import { authProvider } from "./authProvider";




function App() {

    
    return (
        <BrowserRouter>
        <GitHubBanner />
        <RefineKbarProvider>
            
<AntdApp>
            <DevtoolsProvider>
                <Refine 
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider} 
                resources={resources}
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                        useNewQueryKeys: true,
                            projectId: "3vRbV6-bLs9Tp-bwIr3p",
                        liveMode: "auto",
                    }}
                >


                        <Routes>
                            
                            
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/forget-password" element={<ForgotPassword />} />
                            <Route element={<Authenticated
                                key="authentication-layout"
                                fallback={<CatchAllNavigate to="/login" />}
                                >
                                <Layout>
                                <Outlet/>
                               </Layout>
                               
                               </Authenticated>
                            }>
                                <Route index element={<Home />} />
                                <Route path="/companies">
                                <Route index element={<CompanyList/>}/>
                                <Route path="new" element={<Create/>}/>
                                {/* <Route path="edit/:id" element={<Edit/>}/> */}
                                <Route path="edit/:id" element={<Edit/>}/>
                                </Route>
                               <Route path="/tasks" element={
                                <List>
                                    <Outlet/>
                                </List>
                                }>
                                    <Route path="new" element={<CreateTask/>} />
                                    <Route path="edit/:id" element={<EditTask/>} />
                               </Route>
                            </Route>
                        </Routes>
                    <RefineKbar />
                    <UnsavedChangesNotifier />
                    <DocumentTitleHandler />
                </Refine>
            <DevtoolsPanel />
            </DevtoolsProvider>
            </AntdApp>
        </RefineKbarProvider>
        </BrowserRouter>
      );
};

export default App;
