import React,{Component,Fragment} from 'react';
import {adminRoute} from './routes'
import {Route,Switch,Redirect} from 'react-router-dom'
import Frame from './components/frame'
export default class App extends Component{
    render(){
        return(
            <Fragment>
                <Frame>
                    <Switch>
                    {
                        adminRoute.map(route=>{
                            return <Route key={route.pathname} path={route.pathname} component={route.component} exact={route.exact}/>
                        })
                    }
                    <Redirect to={adminRoute[0].pathname} from="/admin" exact/>
                    <Redirect to="404"/>
                    </Switch>
                </Frame>
            </Fragment>
        )
    }
}

