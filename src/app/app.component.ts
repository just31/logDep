import { Component, OnInit } from '@angular/core';

// Объявляем Leaflet переменную, для того, чтобы можно было использовать Leaflet внутри компонента Angular.
declare let L;

// Декоратор для класса AppComponent. С объектом необходимых метаданных.
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  inputs: ['number'],
  styleUrls: ['./app.component.css']
})

// Создаем класс AppComponent.
export class AppComponent implements OnInit {

  constructor() {

  }

  // Создаем необходимые, для работы с картой, свойства класса.
  map: any;
  dropIcon: any;
  fg: any = null;
  count: number = null;

  // Метод инициализирующий компонент.
  ngOnInit() {

    // Создаем новую карту, используя функционал L.
    this.map = L.map("map");

    // Подгружаем тайлы для карты, с ресурса openstreetmap.org.
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.map);

    // Подгружаем векторные тайлы для карты, с ресурса cloud.maptiler.com. Используя ключ авторизации, для запросов. Настраиваем опции тайлов.
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

    // Указываем координаты центра карты.
    this.map.setView([48.85, 2.35], 11);

    // Создаем пользовательскую иконочку, для маркера. В качестве источника, указываем путь до svg-изображения.
    this.dropIcon = L.icon({
      iconUrl: '../assets/images/drop.svg',
      iconSize: [40, 40], //
    });

    //console.log(this.map.getBounds().toBBoxString());
  }

  // Метод создающий рандомные координаты маркеров. Метод приватный, т.к. используется только внутри данного класса.
  private getRandomLatLng(): any {
    return [
      this.map.getBounds().getSouthWest().lat + 0.38 * Math.random(),
      this.map.getBounds().getSouthWest().lng + 1.28 * Math.random()
    ];
  }

  // Метод создающий рандомные фоны, для маркеров. Метод приватный, т.к. используется только внутри данного класса.
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

  // Метод добавляющий маркеры на карту, после нажатия на кнопку "Заполнить".
  addMarkers(ev): void {

    let _self = this;

    // При каждом новом нажатии по кнопке, удаляем предыдущую группу маркеров с карты.
    (_self.fg !== null) ? _self.fg.remove() : false;

    _self.fg = L.featureGroup().addTo(_self.map);

    // Заполняем созданную для маркеров группу, значениями со случайными координатами. Добавляем к маркерам всплывающие окошки с текстом.
    for (let i = 0; i < _self.count; i += 1) {
      L.marker(_self.getRandomLatLng(), {icon: _self.dropIcon}).addTo(_self.fg).bindPopup("<b>Hello world!</b><br>I am a popup.");
    }

    // Добавляем все маркеры на карту, через 1 секунду.
    setTimeout(function () {
      _self.map.fitBounds(_self.fg.getBounds()); // Получаем границы группы маркеров 'fg.getBounds()' и масштабируем карту под них методом - fitBounds.
    }, 1000);

    // Добавляем случайные фоны, к маркерам.
    this.randBackgroundMarker();

  }


}
