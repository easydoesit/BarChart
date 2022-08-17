let drawBarChart = function (data, options, element) {
  // create an local scope object that has all the info we need from Data, options,element.
  const barChart = {
    id: element,
    type: options.type, 
    height: options.height,
    title: options.title, 
    titleShow: options.titleShow,
    titleFont:  options.titleFont, 
    titleFontColor: options.titleFontColor, 
    barColor: options.barColor, 
    barLabelColor: options.barLabelColor, 
    barSpacing: options.barSpacing,
    barUnitPlacement: options.barUnitPlacement,
    axis: options.axis, 
    tickNum: options.tickNum, 
    data: data.data,
    dataUnit: data.dataUnit,
  }

    // we need to know the largest bar size in the graph as everything is going to scale to this.
    let largest = 0;
    //get a measurement of the first item of data in the graph
    //because we can do a stacked graph we have to add all the values together.
    for (let i = 1; i < barChart.data[0].length; i++){
    largest = largest + barChart.data[0][i];
    }
    //then we compare the data to each other finding the very largest graph size.
    //This is our largest
    for (let i = 0; i < barChart.data.length; i++){
      let compareTo = 0;
      for (let j = 1; j < barChart.data[i].length; j++){
        compareTo =  compareTo + barChart.data[i][j];
      }
      if (compareTo > largest){
        largest = compareTo;
      }
    }
    //find the ratio between the largest number and the total height of the graph as picked by the user
    let ratio = barChart.height/largest; 
    //have the ratio just be 2 decimal places
    ratio = ratio.toFixed(2);

  $(document).ready(function($){
    // add the title to the graph
    if (barChart.titleShow === 1){
      $(barChart.id).append('<div class ="graphTitle" style="color:#' + barChart.titleFontColor + '; font-family:'+ barChart.titleFont + '">'+ barChart.title + '</div>');
    }
    //add a canvas to hold all the bar graph info.
    $(barChart.id).append('<div class="barGraphCanvas"></div>');
    //find the total number of ticks based on what the user wants the space between them in units to be and add one for the top.
    let ticks = Math.floor(largest/barChart.tickNum) + 1;
    //find the spacing between each tick
    let spacing = Math.floor((barChart.tickNum*ratio) - 12); 
    //add where the ticks and the measurements will go.
    $(barChart.id).children(".barGraphCanvas").append('<div class="yAxisVal"></div><div class="yAxis"></div></div><div class="barGraphGrid"></div>');
    //make a variable to hold the width of the vales. This comes after the first and widest value is placed.
    let width = 0;
    //Loop through the total number of ticks and put them in.
      for (let i = ticks; i > 0; i--){
        //Get the first value of the ticks
        if (i === ticks){
          $(barChart.id).children(".barGraphCanvas").children(".yAxisVal").append('<div class="tickbox" style="margin-bottom: '+ spacing +'px;"><span style="font-family:'+ barChart.titleFont + '">' + barChart.tickNum * i + ' ' +barChart.dataUnit + '</span></div>');
          $(barChart.id).children(".barGraphCanvas").children(".yAxis").append('<div class="tickbox" style="margin-bottom: '+ spacing +'px;"><div class="tick"></div></div>');
          //this is wehere we find the width of the value
          let tickValWidth = document.querySelector(barChart.id);
          tickValWidth = tickValWidth.querySelector(".yAxisVal");
          tickValWidth = tickValWidth.querySelector(".tickbox");
          tickValWidth = tickValWidth.querySelector("span");
          width = tickValWidth.offsetWidth;
          //now we change the width so we can justify the text to the right of the div
          $(tickValWidth).css("width", width); 
          //widen the holder of the tickbox values as well for clarity
          $(barChart.id).children(".barGraphCanvas").children(".yAxisVal").css("width", width);
          //once past the first value
        } else {
          //place the values in each box along with the corresponding tick
          $(barChart.id).children(".barGraphCanvas").children(".yAxisVal").append('<div class="tickbox" style="margin-bottom: '+ spacing +'px;"><span style="font-family:'+ barChart.titleFont + '; width:'+ width +'px">' + barChart.tickNum * i + ' ' +barChart.dataUnit + '</span></div>');
          $(barChart.id).children(".barGraphCanvas").children(".yAxis").append('<div class="tickbox" style="margin-bottom: '+ spacing +'px;"><div class="tick"></div></div>');
        
        }
      }
      //this adds the bottom div where we will line up the bar chart labels.
      $(barChart.id).append('<div class="xAxisVal" style="margin-left: ' + (width +6) + 'px"></div>');  
      //now we loop through all the data to construct our graphs
      for (let i = 0; i < barChart.data.length; i++){
        // put in the names of x-axis values
        $(barChart.id).children(".xAxisVal").append('<div class="xValueBar" style="margin:0px '+ barChart.barSpacing/2 + 'px">' + barChart.data[i][0] + '</div>');
        //bar HeightData the actual bar height.
        let barHeightData=0;
        //barHeight is the height we want to display based on the height of the graph chosen by the user.
        let barHeight=0;
        //calculate the actual bar height this needs to be changed
        for (let j = 1; j < barChart.data[i].length; j++){
          barHeightData = barHeightData + barChart.data[i][j];
          console.log(barHeightData + "_" + j);
        }

        console.log(barHeightData);
        //get the final barHeight
        barHeight = Math.round(barHeightData * ratio);
        console.log(barHeight);

        //add each bar to the graph.
        $(barChart.id).children(".barGraphCanvas").children(".barGraphGrid").append('<div class="barGraphContainer" style="height: ' + barHeight + 'px; align-items: '+ barChart.barUnitPlacement + '; margin:0px '+ barChart.barSpacing/2 + 'px ; background-color:#ddd"></div>' );
      }
      let barStack = 0;
      $(barChart.id).children(".barGraphCanvas").children(".barGraphGrid").children(".barGraphContainer").each(function( index ) {
        for (let j = barChart.data[index].length -1; j >= 1; j--){
          barStack = Math.floor(barChart.data[index][j] * ratio);
          console.log(barStack + "BS");
          $( this ).append('<div class="barGraphBar" style="height: ' + barStack + 'px; background-color: #'+ barChart.barColor[j-1] +';"><span style="color: '+ barChart.barLabelColor +';   align-self:' + barChart.barUnitPlacement + '">' + barChart.data[index][j] + ' ' + barChart.dataUnit + '</span></div>' );
        }
      });
  });

}

