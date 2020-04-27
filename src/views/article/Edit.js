import React,{Component} from 'react'

export default class Edit extends Component{
    render(){
        console.log(this.props)
        const state = this.props.location.state || JSON.parse(localStorage.getItem("title"))
        return(
            <div>
                文章编辑=>{state && state.title}
            </div>
        )
    }
}