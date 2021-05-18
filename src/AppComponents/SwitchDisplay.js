import React from "react";
import SwitchSelector from "react-switch-selector";



const SwitchDisplay = () =>{

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
         console.log(newValue);
     };
      
     const initialSelectedIndex = options.findIndex(({value}) => value === "chart");
      
     return (
         <div  style={{width: 250, height: 42, fontSize: 18, color: '#fff', backgroundColor: "#B6B5B5"}}>
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
