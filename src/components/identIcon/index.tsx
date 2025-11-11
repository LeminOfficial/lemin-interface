import React from 'react';
import { blo } from 'blo';

interface IdenticonProps {
  address: string;
  diameter?: number;
}

const EthereumIdenticon = ({ address, diameter = 46 }: IdenticonProps) => {
  return (
    <img
      alt={address}
      src={blo(address as `0x${string}`)}
      style={{
        width: diameter,
        height: diameter,
        borderRadius: diameter / 3,
      }}
    />
  );
};

export default EthereumIdenticon;
