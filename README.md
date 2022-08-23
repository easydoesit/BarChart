# Scalable BarCharts

## About

This project allows you to create simple, stacked bar charts in a horizontal or vertical orientation.

You can choose the width and height of the entire chart. Those dimensions will include the chart axis, labels and the complete graph.

The graph scales to the size of the chart, so bars represent the actual numbers.

### Options for the User are:

- Height Size
- Width Size
- Space between bars
- Label placement
- Label Colors
- Include title or not.
- Title Font and Colors
- Single or Stacked Bars
- Data aligns Horizontally or Vertically

### Screenshots

![Screenshot 1](https://github.com/easydoesit/BarChart/blob/main/about/BarChartHorizontal%2001.png)

![Screenshot 2](https://github.com/easydoesit/BarChart/blob/main/about/BarChartHorizontal%2002.png)

![Screenshot 3](https://github.com/easydoesit/BarChart/blob/main/about/BarChartVertical%2001.png)

![Screenshot 4](https://github.com/easydoesit/BarChart/blob/main/about/BarChartVertical%2002.png)


### Usage

drawBarChart(barChartData, barChartOptions, element);

barChartData includes
- .data: ["Label", 0 , 4 , 1 ,2], ["Label 2", 0 ,4, 1, 2] | Where the first item is the name of what you're measuring and the following values are what you are measuring. Each label and value set should be equal.
 - .dataUnit: "string" | What you are measuring in example, meters or litres etc.

barChartOptions
- width: int, |  the total width of the graph
- height: int, | the total height of the graph
- title: "string" | name between quotes
- titleShow: Bool, | 1 for true 0 for false;
- titleFont:"string", | must install webfonts in the header to use others
- titleFontColor: "string", //hex value
- barColor:[["string"],["string"],["string"]], | hex value for stacked charts seperate colors with commas should be 1 for each stack in the bar. If you have 3 stacks in a bar, you need 3 colors.
- barLabelColor: "string", | hexvalue
- barSpacing: 6, |spaces between bars - bar width will change dynamically based on this value.
- barUnitPlacement: "center", | options are 'start', 'center' or 'end'
- axis: "horiz", | 'vert' means the labels are on the bottom "horiz" means they are on the side. 
- tickNum: int, | this approx number of measure between each tick

element
- "#string" takes a variable of the id where you want the chart to show up.

### Known issues / bugs

- Bar lenths and widths are a bit off, by about 3 pixels. Not noticable but needs to be fixed. Current hack is that I put -3 on the final lenght.

### Roadmap

- Styling to modernize the look
- more options for background styles
