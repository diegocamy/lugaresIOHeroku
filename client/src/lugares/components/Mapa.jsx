import React from 'react';
import { Map as Mapita, TileLayer } from 'react-leaflet';

const Mapa = ({ zoom, latlng, markers, style }) => {
  return (
    <Mapita
      className='map'
      style={style ? style : { height: 350 }}
      center={latlng}
      length={4}
      zoom={zoom}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {markers}
    </Mapita>
  );
};

export default Mapa;
