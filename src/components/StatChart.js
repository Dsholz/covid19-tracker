import React, { useEffect, useLayoutEffect, useRef} from 'react'
import { getCovidHistoricalData } from '../Api'
import { formatHistorialData } from '../utils'
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
import am4themes_animated from "@amcharts/amcharts4/themes/animated"

am4core.useTheme(am4themes_animated)

function StatChart(props) {

  const statChartRef = useRef(null)
  const { setCurrentStatData, currentStatData } = props

  useLayoutEffect(() => {
    let statChart = am4core.create("stat-chart", am4charts.XYChart)

    statChart.data = currentStatData

    // Date Axes ( X-Axes )
    let categoryAxes = statChart.xAxes.push(new am4charts.CategoryAxis())
    categoryAxes.dataFields.category = 'date'

    // Amount Axes ( Y-Axes )
    let valueAxes = statChart.yAxes.push(new am4charts.ValueAxis())
    valueAxes.dataFields.category = 'cases'
    valueAxes.cursorTooltipEnabled = false;

    // Covid Cases Series
    let casesSeries = statChart.series.push(new am4charts.LineSeries())
    casesSeries.name = "Cases"
    casesSeries.tooltipText = 'Cases: {valueY}'
    casesSeries.dataFields.valueY = "cases"
    casesSeries.dataFields.categoryX = "date"

    // Covid Recovered Series 
    let recoveredSeries = statChart.series.push(new am4charts.LineSeries())
    recoveredSeries.name = "Recovered"
    recoveredSeries.tooltipText = 'Recovered: {valueY}'
    recoveredSeries.dataFields.valueY = "recovered"
    recoveredSeries.dataFields.categoryX = "date"

    // Covid Deaths Series
    let deathsSeries = statChart.series.push(new am4charts.LineSeries())
    deathsSeries.name = "Deaths"
    deathsSeries.tooltipText = 'Deaths: {valueY}'
    deathsSeries.dataFields.valueY = "deaths"
    deathsSeries.dataFields.categoryX = "date"


    statChart.legend = new am4charts.Legend()
    statChart.cursor = new am4charts.XYCursor()
    statChart.cursor.lineY.disabled = true 

    statChartRef.current = statChart

    return () => {
      statChart.dispose();
    };
  }, [currentStatData]);

    useEffect(() => {
        getCovidHistoricalData()
        .then(data => {
          const formattedData = formatHistorialData(data)

          setCurrentStatData(formattedData)
        })
    }, [])

    return (
        <div id="stat-chart" className='stat-chart'></div>
      );
}

export default StatChart
