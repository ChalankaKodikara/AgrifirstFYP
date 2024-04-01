import React from 'react'
import { SparklineComponent , Inject , SparklineTooltip } from '@syncfusion/ej2-react-charts';


class SparkLine extends React.PureComponent {
render(){
const {currentColor , id , type , height , width , data ,color} = this.props;

  return (
<SparklineComponent
id={id}
height={height}
width={width}
LineWidth={1}
valueType='Numeric'
fill={color}
border={{color:currentColor , width:2}}
dataSource={data}
xName='x'
yName='yval'
type={type}
tooltipSettings={{
  visible:true ,
  format: '${x} : data ${yval}',
  trackLineSettings: {
    visible:true
  }
}}
>
<Inject services={[SparklineTooltip]} />
</SparklineComponent>
  )
}
}
export default SparkLine

