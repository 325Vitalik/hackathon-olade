import { Dropdown } from "semantic-ui-react"

const allowedRadius=[0.5, 1, 2, 3, 5, 10, 20, 30, 50];
const METRE_IN_KILOMETER=1000;
const getText=(value)=>{
    if(value<1){
        return `${value*METRE_IN_KILOMETER} м`
    }

    return `${value} км`
}
const radiuses=allowedRadius.map(radius=>({value:radius*METRE_IN_KILOMETER, key:`${radius}`, text:getText(radius)}))

const SelectRadius =({onChange, value})=>{
    return (<Dropdown onChange={onChange} value={value} search placeholder={'Select animal type'} selection options={radiuses.map(colour=>{
        return {...colour, content:(<div className={'submit-form-colour-prompt'}><div className={'submit-form-colour-prompt-block'} style={{background:colour.key}} /><label>{colour.text}</label></div>)}
    })} />)
}

export default SelectRadius;