import { push } from 'connected-react-router';
import * as React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import RestaurantCard from 'src/components/RestaurantCard';
import SearchInput from 'src/components/SearchInput';
import Grid from 'src/components/shared/Grid';
import { IRootState } from 'src/store';
import * as Restaurants from 'src/store/restaurants';
import styled from 'src/styled-components';

const Container = styled.div`
  padding: ${({ theme }) => theme.inset.m} ${({ theme }) => theme.inset.l};
`;

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
      onSearch: Restaurants.search,
      push
    },
    dispatch
  );

type ComponentProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class Home extends React.PureComponent<ComponentProps> {
  public onSearch = (searchTerm: string) => {
    const { cityId, onSearch } = this.props;
    if (cityId) {
      onSearch(searchTerm, cityId);
    }
  };

  public navigateToDetailView = (id: number) => {
    return () => this.props.push('/restaurant/' + id);
  };

  public render() {
    const { searchResult, searchTerm } = this.props;
    return (
      <Container>
        <Helmet>
          <title>Home - Food Finder</title>
        </Helmet>
        <SearchInput searchTerm={searchTerm} onSearch={this.onSearch} />
        <Grid>
          {searchResult.map(restaurant => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onClick={this.navigateToDetailView(restaurant.id)}
            />
          ))}
        </Grid>
      </Container>
    );
  }
}

const ConnectedHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default ConnectedHome;