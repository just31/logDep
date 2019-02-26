import { Component, OnInit } from '@angular/core';

declare let L;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  inputs: ['number'],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {

  }

  map: any;
  dropIcon: any;
  count: number = null;

  ngOnInit() {

    this.map = L.map("map");
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.map);

    /*L.vectorGrid.protobuf("https://free-{s}.tilehosting.com/data/v3/{z}/{x}/{y}.pbf.pict?key={key}", {
      //rendererFactory: L.canvas.tile,
      vectorTileLayerStyles: {
        water: {
          fill: true,
          weight: 1,
          fillColor: '#06cccc',
          color: '#06cccc',
          fillOpacity: 0.2,
          opacity: 0.4,
        },
        admin: {
          weight: 1,
          fillColor: 'pink',
          color: 'pink',
          fillOpacity: 0.2,
          opacity: 0.4
        },
        waterway: {
          weight: 1,
          fillColor: '#2375e0',
          color: '#2375e0',
          fillOpacity: 0.2,
          opacity: 0.4
        },
        landcover: {
          fill: true,
          weight: 1,
          fillColor: '#53e033',
          color: '#53e033',
          fillOpacity: 0.2,
          opacity: 0.4,
        },
        landuse: {
          fill: true,
          weight: 1,
          fillColor: '#e5b404',
          color: '#e5b404',
          fillOpacity: 0.2,
          opacity: 0.4
        },
        park: {
          fill: true,
          weight: 1,
          fillColor: '#84ea5b',
          color: '#84ea5b',
          fillOpacity: 0.2,
          opacity: 0.4
        },
        boundary: {
          weight: 1,
          fillColor: '#c545d3',
          color: '#c545d3',
          fillOpacity: 0.2,
          opacity: 0.4
        },
        aeroway: {
          weight: 1,
          fillColor: '#51aeb5',
          color: '#51aeb5',
          fillOpacity: 0.2,
          opacity: 0.4
        },
        road: {
          weight: 1,
          fillColor: '#f2b648',
          color: '#f2b648',
          fillOpacity: 0.2,
          opacity: 0.4
        },
        tunnel: {
          weight: 0.5,
          fillColor: '#f2b648',
          color: '#f2b648',
          fillOpacity: 0.2,
          opacity: 0.4,
        },
        bridge: {
          weight: 0.5,
          fillColor: '#f2b648',
          color: '#f2b648',
          fillOpacity: 0.2,
          opacity: 0.4,
        },
        transportation: {
          weight: 0.5,
          fillColor: '#f2b648',
          color: '#f2b648',
          fillOpacity: 0.2,
          opacity: 0.4,
        },
        transit: {
          weight: 0.5,
          fillColor: '#f2b648',
          color: '#f2b648',
          fillOpacity: 0.2,
          opacity: 0.4,
        },
        building: {
          fill: true,
          weight: 1,
          fillColor: '#2b2b2b',
          color: '#2b2b2b',
          fillOpacity: 0.2,
          opacity: 0.4
        },
        water_name: {
          weight: 1,
          fillColor: '#022c5b',
          color: '#022c5b',
          fillOpacity: 0.2,
          opacity: 0.4
        },
        transportation_name: {
          weight: 1,
          fillColor: '#bc6b38',
          color: '#bc6b38',
          fillOpacity: 0.2,
          opacity: 0.4
        },
        place: {
          weight: 1,
          fillColor: '#f20e93',
          color: '#f20e93',
          fillOpacity: 0.2,
          opacity: 0.4
        },
        housenumber: {
          weight: 1,
          fillColor: '#ef4c8b',
          color: '#ef4c8b',
          fillOpacity: 0.2,
          opacity: 0.4
        },
        poi: {
          weight: 1,
          fillColor: '#3bb50a',
          color: '#3bb50a',
          fillOpacity: 0.2,
          opacity: 0.4
        },
        earth: {
          fill: true,
          weight: 1,
          fillColor: '#c0c0c0',
          color: '#c0c0c0',
          fillOpacity: 0.2,
          opacity: 0.4
        }
      },
      subdomains: "0123",
      key: 'BuNi4FPIgsaSVnVlaLoQ',
      maxNativeZoom: 8
    }).addTo(this.map);*/

    this.map.setView([48.85, 2.35], 11);

    this.dropIcon = L.icon({
      iconUrl: '../assets/images/drop.svg',
      iconSize: [40, 40], //
    });

    //console.log(this.map.getBounds().getSouthWest().lat);
    //console.log(this.map.getBounds().getNorthEast().lng);
  }

  private getRandomLatLng(): any {
    return [
      48.8 + 0.1 * Math.random(),
      2.25 + 0.2 * Math.random()
    ];
  }

  private randBackgroundMarker(): any {
    let elems = document.querySelectorAll('img');
    let chars = '0123456789ABCDEF'.split('');

    let randomColor = function () {
      let color = '#';
      for (let i = 0; i < 6; i++)
        color += chars[Math.floor(Math.random() * 16)];
      return color;
    };

    setTimeout(function () {
      for (var i = 0; i < elems.length; i++) {
        elems[i].style.background = randomColor();
      }
    }, 1500);
  }

  addMarkers(ev): void {

    let _self = this;

    let fg = L.featureGroup().addTo(this.map);

    for (let i = 0; i < _self.count; i += 1) {
      L.marker(this.getRandomLatLng(), {icon: this.dropIcon}).addTo(fg).bindPopup("<b>Hello world!</b><br>I am a popup.");
    }

    // Fit all markers after 1 second.
    setTimeout(function () {
      _self.map.fitBounds(fg.getBounds()); // Получаем границы добавленной на карту, группы маркеров 'fg.getBounds()' и масштабируем карту под них методом - fitBounds.
    }, 1000);

    this.randBackgroundMarker();

  }


}
