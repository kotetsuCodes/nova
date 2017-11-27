import React from "react";
import styled from "styled-components";
import FileSystemRowStyle from "../common/FileSystemRow.style";
import { getIconForDirectory } from "../../utility/icons";

const DirectoryLabel = styled.span`
  display: inline;
  padding-left: 8px;
`;

const DirectoryIcon = styled.img`
  height: 32px;
  height: 32px;
`;

const DirectoryDetail = styled.div`
  text-align: center;
`;

export default class Directory extends React.Component {
  render() {
    const {
      directoryInfo,
      changeWorkingDirectory,
      currentWorkingDirectory,
      setSelected
    } = this.props;

    return (
      <div>
        <FileSystemRowStyle
          className="row align-items-center"
          isSelected={directoryInfo.isSelected}
          onDoubleClick={() => changeWorkingDirectory(directoryInfo)}
          onClick={() => setSelected(directoryInfo)}
        >
          <div className="col-sm-4">
            <div className="row align-items-center justify-content-middle">
              <div className="col-sm-2">
                <DirectoryIcon src={getIconForDirectory(directoryInfo.Name)} />
              </div>
              <div className="col-sm-10 justify-content-start">
                <DirectoryLabel>{directoryInfo.Name}</DirectoryLabel>
              </div>
            </div>
          </div>
          <DirectoryDetail className="col">
            <span>{directoryInfo.CreationTime}</span>
          </DirectoryDetail>
          <DirectoryDetail className="col">
            <span>{directoryInfo.LastWriteTime}</span>
          </DirectoryDetail>
          <DirectoryDetail className="col">
            <span>{directoryInfo.LastAccessTime}</span>
          </DirectoryDetail>
          <DirectoryDetail className="col">
            <span>{directoryInfo.Attributes}</span>
          </DirectoryDetail>
          <DirectoryDetail className="col">
            <span />
          </DirectoryDetail>
        </FileSystemRowStyle>
      </div>
    );
  }
}
