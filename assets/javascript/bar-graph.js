const barChart = {
  id: "#barChart", //where in the page the graph should show up
  type: "simple", // can be "simple" or "stacked"
  color: 000, //hex value
  title: "", //name between quotes
  titleShow: 1, //1 for true 0 for false;
  titleFont:"arial", //must install webfonts in the header to use others
  titleFontColor: 000, //hex value
  barColor: [000], //hex value for stacked charts seperate colors with commas
  barLabelColor: 000, //hexvalue
  barSpacing: 6,//spaces between bars - bar width will change dynamically based on this value.
  data:[["sample", 10],["sample2", 5]],//[x axis labels, y axis values] 
  axis: "vert" //'vert' means the x axis and labels are on the bottom
}

console.log(barChart.data);
$(document).ready(function(){
  $(barChart.id).text("hello World!");

});