const barChart = {
  id: "#barChart", //where in the page the graph should show up
  type: "simple", // can be "simple" or "stacked"
  height: 500,// the height of the graph
  title: "10 Tallest Buildings", //name between quotes
  titleShow: 1, //1 for true 0 for false;
  titleFont:"arial", //must install webfonts in the header to use others
  titleFontColor: "AA0606", //hex value
  barColor: ["AA0606"], //hex value for stacked charts seperate colors with commas
  barLabelColor: "yellow", //hexvalue
  barSpacing: 6,//spaces between bars - bar width will change dynamically based on this value.
  barUnitPlacement: "end", //options are 'start', 'center' or 'end'
  data:[["Makkah Royal Clock Tower", 601],["Burj Khalifa", 828],["Shanghai Tower", 632],["Ping An Finance Center", 599],["Lotte World Tower",555.7],["One World Trade Center", 541.3],["Guangzhuo CTF Finance Center", 530], ["Tianjin CTF Finance Center", 530],["CITIC Tower", 528],["Taipei 101", 508]],//[x axis labels, y axis values] 
  dataUnit: "M",
  axis: "vert", //'vert' means the x axis and labels are on the bottom "horiz" means they are on the side
  tickNum:50, //this approx number between each tick
}

$(document).ready(function($){
  //get the largest measurement in the graph
  let largest = barChart.data[0][1];;
  for (let i = 0; i < barChart.data.length;i++){
    if (barChart.data[i][1] > largest){
      largest = barChart.data[i][1];
    }
  }
  // add the title to the graph
  if (barChart.titleShow === 1){
    $(barChart.id).append('<div class ="graphTitle" style="color:#' + barChart.titleFontColor + '; font-family:'+ barChart.titleFont + '">'+ barChart.title + '</div>');
  }
  $(barChart.id).append('<div class="barGraphGrid"></div>');
  let ratio = barChart.height/largest; //find the ratio between the largest number and the total height of the graph
  ratio = ratio.toFixed(2);//have the ratio just be 2 decimal places
  let ticks = Math.floor(largest/barChart.tickNum) + 1;//find the total number of ticks based on what the user wants the difference to be add one for the top.
  let spacing = Math.floor((barChart.tickNum*ratio) - 12); //find the spacing between each tick
  //add the ticks to the side of the graph
  $(".barGraphGrid").append('<div class="yAxisVal"></div><div class="yAxis"></div>');
  let width = 0;
    for (let i = ticks; i > 0; i--){
      if (i === ticks){
        $(".yAxisVal").append('<div class="tickbox" style="margin-bottom: '+ spacing +'px;"><span style="font-family:'+ barChart.titleFont + '">' + barChart.tickNum * i + '</span></div>');
        $(".yAxis").append('<div class="tickbox" style="margin-bottom: '+ spacing +'px;"><div class="tick"></div></div>');
        let tickValWidth = document.querySelector(".yAxisVal");
        tickValWidth= tickValWidth.querySelector(".tickbox");
        tickValWidth = tickValWidth.querySelector("span");
        width = tickValWidth.offsetWidth;
        //tickValWidth = tickValWidth.offsetWidth;
        console.log(width);
        $(tickValWidth).css("width", width); 
      } else {
        $(".yAxisVal").append('<div class="tickbox" style="margin-bottom: '+ spacing +'px;"><span style="font-family:'+ barChart.titleFont + '; width:'+ width +'px">' + barChart.tickNum * i + '</span></div>');
      $(".yAxis").append('<div class="tickbox" style="margin-bottom: '+ spacing +'px;"><div class="tick"></div></div>');
      }
    }

  if (barChart.type = "simple"){
    for (let i = 0; i < barChart.data.length;i++){
      let barHeight = Math.round((barChart.data[i][1]/largest)*barChart.height);
      $(".barGraphGrid").append('<div class="barGraphBar" style="height: ' + barHeight + 'px; align-items: '+ barChart.barUnitPlacement + '; background-color: #'+ barChart.barColor +'; margin:0px '+ barChart.barSpacing/2 + 'px"><span style="color: '+ barChart.barLabelColor +'">' + barChart.data[i][1] + ' ' + barChart.dataUnit + '</span></div>' );
      }
  }
});