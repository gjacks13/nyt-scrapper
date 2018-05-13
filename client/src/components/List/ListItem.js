import React from "react";

export const ListItem = props => {
  return(
  <li className="list-group-item">
      {props.children}
  </li>);
};