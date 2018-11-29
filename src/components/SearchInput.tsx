import * as React from 'react';
import Input from 'src/components/shared/Input';

interface IComponentProps {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
}

export default class SearchInput extends React.PureComponent<IComponentProps> {
  public onSearch = (event: any) => {
    event.preventDefault();
    const { onSearch } = this.props;
    onSearch(event.target.value);
  };

  public render() {
    const { searchTerm } = this.props;
    return <Input type="text" value={searchTerm} onChange={this.onSearch} />;
  }
}
