import React from 'react'

export default function CircleElement(props) {
	return (<span style={stylesCircle}>{props.operation}</span>)
}

const stylesCircle = {
  backgroundColor: "black",
  borderRadius: "50%",
  height: "20px",
  width: "20px",
  color: "white",
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 'small',
};
