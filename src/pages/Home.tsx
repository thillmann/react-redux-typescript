import * as React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Card from 'src/components/shared/Card';
import Grid from 'src/components/shared/Grid';
import Input from 'src/components/shared/Input';
import Map from 'src/components/shared/Map';
import { IRootState } from 'src/store';
import * as Restaurants from 'src/store/restaurants';

const mapStateToProps = ({
  location: { cityId, lat, lon },
  restaurants
}: IRootState) => ({
  cityId,
  lat,
  lon,
  searchResult: Restaurants.getSearchResult(restaurants),
  searchTerm: restaurants.searchTerm
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onSearch: Restaurants.search
    },
    dispatch
  );

type ComponentProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class Home extends React.PureComponent<ComponentProps> {
  public onSearch = (ev: any) => {
    const { cityId, onSearch } = this.props;
    const searchTerm = ev.target.value;
    if (cityId) {
      onSearch(searchTerm, cityId);
    }
  };

  public render() {
    const { lat, lon, searchResult, searchTerm } = this.props;
    return (
      <div>
        <Helmet>
          <title>Home - Food Finder</title>
        </Helmet>
        Search For:
        <Input type="text" value={searchTerm} onInput={this.onSearch} />
        <Grid>
          {searchResult.map(restaurant => (
            <Card key={restaurant.id}>
              <img
                src={restaurant.thumb}
                alt={restaurant.name}
                style={{ width: '100%' }}
              />
              {restaurant.name}
            </Card>
          ))}
        </Grid>
        <Map lat={lat} lon={lon} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
