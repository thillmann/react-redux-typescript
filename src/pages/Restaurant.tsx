import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { IRootState } from "src/store";

const mapStateToProps = (state: IRootState, props: RouteComponentProps<{ id: string; }>) => ({
	restaurant: state.restaurants.entities[props.match.params.id]
});

const Restaurant = ({restaurant}: any) => {
  return <div>{JSON.stringify(restaurant)}</div>;
};

export default connect(mapStateToProps)(Restaurant);
