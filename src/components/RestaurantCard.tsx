import * as React from 'react';
import Card from 'src/components/shared/Card';
import { IRestaurant } from 'src/store/restaurants/restaurant';
import styled from 'src/styled-components';

const Thumbnail = styled.img`
  width: 100px;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.text.m};
  padding: ${({ theme }) => theme.inset.s};
`;

const Container = styled(Card)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }
`;

interface IComponentProps {
  restaurant: IRestaurant;
  onClick: () => void;
}

export default class RestaurantCard extends React.PureComponent<
  IComponentProps
> {
  public render() {
    const {
      restaurant: { thumb, name },
      onClick
    } = this.props;
    return (
      <Container onClick={onClick} tabIndex={0}>
        {thumb ? <Thumbnail src={thumb} alt={name} /> : <div />}
        <Title>{name}</Title>
      </Container>
    );
  }
}
