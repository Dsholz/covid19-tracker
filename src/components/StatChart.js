import React, { useEffect, useLayoutEffect, useRef } from "react";
import { getCovidHistoricalData } from "../Api";
import { formatHistorialData } from "../utils";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

function StatChart(props) {
  const statChartRef = useRef(null);
  const { setCurrentStatData, currentStatData } = props;

  useLayoutEffect(() => {
    let statChart = am4core.create("stat-chart", am4charts.XYChart);

    statChart.data = currentStatData;
    statChart.dateFormatter.inputDateFormat = "M/d/yyyy";

    // Date Axes ( X-Axes )
    let categoryAxes = statChart.xAxes.push(new am4charts.DateAxis());
    categoryAxes.dataFields.category = "date";

    // Amount Axes ( Y-Axes )
    let valueAxes = statChart.yAxes.push(new am4charts.ValueAxis());
    valueAxes.dataFields.category = "cases";
    valueAxes.cursorTooltipEnabled = false;

    // Covid Cases Series
    let casesSeries = statChart.series.push(new am4charts.LineSeries());
    casesSeries.name = "Cases";
    casesSeries.stroke = am4core.color("#EAE600");
    casesSeries.tooltipText = "Cases: {valueY}";
    casesSeries.tooltip.getFillFromObject = false;
    casesSeries.tooltip.background.fill = am4core.color("#EAE600");
    casesSeries.tooltip.background.fillOpacity = 0.7;
    casesSeries.dataFields.valueY = "cases";
    casesSeries.dataFields.dateX = "date";

    // Covid Recovered Series
    let recoveredSeries = statChart.series.push(new am4charts.LineSeries());
    recoveredSeries.name = "Recovered";
    recoveredSeries.stroke = am4core.color("#0BD454");
    recoveredSeries.tooltipText = "Recovered: {valueY}";
    recoveredSeries.tooltip.getFillFromObject = false;
    recoveredSeries.tooltip.background.fill = am4core.color("#0BD454");
    recoveredSeries.tooltip.background.fillOpacity = 0.5;
    recoveredSeries.dataFields.valueY = "recovered";
    recoveredSeries.dataFields.dateX = "date";

    // Covid Deaths Series
    let deathsSeries = statChart.series.push(new am4charts.LineSeries());
    deathsSeries.name = "Deaths";
    deathsSeries.stroke = am4core.color("#ff0000");
    deathsSeries.tooltipText = "Deaths: {valueY}";
    deathsSeries.tooltip.getFillFromObject = false;
    deathsSeries.tooltip.background.fill = am4core.color("#ff0000");
    deathsSeries.tooltip.background.fillOpacity = 0.5;
    deathsSeries.dataFields.valueY = "deaths";
    deathsSeries.dataFields.dateX = "date";

    statChart.legend = new am4charts.Legend();
    statChart.cursor = new am4charts.XYCursor();
    statChart.cursor.lineY.disabled = true;

    statChartRef.current = statChart;

    return () => {
      statChart.dispose();
    };
  });

  useEffect(() => {
    getCovidHistoricalData().then((data) => {
      const formattedData = formatHistorialData(data);

      setCurrentStatData(formattedData);
    });
  }, [setCurrentStatData]);

  return <div id="Chart" className="stat-chart"></div>;
}

export default StatChart;
