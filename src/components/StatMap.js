import React, { Fragment, useLayoutEffect, useRef } from 'react'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh"
import am4geodata_usaLow from "@amcharts/amcharts4-geodata/usaHigh"
import { useEffect } from 'react';

function StatMap() {
    const statMapRef = useRef(null)

    useLayoutEffect(() => {
        let statMap = am4core.create("stat-map", am4maps.MapChart);

        statMap.geodata = am4geodata_worldHigh;

        statMap.projection = new am4maps.projections.Miller()

        let polygonSeries = statMap.series.push(new am4maps.MapPolygonSeries())
        polygonSeries.useGeodata = true;
        polygonSeries.exclude = ['AQ']

        polygonSeries.data = [{
            id: "US",
            name: "United States",
            value: 100
          }, {
            id: "FR",
            name: "France",
            value: 50
          }]

        statMap.series.push(polygonSeries);

        let polygonTemplate = polygonSeries.mapPolygons.template
        polygonTemplate.tooltipText = '{name} : {value}'


        let countryCircleSeries = statMap.series.push(new am4maps.MapImageSeries())

        countryCircleSeries.data = [{
            "latitude": 48.856614,
            "longitude": 2.352222,
            "title": "Paris"
          }, {
            "latitude": 40.712775,
            "longitude": -74.005973,
            "title": "New York"
          }, {
            "latitude": 49.282729,
            "longitude": -123.120738,
            "title": "Vancouver"
          }];
        
        let imageSeriesTemplate = countryCircleSeries.mapImages.template
        let circle = imageSeriesTemplate.createChild(am4core.Circle)
        circle.radius = 6
        circle.fill = am4core.color("#B27799")
        circle.stroke = am4core.color("#FFFFFF")
        circle.strokeWidth = 2
        circle.nonScaling = true
        circle.tooltipText = "{title} \n Latitude : {latitude} \n Longitude : {longitude}"

        imageSeriesTemplate.propertyFields.latitude = "latitude"
        imageSeriesTemplate.propertyFields.longitude = "longitude"

        statMapRef.current = statMap

        return () => {
            statMap.dispose()
        }
    }, [])
    return (
        <Fragment>
            <div id="stat-map" className='stat-map'></div>
        </Fragment>
    )
}

export default StatMap
