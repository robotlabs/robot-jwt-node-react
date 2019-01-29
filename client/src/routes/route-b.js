import React from 'react'
import { RouteA, RouteAA } from './routes-index';

const RouteB = (props) => {
  console.log('props history ', props.history);
  setTimeout(() => {
    props.history.push('./route-a');
  }, 2000);
  setTimeout(() => {
    props.history.push('./route-b');
  }, 4000);
  return (
    <div>
      ROUTE b
    </div>
  )
}



// const { history } = this.props
//     history.push(Routes.game)

export default RouteB
