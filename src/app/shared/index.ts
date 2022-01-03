import {
ApexAxisChartSeries,
ApexChart,
ChartComponent,
ApexDataLabels,
ApexPlotOptions,
ApexYAxis,
ApexLegend,
ApexStroke,
ApexXAxis,
ApexFill,
ApexTooltip,
ApexAnnotations,
ApexGrid
  } from 'ng-apexcharts';
import * as moment from 'moment';


export type ChartOptions = {
series: ApexAxisChartSeries;
chart: ApexChart;
dataLabels: ApexDataLabels;
plotOptions: ApexPlotOptions;
yaxis: ApexYAxis[];
xaxis: ApexXAxis;
annotations: ApexAnnotations;
fill: ApexFill;
tooltip: ApexTooltip;
stroke: ApexStroke;
grid: ApexGrid;
legend: ApexLegend;
};


export function CsvSplitToObject(bufferString: String ,cellSeparator:string , ligneSeparator:string ){
	var arr = bufferString.split(ligneSeparator);
	var jsonObj = [];
	var headers = arr[0].split(cellSeparator);
	for(var i = 1; i < arr.length; i++) {
  	var data = arr[i].split(cellSeparator);
  	var obj = {};
  	for(var j = 0; j < data.length; j++) {
     obj[headers[j].trim()] = data[j].trim();
  }
  jsonObj.push(obj);
}
return jsonObj;
}

export function compareObjetFn(a, b) {
	if(a && b)
		return a.id === b.id;
	else if(a && !b)
		return false;
	else if(!a && b)
		return false;
	else
		return true;
}



export function toNgDatepickerModel(date) {
	if (!date) {
		return null;
	}

	date = moment(date).toDate();
	
	return  { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
}





export function momentFromNgDatepickerModel(date) {
	if (!date) {
		return null;
	}

	return moment({ y: date.year,   M: date.month - 1,   d: date.day});
}