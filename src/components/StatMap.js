import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { getCovidCountriesData } from "../Api";

am4core.useTheme(am4themes_animated);

function StatMap(props) {
  const { dataReady } = props;
  const statMapRef = useRef(null);
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    getCovidCountriesData().then((data) => {
      const editedData = data.map((country) => ({
        title: country.country,
        latitude: country.countryInfo.lat,
        longitude: country.countryInfo.long,
        cases: country.cases,
        recovered: country.recovered,
        deaths: country.deaths,
        active: country.cases - (country.recovered + country.deaths),
      }));

      setCountryData(editedData);
    });
  }, []);

  useLayoutEffect(() => {
    if (dataReady && countryData.length !== 0) {
      let statMap = am4core.create("stat-map", am4maps.MapChart);

      statMap.geodata = am4geodata_worldLow;

      statMap.projection = new am4maps.projections.Miller();

      let polygonSeries = statMap.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.useGeodata = true;
      polygonSeries.exclude = ["AQ"];

      let polygonTemplate = polygonSeries.mapPolygons.template;

      // polygonTemplate.fill = chart.colors.getIndex(0);

      polygonTemplate.events.on("hit", function (ev) {
        ev.target.series.chart.zoomToMapObject(ev.target);
      });

      let hoveredCountry = polygonTemplate.states.create("hover");
      hoveredCountry.properties.fill = am4core.color("#adadad");

      let activeCountry = polygonTemplate.states.create("active");
      activeCountry.properties.fill = am4core.color("#adadad");

      polygonTemplate.events.on("hit", function (ev) {
        ev.target.isActive = !ev.target.isActive;
      });

      let imageSeries = statMap.series.push(new am4maps.MapImageSeries());
      imageSeries.data = countryData;
      imageSeries.dataFields.value = "cases";

      let imageTemplate = imageSeries.mapImages.template;
      imageTemplate.nonScaling = true;
      imageTemplate.propertyFields.latitude = "latitude";
      imageTemplate.propertyFields.longitude = "longitude";

      let circle = imageTemplate.createChild(am4core.Circle);
      circle.fillOpacity = 0.7;
      circle.fill = "#EBE40C";
      circle.tooltipText = "{title} : {value} \n cases";

      imageSeries.heatRules.push({
        target: circle,
        property: "radius",
        min: 4,
        max: 14,
        dataField: "value",
      });

      document.querySelectorAll(".countryInfo").forEach((country) => {
        country.addEventListener("click", () => {
          const countryId = country.childNodes[4].textContent;

          countryId &&
            statMap.zoomToMapObject(polygonSeries.getPolygonById(countryId));
        });
      });

      document
        .querySelector(".header__countries-list")
        .addEventListener("change", (e) => {
          const countryId = e.target.value;

          countryId &&
            statMap.zoomToMapObject(polygonSeries.getPolygonById(countryId));
        });

      statMap.series.push(polygonSeries);

      statMapRef.current = statMap;

      return () => {
        statMap.dispose();
      };
    }
  }, [dataReady, countryData]);
  return <div id="Map" className="stat-map"></div>;
}

export default StatMap;
