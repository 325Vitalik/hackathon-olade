import { Dropdown } from "semantic-ui-react"
const colours=[
    {key:'#633519', value:'brown', text:'коричневий'},
    {key:'#e2e3e1', value:'white', text:'білий'},
    {key:'#1c1c1c', value:'black', text:'чорний'},
]

const SelectColour =({onChange})=>{
    return (<Dropdown onChange={onChange} placeholder={'Select animal type'} selection options={colours.map(colour=>{
        return {...colour, content:(<div className={'submit-form-colour-prompt'}><div className={'submit-form-colour-prompt-block'} style={{background:colour.key}} /><label>{colour.text}</label></div>)}
    })} />)
}

export default SelectColour;