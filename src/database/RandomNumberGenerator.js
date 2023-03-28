import React from 'react';

class RandomNumberGenerator extends React.Component {
  generate() {
    return Math.floor(Math.random() * 10000000000000); // retorna um número inteiro entre 0 e 999999
  }
}

export default RandomNumberGenerator;
