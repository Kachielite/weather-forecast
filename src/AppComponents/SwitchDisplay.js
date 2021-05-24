import React from "react";
import SwitchSelector from "react-switch-selector";



const SwitchDisplay = (props) =>{

    const options = [
        {
            label: "Chart",
            value: "chart",
            selectedBackgroundColor: "#3F51B4",
        },
        {
            label: "Table",
            value: "table",
            selectedBackgroundColor: "#3F51B4"
        }
     ];
      
     const onChange = (newValue) => {
         props.toggleDisplay(newValue)
     };
      
     const initialSelectedIndex = options.findIndex(({value}) => value ==="table");
      
     return (
         <div  style={{width: 200, height: 40, fontSize: 18, color: '#fff', backgroundColor: "#B6B5B5"}}>
             <SwitchSelector
                 onChange={onChange}
                 options={options}
                 initialSelectedIndex={initialSelectedIndex}
                 backgroundColor={"#B6B5B5"}
                 fontColor={"#f5f6fa"}
                 wrapperBorderRadius={0}
                 optionBorderRadius={0}
                 fontSize={18}
             />
         </div>
     );
    
}

export default SwitchDisplay
