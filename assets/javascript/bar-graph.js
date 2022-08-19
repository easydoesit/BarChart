let drawBarChart = function (data, options, element) {
  // create an local scope object that has all the info we need from Data, options,element.
  const barChart = {
    id: element,
    width: options.width,
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
  console.log(largest);

  //find the ratio between the largest number and the total height of the graph as picked by the user
  //vertical graph
  let ratio = 0;
  if (barChart.axis === 'vert'){
    if (barChart.title === 1){
      ratio = (barChart.height - 59)/largest ; 
    } else {
      ratio = (barChart.height - 36)/largest ; 
    }
    //have the ratio just be 2 decimal places
    ratio = ratio.toFixed(2);
  }
  //console.log(ratio + "- ratio");

  $(document).ready(function($){
    $(barChart.id).css({ 'margin' : '50px'});
    $(barChart.id).css({'display' : 'inline-block' });
    console.log(barChart.id);
      if (barChart.axis === 'vert'){
        $(barChart.id).append('<div class = "barChartContainerVert" style="height:' + barChart.height + 'px; width:' + barChart.width + 'px;"></div>');
      // add the title to the graph
        if (barChart.titleShow === 1){
          $(barChart.id).children('.barChartContainerVert').append('<div class ="barChartTitle" style="color:#' + barChart.titleFontColor + '; font-family:'+ barChart.titleFont + ';">'+ barChart.title + '</div>');
        }
    
        //add in the container to hold all the graph info. It fits the remainder of the chart minus the buttom row. 59 is how much  height all the other items that aren't the graph take up.
        let graphHeight = (barChart.height - 59);
        console.log(graphHeight + " -  graph Height");
        $(barChart.id).children('.barChartContainerVert').append('<div class="graphContainer" style="height:' + graphHeight + 'px; width:' + barChart.width + 'px;"></div>');
    
        //add where the ticks and the measurements will go.
        
        $(barChart.id).children(".barChartContainerVert").children(".graphContainer").append('<div class = "yAxisValueContainerVert" style="margin-top:0px;"></div>');
        $(barChart.id).children(".barChartContainerVert").children(".graphContainer").append('<div class = "yAxisTicksContainerVert" style="width:6px; height: 100%; margin-top:0px;"></div>');
        $(barChart.id).children(".barChartContainerVert").children(".graphContainer").append('<div class = "barGraphVert"></div>');
        
        //make a variable to hold the width of the values. This comes after the first and widest value is placed.
        let YAxisWidth = 0;

        //find the total number of ticks based on what the user wants the space between them in units to be and add one for the top.
        let ticks = Math.floor(largest/barChart.tickNum);
        console.log(ticks + " ticks");
        //find the spacing between each tick 12 is the height of the label and tick
        let spacing = Math.floor((barChart.tickNum*ratio) - 12);
        console.log(spacing + "- Spacing ")
        let topMargin = graphHeight - ((spacing + 12) * ticks);
        //Loop through the total number of ticks and put them in.
        for (let i = ticks; i > 0; i--){
          //Get the first value of the ticks
          if (i === ticks){
            $(barChart.id).children(".barChartContainerVert").children(".graphContainer").children(".yAxisValueContainerVert").append('<div class="yAxisValue" style="font-family:'+ barChart.titleFont +'; margin-bottom: ' + spacing + 'px; margin-top:' + topMargin + 'px;"><span>'+ barChart.tickNum * i +  ' ' + barChart.dataUnit +'</span></div>');
            $(barChart.id).children(".barChartContainerVert").children(".graphContainer").children(".yAxisTicksContainerVert").append('<div class= "tickBoxVert" style="margin-bottom:' + spacing + 'px; margin-top:' + topMargin + 'px;"><div class = "ticksVert"></div></div>');
            
            
            //this is wehere we find the width of the value
            let tickValWidth = document.querySelector(barChart.id).querySelector(".barChartContainerVert").querySelector(".graphContainer").querySelector(".yAxisValueContainerVert").querySelector(".yAxisValue").querySelector("span");
            YAxisWidth = tickValWidth.offsetWidth;
            console.log(YAxisWidth + " - Yaxis Width");
            //now we change the width so we can justify the text to the right of the div
            $(tickValWidth).css("width", YAxisWidth); 
            
            //widen the holder of the tickbox values as well for clarity
            $(barChart.id).children(".barChartContainerVert").children(".graphContainer").children(".yAxisValueContainerVert").children(".yAxisValue").css("width", YAxisWidth);
            //once past the first value
          } else {
            //place the values in each box along with the corresponding tick
            $(barChart.id).children(".barChartContainerVert").children(".graphContainer").children(".yAxisValueContainerVert").append('<div class="yAxisValue" style="width: ' + YAxisWidth +'px;font-family:'+ barChart.titleFont +'; margin-bottom: ' + spacing + 'px;"><span>'+ barChart.tickNum * i +  ' ' + barChart.dataUnit +'</span></div>');
            $(barChart.id).children(".barChartContainerVert").children(".graphContainer").children(".yAxisTicksContainerVert").append('<div class="tickBoxVert" style="margin-bottom:' + spacing + 'px; margin-top:4px;"><div class = "ticksVert"></div></div>');
          }
        }
        //get the width of the bargraphVert
        graphWidth = barChart.width - YAxisWidth;
        $(barChart.id).children(".barChartContainerVert").children(".graphContainer").children(".barGraphVert").css({"width":graphWidth})
   
        //add a border line to the bottom of the graph
        $(barChart.id).children(".barChartContainerVert").append('<div class="bottomBorder" style="width:'+ (graphWidth - 6) +'p; margin-left:' + (YAxisWidth + 6) +'px"></div>')
        //this is where our x - axis values will go
        $(barChart.id).children(".barChartContainerVert").append('<div class="xAxisValueContainerVert" style="width:'+ (graphWidth - 8) +'px; margin-left:' + (YAxisWidth + 8) + 'px"></div>');
      
        //now we loop through all the data to construct our graphs
        for (let i = 0; i < barChart.data.length; i++){
      
        //bar HeightData the actual bar height.
        let barHeightData=0;
        //barHeight is the height we want to display based on the height of the graph chosen by the user.
        let barHeight=0;
        //calculate the actual bar height this needs to be changed
        for (let j = 1; j < barChart.data[i].length; j++){
          barHeightData = barHeightData + barChart.data[i][j];
          console.log(barHeightData + "- BarheightData" + j);
        }

        console.log(barHeightData);
        //get the final barHeight
        barHeight = Math.floor((barHeightData/largest * graphHeight));
        console.log(barHeight + "- BarHeight Calculated");
        let barSpacing = barChart.barSpacing/2;
        //add each bar container to the graph.
        $(barChart.id).children(".barChartContainerVert").children(".graphContainer").children(".barGraphVert").append('<div class ="barContainerVert" style="height: ' + barHeight + 'px; margin: 0px '+ barSpacing +'px 0px '+ barSpacing +'px;"></div>');
        //and the labels on the x-axis
        $(barChart.id).children(".barChartContainerVert").children(".xAxisValueContainerVert").append('<div class="xValueVert" style="font-family:' + barChart.titleFont + '; margin: 0px ' + barSpacing +'px;">' + barChart.data[i][0] + '</div>')        
      }
      
      //add each barstack to the bar container
      let barStack = 0;
      $(barChart.id).children(".barChartContainerVert").children(".graphContainer").children(".barGraphVert").children(".barContainerVert").each(function( index ) {
        let vertPlacement = "middle"
        if(barChart.barUnitPlacement === "start"){
          vertPlacement ="top";
        }
        if (barChart.barUnitPlacement === "end") {
          vertPlacement = "bottom";
        }
        let barStackMargin = 0;
        for (let j = barChart.data[index].length -1; j >= 1; j--){
          barStack = Math.floor((barChart.data[index][j]/largest * graphHeight));
          console.log(barStack + "BS size");
          $(this).append('<div class="barStackVert" valign="bottom" style="margin-bottom:'+ barStackMargin +'px; height: ' + barStack + 'px; line-height: ' + barStack + 'px; background-color:#' + barChart.barColor[j-1] + '; font-family: '+ barChart.titleFont +';"><span style="color: '+ barChart.barLabelColor +'; vertical-align: ' + vertPlacement + ';">' + barChart.data[index][j] + ' ' + barChart.dataUnit + '</span></div>');
          barStackMargin = barStackMargin + barStack;
        }
      });
    }

    if (barChart.axis === 'horiz'){
      $(barChart.id).append('<div class = "barChartContainerHor" style="height:' + barChart.height + 'px; width:' + barChart.width + 'px;"></div>');

      // add the title to the graph
      if (barChart.titleShow === 1){
        $(barChart.id).children('.barChartContainerHor').append('<div class ="barChartTitle" style="color:#' + barChart.titleFontColor + '; font-family:'+ barChart.titleFont + ';">'+ barChart.title + '</div>');
      }
      //add in the container to hold all the graph info. It fits the remainder of the chart minus the buttom row. 59 is how much  height all the other items that aren't the graph take up.
      let graphHeight = 0;
      if (barChart.title === 1){
        graphHeight = (barChart.height - 59); 
      } else {
        graphHeight = (barChart.height - 36); 
      }
      
      console.log(graphHeight + " -  graph Height");
      
      
      $(barChart.id).children('.barChartContainerHor').append('<div class="graphContainer" style="height:' + graphHeight + 'px; width:' + barChart.width + 'px;"></div>');

      //add where the values will go.
      let YAxisWidth = 80;
      $(barChart.id).children(".barChartContainerHor").children(".graphContainer").append('<div class = "yAxisValueContainerHor" style="margin-top:0px; height:'+ graphHeight +'px"></div>');
      $(barChart.id).children(".barChartContainerHor").children(".graphContainer").append('<div class = "barGraphHor" style="width:' + (barChart.width-YAxisWidth) +'px"></div>');
      
      //make a variable to hold the width of the values. This comes after the first and widest value is placed.
      let valueHeight = Math.floor(graphHeight/barChart.data.length);
      console.log(valueHeight + " - Value Height")
      for (let i = 0; i < barChart.data.length; i++){
        $(barChart.id).children(".barChartContainerHor").children(".graphContainer").children(".yAxisValueContainerHor").append('<div class = "yAxisValueHor" style="font-family:' + barChart.titleFont + '; height: ' + valueHeight + 'px; line-height: ' + valueHeight + 'px; "><span style="width:' + YAxisWidth + 'px">' + barChart.data[i][0] + '</span></div>');
      }
      console.log(YAxisWidth + " - Yaxis Width");


    }

  });
}




      /*
      
       else if (barChart.axis = 'horiz'){
  ratio = (barChart.width - 100) /largest; 
  }
      
      
      else if (barChart.axis === 'horiz'){
        let height = barChart.height/barChart.data.length;
        $(barChart.id).children(".barGraphCanvas").children(".yAxisVal").append('<div class="valuebox" style="height:'+ height +'px; margin: '+ barChart.barSpacing/2 + 'px 0px">' + barChart.data[i][0] + '</div>');
        let makeYAxisValue = $(barChart.id).children(".barGraphCanvas").children(".yAxisVal");
        makeYAxisValue.css({"flex-dirction": "column"});
        makeYAxisValue.css({"align-items": "flex-end"})
        $(barChart.id).children(".barGraphCanvas").children(".barGraphGrid").append('<div class="barGraphContainer" style="width: ' + barHeight + 'px; height: '+ height+'px; background-color:#ddd; margin:'+ barChart.barSpacing/2 + 'px 0px"></div>' ); 
        let makeColumn = $(barChart.id).children(".barGraphCanvas").children(".barGraphGrid");
        makeColumn.css({"flex-direction": "column"});
        makeColumn.css({"align-items": "flex-start"});


        else if (barChart.axis === 'horiz') {
              let horizPlace = "center";
              if (barChart.barUnitPlacement === "start"){
                horizPlace = "left";
              }
              if (barChart.barUnitPlacement === "end"){
                horizPlace = "right";
              }        
              $( this ).append('<div class="barGraphBar" style="align-self:start; height: 100%; width:'+ barStack +'px; background-color: #'+ barChart.barColor[j-1] +';"><span width="100%" style="color: '+ barChart.barLabelColor +';   align-self:center; text-align:'+horizPlace +'; width:'+ barStack +'px">' + barChart.data[index][j] + ' ' + barChart.dataUnit + '</span></div>' );
            }

      }





    if (barChart.axis === 'horiz'){
      $(barChart.id).append('<div class = "barChartContainerHor" style="height:' + barChart.height + 'px; width:' + barChart.width + 'px; background-color:#"></div>');
      $(barChart.id).children('.barChartContainerHor').append('<div class="GraphContainer" style="height:' + barChart.height + 'px; width:' + barChart.width + 'px;"></div>');
    // add the title to the graph
      if (barChart.titleShow === 1){
        $(barChart.id).children('.barChartContainerHor').append('<div class ="barChartTitle" style="color:#' + barChart.titleFontColor + '; font-family:'+ barChart.titleFont + ';">'+ barChart.title + '</div>');
      }

      //add in the container to hold all the graph info. It fits the remainder of the chart. Minsu the bottom row.
      let graphHeight = barChart.height - 63;
      $(barChart.id).children('.barChartContainerHor').append('<div class="GraphContainer" style="height:' + graphHeight + 'px; width:' + barChart.width + 'px;"></div>');
  }*/

const barChart1Data = {
  data:[["Makkah Royal Clock Tower", 601],["Burj Khalifa", 828],["Shanghai Tower", 632],["Ping An Finance Center", 599],["Lotte World Tower",555.7],["One World Trade Center", 541.3],["Guangzhuo CTF Finance Center", 530], ["Tianjin CTF Finance Center", 530],["CITIC Tower", 528],["Taipei 101", 508]],//[x axis labels, y axis values] 
  dataUnit: "Meters",
}


const barChart1Options = {
  width: 800, // the width of the graph
  height: 600,// the height of the graph
  title: "10 Tallest Buildings", //name between quotes
  titleShow: 0, //1 for true 0 for false;
  titleFont:"arial", //must install webfonts in the header to use others
  titleFontColor: "AA0606", //hex value
  barColor: ["AA0606"], //hex value for stacked charts seperate colors with commas
  barLabelColor: "yellow", //hexvalue
  barSpacing: 6,//spaces between bars - bar width will change dynamically based on this value.
  barUnitPlacement: "start", //options are 'start', 'center' or 'end'
  axis: "vert", //'vert' means the labels are on the bottom "horiz" means they are on the side
  tickNum:100, //this approx number between each tick
}
let element1 = "#barChart1";

drawBarChart(barChart1Data, barChart1Options, element1);

const barChart2Data = {
  data:[["bar1" , 2 , 3 , 4], ["bar2", 1, 7, 8]], //[x axis labels, y axis values] or [[x axis labels, y axis values],[x axis labels, y axis values]] 
  dataUnit: "Meters",
}

const barChart2Options = {
  width: 300, // the width of the graph
  height: 600,// the height of the graph
  title: "2 Bars Stacked", //name between quotes
  titleShow: 1, //1 for true 0 for false;
  titleFont:"arial", //must install webfonts in the header to use others
  titleFontColor: "AA0606", //hex value
  barColor:[["AA0606"],["057796"],["248a19"]], //hex value for stacked charts seperate colors with commas
  barLabelColor: "yellow", //hexvalue
  barSpacing: 6,//spaces between bars - bar width will change dynamically based on this value.
  barUnitPlacement: "center", //options are 'start', 'center' or 'end'
  axis: "vert", //'vert' means the labels are on the bottom "horiz" means they are on the side
  tickNum:6, //this approx number between each tick
}
let element2 = "#barChart2";

drawBarChart(barChart2Data, barChart2Options, element2);

const barChart3Data = {
  data:[["Makkah Royal Clock Tower", 601],["Burj Khalifa", 828],["Shanghai Tower", 632],["Ping An Finance Center", 599],["Lotte World Tower",555.7],["One World Trade Center", 541.3],["Guangzhuo CTF Finance Center", 530], ["Tianjin CTF Finance Center", 530],["CITIC Tower", 528],["Taipei 101", 508]],//[x axis labels, y axis values] 
  dataUnit: "Meters",
}

const barChart3Options = {
  width: 828, // the width of the graph
  height: 828,// the height of the graph
  title: "10 Tallest Buildings Horiz", //name between quotes
  titleShow: 1, //1 for true 0 for false;
  titleFont:"arial", //must install webfonts in the header to use others
  titleFontColor: "AA0606", //hex value
  barColor: ["AA0606"], //hex value for stacked charts seperate colors with commas
  barLabelColor: "yellow", //hexvalue
  barSpacing: 6,//spaces between bars - bar width will change dynamically based on this value.
  barUnitPlacement: "start", //options are 'start', 'center' or 'end'
  axis: "horiz", //'vert' means the labels are on the bottom "horiz" means they are on the side
  tickNum:100, //this approx number between each tick
}
let element3 = "#barChart3";

drawBarChart(barChart3Data, barChart3Options, element3);

const barChart4Data = {
  data:[["bar1" , 2 , 3 , 4], ["bar2", 1, 7, 8]], //[x axis labels, y axis values] or [[x axis labels, y axis values],[x axis labels, y axis values]] 
  dataUnit: "Meters",
}

const barChart4Options = {
  width: 500, // the width of the graph
  height: 500,// the height of the graph
  title: "2 fuken bar 2", //name between quotes
  titleShow: 1, //1 for true 0 for false;
  titleFont:"arial", //must install webfonts in the header to use others
  titleFontColor: "AA0606", //hex value
  barColor:[["AA0606"],["057796"],["248a19"]], //hex value for stacked charts seperate colors with commas
  barLabelColor: "yellow", //hexvalue
  barSpacing: 6,//spaces between bars - bar width will change dynamically based on this value.
  barUnitPlacement: "center", //options are 'start', 'center' or 'end'
  axis: "horiz", //'vert' means the labels are on the bottom "horiz" means they are on the side
  tickNum:2, //this approx number between each tick
}
let element4 = "#barChart4";

drawBarChart(barChart4Data, barChart4Options, element4);
