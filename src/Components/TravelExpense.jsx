
import DonutChart from 'react-donut-chart';
export default function TravelExpense ()
{
   

// things I would never do:
<DonutChart
  data={[
    {
      label: 'Give you up',
      value: 25,
    },
    {
      label: '',
      value: 75,
      isEmpty: true,
    },
  ]}
/>;
}