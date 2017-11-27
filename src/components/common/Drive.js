import React from "react";
import styled from "styled-components";
import FileSystemRowStyle from "../common/FileSystemRow.style";

const DriveLabel = styled.span`
  cursor: pointer;
  padding-left: 8px;
`;

export default class Drive extends React.Component {
  render() {
    const { driveInfo, changeWorkingDirectory } = this.props;
    return (
      <FileSystemRowStyle className="row" isSelected={driveInfo.isSelected}>
        <div className="col" onClick={() => changeWorkingDirectory(driveInfo)}>
          <i className="fa fa-hdd-o" />
          <DriveLabel>{driveInfo.Name}</DriveLabel>
        </div>
      </FileSystemRowStyle>
    );
  }
}
