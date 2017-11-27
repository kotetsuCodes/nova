import React from "react";
import styled from "styled-components";

const ColumnHeaderStyle = styled.div`
  padding: 8px 16px 8px 16px;
  text-align: center;
`;

export class ColumnHeader extends React.PureComponent {
  render() {
    const { headers } = this.props;
    console.log(headers);
    return (
      <ColumnHeaderStyle className="row">
        {headers.map((item, index) => {
          return <div className={`${item.className}`}>{item.headerTitle}</div>;
        })}
      </ColumnHeaderStyle>
    );
  }
}
