import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  ILatLng,
  Marker,
  BaseArrayClass
} from '@ionic-native/google-maps';

/**
 * Generated class for the MarkerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-marker',
  templateUrl: 'marker.html',
})
export class MarkerPage {

  map: GoogleMap;

  constructor() {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MarkerPage');
    this.loadMap();
  }

  loadMap() {
    let POINTS: BaseArrayClass<any> = new BaseArrayClass<any>([
      {
        position: {lat:41.79883, lng:140.75675},
        icon: {url: 'assets/icon/good.png', size: {width: 18, height: 18}},
      },
      {
        position: {lat:41.799240000000005, lng:140.75875000000002},
        icon: {url: 'assets/icon/fair.png', size: {width: 18, height: 18}},
      },
      {
        position: {lat:41.797650000000004, lng:140.75905},
        icon: {url: 'www/assets/icon/moderate.png', size: {width: 18, height: 18}},
      },
      {
        position: {lat:41.79637, lng:140.76018000000002},
        title: "4",
        icon: {url: 'assets/icon/poor.png', size: {width: 18, height: 18}},
      },
      {
        position: {lat:41.79567, lng:140.75845},
        title: "5",
        icon: {url: 'www/assets/icon/verypoor.png', size: {width: 18, height: 18}},
      }
    ]);

    let bounds: ILatLng[] = POINTS.map((data: any, idx: number) => {
      console.log(data);
      return data.position;
    });

    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: bounds
      }
    });
    POINTS.forEach((data: any) => {
      data.disableAutoPan = true;
      let marker: Marker = this.map.addMarkerSync(data);
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(this.onMarkerClick);
      marker.on(GoogleMapsEvent.INFO_CLICK).subscribe(this.onMarkerClick);
    });

  }

  onMarkerClick(params: any) {
    let marker: Marker = <Marker>params[1];
    let iconData: any = marker.get('iconData');
    marker.setIcon(iconData);
  }

}
