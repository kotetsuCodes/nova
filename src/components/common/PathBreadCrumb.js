import React from "react";
import styled from "styled-components";

const PathBreadCrumbStyle = styled.div`
  padding: 8px 16px 8px 16px;
`;

export default class PathBreadCrumb extends React.Component {
  render() {
    const { currentWorkingDirectory } = this.props;
    return (
      <PathBreadCrumbStyle className="row">
        <div className="col-12">{currentWorkingDirectory}</div>
      </PathBreadCrumbStyle>
    );
  }
}
