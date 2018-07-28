import * as mapboxgl from 'mapbox-gl';
import * as React from 'react';

(mapboxgl as any).accessToken = process.env.REACT_APP_MAPBOX_KEY;

interface IComponentProps {
  lat: number | null;
  lon: number | null;
}

export default class Map extends React.PureComponent<IComponentProps> {
  public ref: HTMLDivElement;
  private map: mapboxgl.Map;

  constructor(props: IComponentProps) {
    super(props);
  }

  public setRef = (element: HTMLDivElement) => (this.ref = element);

  public componentDidMount() {
    // tslint:disable-next-line:no-console
    console.warn(this.props);
    // tslint:disable-next-line:no-unused-expression
    this.map = new mapboxgl.Map({
      container: this.ref,
      style: 'mapbox://styles/mapbox/streets-v10',
      zoom: 13
    });
  }

  public componentDidUpdate() {
    if (this.props.lat && this.props.lon) {
      this.map.setCenter([this.props.lon, this.props.lat]);
      new mapboxgl.Marker()
        .setLngLat([this.props.lon, this.props.lat])
        .addTo(this.map);
    }
  }

  public render() {
    return <div style={{ width: 400, height: 400 }} ref={this.setRef} />;
  }
}