const barChart1Data = {
  data:[["Makkah Royal Clock Tower", 601],["Burj Khalifa", 828],["Shanghai Tower", 632],["Ping An Finance Center", 599],["Lotte World Tower",555.7],["One World Trade Center", 541.3],["Guangzhuo CTF Finance Center", 530], ["Tianjin CTF Finance Center", 530],["CITIC Tower", 528],["Taipei 101", 508]],//[x axis labels, y axis values] 
  dataUnit: "Meters",
}


const barChart1Options = {
  type: "simple", // can be "simple" or "stacked"
  height: 300,// the height of the graph
  title: "10 Tallest Buildings", //name between quotes
  titleShow: 1, //1 for true 0 for false;
  titleFont:"arial", //must install webfonts in the header to use others
  titleFontColor: "AA0606", //hex value
  barColor: ["AA0606"], //hex value for stacked charts seperate colors with commas
  barLabelColor: "yellow", //hexvalue
  barSpacing: 6,//spaces between bars - bar width will change dynamically based on this value.
  barUnitPlacement: "end", //options are 'start', 'center' or 'end'
  axis: "vert", //'vert' means the labels are on the bottom "horiz" means they are on the side
  tickNum:50, //this approx number between each tick
}
let element1 = "#barChart1";

drawBarChart(barChart1Data, barChart1Options, element1);

const barChart2Data = {
  data:[["bar1" , 2 , 3 , 4], ["bar2", 1, 7, 8]], //[x axis labels, y axis values] or [[x axis labels, y axis values],[x axis labels, y axis values]] 
  dataUnit: "Meters",
}


const barChart2Options = {
  type: "simple", // can be "simple" or "stacked"
  height: 160,// the height of the graph
  title: "10 Tallest Buildings", //name between quotes
  titleShow: 1, //1 for true 0 for false;
  titleFont:"arial", //must install webfonts in the header to use others
  titleFontColor: "AA0606", //hex value
  barColor:[["AA0606"],["057796"],["248a19"]], //hex value for stacked charts seperate colors with commas
  barLabelColor: "yellow", //hexvalue
  barSpacing: 6,//spaces between bars - bar width will change dynamically based on this value.
  barUnitPlacement: "start", //options are 'start', 'center' or 'end'
  axis: "vert", //'vert' means the labels are on the bottom "horiz" means they are on the side
  tickNum:2, //this approx number between each tick
}
let element2 = "#barChart2";

drawBarChart(barChart2Data, barChart2Options, element2);
