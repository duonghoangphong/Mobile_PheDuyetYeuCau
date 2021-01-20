import React from 'react';
import {PieChart} from 'react-native-svg-charts';

export default class PieChartExample extends React.PureComponent {
  render() {
    const data = [50, 30, 20];

    const randomColor = () =>
      ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
        0,
        7,
      );
    const mau = (index) => {
      switch (index) {
        case 0:
          return 'red';
          break;
        case 1:
          return 'green';
          break;
        case 2:
          return 'blue';
          break;
        default:
          break;
      }
    };

    const pieData = data
      .filter((value) => value > 0)
      .map((value, index) => ({
        value,
        svg: {
          // fill: index == 1 ? 'red' : 'blue',
          fill: mau(index),
          onPress: () => console.log('press', index),
        },
        key: `pie-${index}`,
      }));

    return <PieChart style={{height: 200}} data={pieData} />;
  }
}
