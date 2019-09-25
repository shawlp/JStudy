import React, {Component, useState, useEffect} from 'react';
import {itemFy} from './decorators';
import echarts from 'echarts';

export default () => {
  const [price, setPrice] = useState(0);
  useEffect(() => {
    console.log('被调用了', price);
    return () => {
      console.log('ComponentWillUnmount!');
    }
  })

  return (<div onClick={() => setPrice(50)}>
    echarts{price}
  </div>)
};