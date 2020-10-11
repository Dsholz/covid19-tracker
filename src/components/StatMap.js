import React, { useLayoutEffect, useRef } from 'react'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
//import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow"

function StatMap() {
    const statMapRef = useRef(null)

    useLayoutEffect(() => {
        let statMap = am4core.create("chartdiv", am4maps.MapChart);

        statMapRef.current = statMap

        return () => {
            statMap.dispose()
        }
    }, [])
    return (
        <div>
            
        </div>
    )
}

export default StatMap
