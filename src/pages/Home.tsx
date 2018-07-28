import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Input from 'src/components/shared/Input';
import { IRootState } from 'src/store';
import * as Restaurants from 'src/store/restaurants';

const mapStateToProps = ({
  location: { cityId },
  restaurants
}: IRootState) => ({
  cityId,
  searchResult: Restaurants.getSearchResult(restaurants)
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
    const { onSearch, cityId } = this.props;
    const searchTerm = ev.target.value;
    if (cityId) {
      onSearch(searchTerm, cityId);
    }
  };

  public render() {
    const { searchResult } = this.props;
    return (
      <div>
        Search For:
        <Input type="text" onInput={this.onSearch} />
        <ul>
          {searchResult.map(restaurant => (
            <li key={restaurant.id}>{restaurant.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
